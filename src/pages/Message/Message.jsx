import { Avatar, CircularProgress, Grid, IconButton } from '@mui/material';
import WestIcon from '@mui/icons-material/West';
import CallIcon from '@mui/icons-material/Call';
import VideocamIcon from '@mui/icons-material/Videocam';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import CloseIcon from '@mui/icons-material/Close';
import SearchUser from '../../components/SearchUser/SearchUser';
import UserChatCard from './UserChatCard';
import ChatMessage from './ChatMessage';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createMessage, getAllChats, getMessages } from '../../Redux/Message/message.action';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { uploadToCloudinary } from '../../Utils/uploadToCloudiary';
import { getUsersByIds } from '../../Redux/Users/user.action';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { useNavigate } from 'react-router-dom';

if (typeof global === 'undefined') {
    window.global = window;
}

//Component mount lần đầu:
// useEffect #1 (kết nối WebSocket) → chạy.
// Sau khi userId có giá trị:
// useEffect #3 (fetch chat list) → chạy.
// Sau khi fetch chat list xong:
// chatList thay đổi → useEffect #4 (fetch users) → chạy.
// Khi user click vào 1 chat:
// currentChat thay đổi → useEffect #5 (fetch thêm users nếu cần) → chạy.
// currentChat thay đổi → useEffect #2 (đăng ký nhận tin nhắn WebSocket) → chạy.
// Khi nhận tin nhắn mới từ WebSocket:
// kiểm tra nếu thuộc currentChat → cập nhật messages.



const Message = () => {
    const navigate = useNavigate();
    const [stompClient, setStompClient] = useState(null);
    const dispatch = useDispatch();
    const { message, auth, user } = useSelector((store) => ({
        message: store.message,
        auth: store.auth,
        user: store.users || { allUsers: {} }
    }));
    
    const userId = auth?.user?.id;
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [loadingMessages, setLoadingMessages] = useState(false);
    const [isUsersLoaded, setIsUsersLoaded] = useState(false);

    //useEffect đầu tiên – Kết nối WebSocket
    useEffect(() => {
        const socket = new SockJS('http://localhost:8080/yaki/ws');// Tạo kết nối SockJS
        //STOMP giúp định tuyến tin nhắn theo topic: "/topic/messages".
        const client = Stomp.over(socket);// Tạo client STOMP từ socket

        client.connect({}, (frame) => {
            console.log('Connected: ' + frame);
            setStompClient(client);// Lưu lại stompClient để dùng sau
        }, (error) => {
            console.error('WebSocket connection error:', error);// Xử lý lỗi nếu kết nối thất bại
        });
        // Cleanup khi component bị hủy hoặc unmount
        return () => {
            if (client && client.connected) {
                client.disconnect(() => console.log('Disconnected from WebSocket'));
            }
        };
    }, []);

    //useEffect thứ hai – Nhận tin nhắn mới từ WebSocket
    // Khi có tin nhắn mới từ WebSocket, kiểm tra xem nó có thuộc về currentChat không
    //Khi nào chạy:
    // Khi stompClient hoặc currentChat thay đổi (ví dụ: user chọn chat khác).
    // Cleanup: Hủy subscribe trước khi subscribe lại hoặc khi component unmount.
    //Lắng nghe tin nhắn mới từ WebSocket (/topic/messages).
    //Nếu tin nhắn đến đúng chat hiện tại đang mở ➔ thêm vào danh sách messages.
    useEffect(() => {
        if (!stompClient || !currentChat) return;// Nếu chưa có stompClient hoặc currentChat thì không làm gì
        const subscription = stompClient.subscribe('/topic/messages', (msg) => {
            const newMessage = JSON.parse(msg.body);// Parse nội dung tin nhắn
            console.log('New message received from /topic/messages:', newMessage);
            // Nếu tin nhắn thuộc về chat hiện tại
            if (newMessage.chatId === currentChat.id) {
                setMessages((prev) => {
                    // Tránh thêm trùng tin nhắn
                    if (!prev.some((m) => m.id === newMessage.id)) {
                        return [...prev, newMessage];// Thêm vào danh sách tin nhắn
                    }
                    return prev;
                });
            }
        });
        // Cleanup: hủy subscription khi currentChat hoặc stompClient thay đổi
        return () => subscription.unsubscribe();
    }, [stompClient, currentChat]);

    //useEffect 3 Fetch danh sách chat và users (Chạy khi biết userId)
    //Nhiệm vụ:
    // Load danh sách chat của user từ Redux action getAllChats.
    // Extract các userId từ danh sách chat (loại bỏ userId hiện tại).
    // Fetch thông tin chi tiết của các user đó bằng getUsersByIds.
    // Set trạng thái isUsersLoaded để hiển thị UI.
    useEffect(() => {
        const fetchChatsAndUsers = async () => {
            if (!userId) return;
            console.log('Fetching chats for userId:', userId);
            try {
                const chatResult = await dispatch(getAllChats(userId));
                console.log('Chats fetched:', chatResult.payload);
                if (chatResult.payload && chatResult.payload.length > 0) {
                    const otherUserIds = Array.from(new Set(
                        chatResult.payload.flatMap(chat => chat.userIds.filter(id => id !== userId))
                    ));
                    console.log('Calculated otherUserIds:', otherUserIds);
                    if (otherUserIds.length > 0) {
                        console.log('Fetching users for IDs:', otherUserIds);
                        await dispatch(getUsersByIds(otherUserIds));
                        console.log('user.allUsers after fetch:', user.allUsers);
                    } else {
                        console.log('No other user IDs found in chats');
                    }
                } else {
                    console.log('No chats returned from getAllChats');
                }
                setIsUsersLoaded(true);
            } catch (error) {
                console.error('Error fetching chats or users:', error);
                setIsUsersLoaded(true);
            }
        };
        fetchChatsAndUsers();
    }, [userId, dispatch]);

    //useEffect 4 Fetch users từ danh sách chat (Fetch users for chats)
    useEffect(() => {
        const fetchUsers = async () => {
            if (!message.chats || message.chats.length === 0) {
                console.log('No chats available yet');
                setIsUsersLoaded(true);
                return;
            }
            console.log('Processing chats from Redux:', message.chats);
            const otherUserIds = Array.from(new Set(
                message.chats.flatMap(chat => chat.userIds.filter(id => id !== userId))
            ));
            console.log('Other user IDs to fetch:', otherUserIds);
            if (otherUserIds.length > 0) {
                try {
                    await dispatch(getUsersByIds(otherUserIds));
                    console.log('user.allUsers after fetch:', user.allUsers);
                } catch (error) {
                    console.error('Error fetching users:', error);
                }
            }
            setIsUsersLoaded(true);
        };
        fetchUsers();
    }, [message.chats, userId, dispatch]);
//Load thêm user khi chọn vào một chat cụ thể(useEffect 5 – Fetch users for current chat)
    useEffect(() => {
        const fetchUsersForChat = async () => {
            if (!currentChat || !currentChat.userIds) return;
            console.log('Fetching users for currentChat:', currentChat);
            try {
                const otherUserIds = currentChat.userIds.filter(id => id !== userId);
                console.log('Other user IDs for currentChat:', otherUserIds);
                if (otherUserIds.length > 0) {
                    await dispatch(getUsersByIds(otherUserIds));
                    console.log('user.allUsers after currentChat fetch:', user.allUsers);
                }
            } catch (error) {
                console.error('Error in fetchUsersForChat:', error);
            }
        };
        fetchUsersForChat();
    }, [currentChat, userId, dispatch]);

    const handleHomeClick = () => {
        navigate('/home');
    };

    const handleChatClick = async (chat) => {
        setCurrentChat(chat);
        setLoadingMessages(true);
        try {
            const result = await dispatch(getMessages(chat.id));
            console.log('Result from getMessages:', result);
            setMessages(result?.messages || []);
        } catch (error) {
            console.error('Error loading chat:', error);
        } finally {
            setLoadingMessages(false);
        }
    };

    const getChatDisplayName = (chat) => {
        if (!chat || !chat.userIds) return 'Unknown Chat';
        console.log('getChatDisplayName - chat:', chat);
        console.log('getChatDisplayName - user.allUsers:', user.allUsers);
        console.log('getChatDisplayName - userId (current user):', userId);

        if (chat.userIds.length === 2) {
            const otherUserId = chat.userIds.find(id => id !== userId);
            console.log('Chat 1-1 - otherUserId:', otherUserId);
            const otherUser = otherUserId ? user.allUsers[otherUserId] : null;
            console.log('Chat 1-1 - otherUser:', otherUser);
            return otherUser 
                ? `${otherUser.firstName || ''} ${otherUser.lastName || ''}`.trim() || 'Unnamed User'
                : 'Unknown User';
        }

        if (chat.userIds.length > 2) {
            if (chat.chatName) {
                console.log('Group chat - returning chatName:', chat.chatName);
                return chat.chatName;
            }
            const otherUsers = chat.userIds
                .filter(id => id !== userId)
                .map(id => {
                    const user = user.allUsers[id];
                    console.log('Group chat - user for id', id, ':', user);
                    return user ? `${user.firstName || ''} ${user.lastName || ''}`.trim() : 'Unknown User';
                })
                .filter(name => name);
            return otherUsers.length > 0 ? otherUsers.join(', ') : 'Unnamed Group';
        }

        return 'Unknown Chat';
    };

    const handleSelectImage = async (e) => {
        if (!e.target.files[0]) return;
        setLoading(true);
        try {
            const imgUrl = await uploadToCloudinary(e.target.files[0], 'image');
            console.log('Uploaded image URL:', imgUrl);
            setSelectedImage(imgUrl);
        } catch (error) {
            console.error('Error uploading image:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSendMessage = async (value) => {
        if (!value.trim() && !selectedImage) return;
        if (!currentChat) {
            console.error('No current chat selected');
            return;
        }
        const newMessage = { chatId: currentChat.id, content: value, image: selectedImage, userId };
        console.log('Sending message:', newMessage);
        try {
            const result = await dispatch(createMessage(newMessage));
            console.log('Create message result:', result);
            if (result.payload && result.success) {
                setSelectedImage(null);
            }
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return (
        <div className="h-screen">
            <Grid container className="h-full overflow-hidden">
                <Grid item xs={12} md={3} className="border-r h-full">
                    <div className="p-4 h-full flex flex-col">
                        <div className="flex items-center space-x-2 mb-6" onClick={handleHomeClick}>
                            <WestIcon className='cursor-pointer'/>
                            <h1 className="text-xl font-bold">Home</h1>
                        </div>
                        <SearchUser />
                        <div className="overflow-y-scroll mt-5 space-y-4 h-full">
                            {isUsersLoaded ? (
                                message.chats?.map((chat) => (
                                    <div
                                        key={chat.id}
                                        onClick={() => handleChatClick(chat)}
                                        className="cursor-pointer hover:bg-gray-100 rounded-lg"
                                    >
                                        <UserChatCard chat={chat} chatName={getChatDisplayName(chat)} />
                                    </div>
                                ))
                            ) : (
                                <div className="flex justify-center items-center h-full">
                                    <CircularProgress />
                                </div>
                            )}
                        </div>
                    </div>
                </Grid>
                <Grid item xs={12} md={9} className="h-full flex flex-col" style={{ flexDirection: 'column' }}>
                    {currentChat ? (
                        <>
                            <div className="p-5 border-b flex justify-between items-center shrink-0">
                                <div className="flex items-center space-x-3">
                                    <Avatar
                                        src={currentChat?.chatImage || 'default-avatar-url'}
                                        alt={getChatDisplayName(currentChat)}
                                    />
                                    <div>
                                        <p className="font-semibold">{getChatDisplayName(currentChat)}</p>
                                        <p className="text-sm text-green-500">Online</p>
                                    </div>
                                </div>
                                <div>
                                    <IconButton><CallIcon /></IconButton>
                                    <IconButton><VideocamIcon /></IconButton>
                                </div>
                            </div>
                            <div className="flex-1 overflow-y-auto p-4 bg-gray-50 min-h-0">
                                {loadingMessages ? (
                                    <div className="flex justify-center items-center h-full">
                                        <CircularProgress />
                                    </div>
                                ) : (
                                    <ChatMessage messages={messages} currentUserId={userId} />
                                )}
                            </div>
                            <div className="p-4 border-t shrink-0 sticky">
                                <div className="flex items-center space-x-2">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        id="image-input"
                                        className="hidden"
                                        onChange={handleSelectImage}
                                    />
                                    <label htmlFor="image-input" className="cursor-pointer">
                                        <InsertPhotoIcon />
                                    </label>
                                    {selectedImage && (
                                        <div className="relative">
                                            <img
                                                src={selectedImage}
                                                alt="Selected"
                                                className="w-16 h-16 object-cover rounded-lg mr-2"
                                            />
                                            <IconButton
                                                size="small"
                                                className="absolute top-0 right-0 bg-gray-200"
                                                onClick={() => setSelectedImage(null)}
                                            >
                                                <CloseIcon fontSize="small" />
                                            </IconButton>
                                        </div>
                                    )}
                                    <input
                                        type="text"
                                        className="flex-1 border rounded-full py-2 px-4 focus:outline-none"
                                        placeholder="Type a message..."
                                        onKeyPress={(e) => {
                                            if (e.key === 'Enter') {
                                                handleSendMessage(e.target.value.trim());
                                                e.target.value = '';
                                            }
                                        }}
                                        disabled={loading}
                                    />
                                    {loading && <CircularProgress size={24} />}
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full">
                            <ChatBubbleOutlineIcon
                                sx={{ fontSize: '5rem', color: '#191c29', opacity: 0.5 }}
                            />
                            <p className="text-gray-500 text-xl mt-4">Select a chat to start messaging</p>
                        </div>
                    )}
                </Grid>
            </Grid>
        </div>
    );
};

export default Message;
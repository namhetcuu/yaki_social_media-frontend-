import { Avatar, Grid, IconButton } from '@mui/material'
import WestIcon from '@mui/icons-material/West';
import CallIcon from '@mui/icons-material/Call';
import VideocamIcon from '@mui/icons-material/Videocam';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import SearchUser from '../../components/SearchUser/SearchUser';
import '../Message/Message.css'
import UserChatCard from './UserChatCard';
import ChatMessage from './ChatMessage';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllChats } from '../../Redux/Message/message.action';

const Message = () => {
  const dispatch = useDispatch();
  const { chats, loading, error } = useSelector((state) => state.message);
  const userId = useSelector((state) => state.auth?.user?.id); // Lấy userId từ Redux

    
  // Lọc tất cả các chat mà user đăng nhập có tham gia
  const userChats = chats?.filter(chat => chat.userIds.includes(userId));

  const getChatDisplayInfo = (chat) => {
    if (chat.userIds.length > 2) {
      // Đây là group chat
      return { name: chat.chatName, avatar: chat.chatImage };
    } else {
      // Đây là chat riêng tư -> Tìm user còn lại
      const otherUserId = chat.userIds.find(id => id !== userId);
      return { name: `User ${otherUserId}`, avatar: chat.chatImage || "default-avatar.png" };
    }
  };
  
  useEffect(() => {
    console.log("Redux chats state:", chats);
  }, [chats]);

  useEffect(() => {
    if (userId) {
      dispatch(getAllChats(userId));
    }
  }, [dispatch, userId]);

  const handleSelectImage = () => {
    console.log("select image...");
  };

  return (
    <div>
        <Grid container className='h-screen overflow-y-hidden '>

            <Grid className='px-5' item xs={3}>
                <div className='flex h-full justify-between space-x-2'>
                    <div className='w-full'>
                        <div className='flex space-x-4 items-center py-5'>
                            <WestIcon/>
                            <h1 className='text-xl font-bold'>Home</h1>
                        </div>

                        <div className='h-[83vh]'>
                            <div className=''><SearchUser/></div>

                            <div className='h-full space-y-4 mt-5 overflow-y-scroll hideScrollbar'>
                            {loading ? (
                                <p>Loading chats...</p>
                              ) : error ? (
                                <p>Error: {error}</p>
                              ) : (
                                userChats.map((chat) => {
                                  const { name, avatar } = getChatDisplayInfo(chat);
                                  return <UserChatCard key={chat.id} chat={chat} name={name} avatar={avatar} />;
                                })
                              )}
                            </div>
                        </div>
                    </div>
                </div>
            </Grid>
            <Grid className='h-full' item xs={9}>
              <div>
                <div className='flex justify-between items-center border-l p-5'>
                  <div className='flex items-center space-x-3'>
                    <Avatar src='https://images.pexels.com/photos/30890463/pexels-photo-30890463/free-photo-of-c-p-doi-lang-m-n-om-nhau-trong-phong-c-nh-b-bi-n.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load'/>

                    <p>Namnam</p>
                  </div>

                  <div className='flex space-x-3'>

                    <IconButton>
                      <CallIcon/>
                    </IconButton>

                    <IconButton>
                      <VideocamIcon/>
                    </IconButton>
                    
                  </div>
                </div>

                <div className='hideScrollbar overflow-y-scroll h-[82vh] px-2 space-y-5 py-5'>
                  <ChatMessage/>
                </div>
              </div>

              <div className='sticky bottom-0 border-l'>
                <div className='py-5 flex items-center justify-center space-x-5'>
                  <input type="text"
                   className='bg-transparent border border-[#3b40544]
                    rounded-full w-[90%] py-3 px-5'
                     placeholder='Type message...'/>
                  <input type="file" accept='image/*' onChange={handleSelectImage} className='hidden' id='image-input'/>
                  <label htmlFor="image-input">
                    <InsertPhotoIcon/>
                  </label>
                </div>
              </div>
            </Grid>

        </Grid>
    </div>
  )
}

export default Message
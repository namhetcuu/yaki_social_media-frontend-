import { Avatar, Card, CardHeader, IconButton } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getUsersByIds } from '../../Redux/Users/user.action'; // Import action lấy danh sách user

const UserChatCard = ({ chat }) => {
  //useDispatch(): Dùng để gọi action trong Redux (ví dụ: gọi API lấy user).
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth?.user?.id); // Lấy user đang đăng nhập
  const users = useSelector((state) => state.users?.users || {}); // Lấy danh sách user từ Redux
  const [chatUser, setChatUser] = useState(null);

  useEffect(() => {
    if (chat?.userIds?.length === 2) {
      const otherUserId = chat.userIds.find(id => id !== userId);
      
      if (otherUserId && !users[otherUserId]) {
        dispatch(getUsersByIds([otherUserId])); // Gọi API lấy thông tin user nếu chưa có
      } else {
        setChatUser(users[otherUserId]); // Nếu có sẵn trong Redux, set vào state
      }
    }
  }, [chat, users, userId, dispatch]);

  if (!chat || !chat.userIds) {
    return null; // Không hiển thị nếu dữ liệu không hợp lệ
  }

  // Xác định thông tin hiển thị
  const getChatDisplayInfo = () => {
    if (chat.userIds.length > 2) {
      // Group chat
      return { name: chat.chatName || "Unnamed Group", avatar: chat.chatImage };
    } else {
      // Private chat -> Hiển thị tên của user còn lại
      return { 
        name: chatUser?.name || "Loading...", 
        avatar: chatUser?.avatar || "default-avatar.png" 
      };
    }
  };

  const { name, avatar } = getChatDisplayInfo();

  return (
    <Card sx={{ marginBottom: "10px", cursor: "pointer" }}>
      <CardHeader
        action={
          <IconButton>
            <MoreHorizIcon />
          </IconButton>
        }
        avatar={
          <Avatar 
            sx={{ width: "3.5rem", height: "3.5rem", fontSize: "1.5rem", bgcolor: "#191c29", color: "rgb(88,199,250)" }} 
            src={avatar}
          />
        }
        title={name}
        subheader={"What's up bro?"}
      />
    </Card>
  );
};

export default UserChatCard;

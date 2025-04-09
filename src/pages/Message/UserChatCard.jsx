import { Avatar, Card, CardHeader, IconButton } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';


const UserChatCard = ({ chat, chatName }) => {

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
            sx={{
              width: "3.5rem",
              height: "3.5rem",
              fontSize: "1.5rem",
              bgcolor: "#191c29",
              color: "rgb(88,199,250)"
            }}
            src={chat.chatImage || "default-avatar.png"}
          />
        }
        title={chatName || "Unknown Chat"}
        subheader={"What's up bro?"}
      />
    </Card>
  );
};

export default UserChatCard;
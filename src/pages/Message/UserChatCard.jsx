import { Avatar, Card, CardHeader, IconButton } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';


const UserChatCard = ({ chat, chatName }) => {

  return (
    <Card sx={{ marginBottom: "10px", cursor: "pointer", borderRadius: "3px", boxShadow: "4px 4px 0px rgba(0,0,0,1)", border: "1px solid #191c29",  }}>
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
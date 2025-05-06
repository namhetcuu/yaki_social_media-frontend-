import { Avatar, Button, CardHeader, IconButton } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { red } from '@mui/material/colors';

const PopularUserCard = ({user}) => {
  return (
    <div>
      <CardHeader
        avatar={
          <Avatar 
          sx={{ bgcolor: red[500] }} 
          src={user.profilePicture}
          aria-label="recipe">
            {user.firstName?.charAt(0) || user.username?.charAt(0) || 'U'}
          </Avatar>
        }
        action={
          <Button style={{backgroundColor: '#0866ff',color: 'white', borderRadius: '20px',fontSize: '12px'}}>
            Follow
          </Button>
        }
        title={`${user.firstName} ${user.lastName}`}
        subheader={`@${user.username}`}
      />
    </div>
  )
}

export default PopularUserCard
import { Avatar, Button, CardHeader, IconButton } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { red } from '@mui/material/colors';

const PopularUserCard = () => {
  return (
    <div>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <Button style={{backgroundColor: '#0866ff',color: 'white', borderRadius: '20px',fontSize: '12px'}}>
            Follow
          </Button>
        }
        title="Truong Xuan Nhon"
        subheader="@truongnhon"
      />
    </div>
  )
}

export default PopularUserCard
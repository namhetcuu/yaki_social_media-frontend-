import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CommentIcon from '@mui/icons-material/Comment';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';

// const ExpandMore = styled((props) => {
//     const { expand, ...other } = props;
//     return <IconButton {...other} />;
//   })(({ theme }) => ({
//     marginLeft: 'auto',
//     transition: theme.transitions.create('transform', {
//       duration: theme.transitions.duration.shortest,
//     }),
//     variants: [
//       {
//         props: ({ expand }) => !expand,
//         style: {
//           transform: 'rotate(0deg)',
//         },
//       },
//       {
//         props: ({ expand }) => !!expand,
//         style: {
//           transform: 'rotate(180deg)',
//         },
//       },
//     ],
//   }));

const PostCard = () => {
    const [expanded, setExpanded] = React.useState(false);

  // const handleExpandClick = () => {
  //   setExpanded(!expanded);
  // };
  return (
    <Card className=''>
        <CardHeader sx={{gap:0}}
        avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
            </Avatar>
        }
        action={
            <IconButton aria-label="settings">
            <MoreVertIcon />
            </IconButton>
        }
        title="Nam Nam"
        titleTypographyProps={{width: 'max-content', fontWeight: 'bold'}}
        subheader="6 phút"
        subheaderTypographyProps={{width: 'max-content'}}
        />

        <CardMedia
            component="img"
            height="194"
            image="https://images.pexels.com/photos/8577762/pexels-photo-8577762.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
            alt="Paella dish"
            style={{maxWidth: '100%', height: 'auto', minWidth: '436.139px'}}
        />

        <CardActions disableSpacing className='flex justify-between'>
            <div>
                <IconButton aria-label="add to favorites">
                    {true?<ThumbUpIcon />:<FavoriteIcon />}
                </IconButton>
                <IconButton aria-label="share">
                    <CommentIcon />
                </IconButton> 
                <IconButton aria-label="share">
                    <ShareIcon />
                </IconButton>
            </div>

            <div>
                <IconButton aria-label="add to favorites">
                    {true?<BookmarkIcon />:<BookmarkBorderIcon />}
                </IconButton>
            </div>
        </CardActions>
    </Card>
  )
}

export default PostCard
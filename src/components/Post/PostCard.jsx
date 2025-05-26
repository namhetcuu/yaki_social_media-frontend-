import * as React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Avatar,
  IconButton,
  Typography,
  Divider,
  CircularProgress,
  Button,
  Backdrop,
} from "@mui/material";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import CommentIcon from "@mui/icons-material/Comment";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { createCommentAction, likePostAction } from "../../Redux/Post/post.action";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { motion } from "framer-motion";
import { useEffect } from "react";

const PostCard = ({ item }) => {
  const dispatch = useDispatch();
  //const {post} = useSelector(store =>store);
  
  
  const [showComments, setShowComments] = useState(false);
  const [comment, setComment] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleShowComment = () => setShowComments(!showComments);
  const handleLikePost = () => {
    setIsLiked(prev => !prev);
    dispatch(likePostAction(item.id,item.authorId))
  }
  const handleBookmarkPost = () => setIsBookmarked(!isBookmarked);

  

  const handleCreateComment = async () => {
    if (comment.trim() === "") return;

    setLoading(true);
    const reqData = {
      userId: item.authorId,
      postId: item.id,
      content: comment,
    };

    dispatch(createCommentAction(reqData));

    setTimeout(() => {
      setComments([...comments, { content: comment }]);
      setComment("");
      setLoading(false);
    }, 500);
  };

  return (
    <Card sx={{ maxWidth: 700, marginBottom: '2rem', borderRadius: 2 }}>
      <CardHeader
        avatar={<Avatar sx={{ bgcolor: red[500] }}>{item.authorUsername.charAt(0).toUpperCase()}</Avatar>}
        title={
          <div>
            <Typography variant="subtitle1" fontWeight="bold">{item.authorUsername}</Typography>
            <Typography variant="caption" color="text.secondary">October 11 - 🌟</Typography>
          </div>
        }
        action={
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        }
      />

      <CardContent sx={{ paddingBottom: 0 }}>
        <Typography variant="body2" color="text.secondary" paragraph>
          {item.caption || "No caption provided."}
        </Typography>
        <Typography variant="body2" color="primary" sx={{ marginBottom: 2 }}>
          #hashtag
        </Typography>
      </CardContent>

      <img src={item.imageUrl} alt="" className="w-full max-h-[30rem] object-cover object-top"/>

      <CardContent sx={{ paddingTop: 1, paddingBottom: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="body2" fontWeight="bold">{item.likeCount}</Typography>
          <Typography variant="body2" color="text.secondary">
            {item.comments?.length || 0} Comments • 5 Shares
          </Typography>
        </div>
      </CardContent>

      <Divider />

      <CardActions disableSpacing sx={{ justifyContent: 'space-around' }}>
        <IconButton onClick={handleLikePost} sx={{ flexDirection: 'column',color: isLiked ? red[500] : 'inherit' }}>
          <motion.div 
            animate={{ 
              scale: isLiked ? [1, 1.2, 1] : 1,
              color: isLiked ? red[500] : 'inherit'
            }}
            transition={{ duration: 0.3 }}
          >
            {isLiked ? (
              <FavoriteIcon />
            ) : (
              <FavoriteBorderIcon />
            )}
          </motion.div>
          <Typography variant="caption" sx={{ color: isLiked ? red[500] : 'inherit' }}>
            Like
          </Typography>
        </IconButton>
        
        <IconButton onClick={handleShowComment} sx={{ flexDirection: 'column' }}>
          <CommentIcon />
          <Typography variant="caption">Comment</Typography>
        </IconButton>
        
        <IconButton sx={{ flexDirection: 'column' }}>
          <ShareIcon />
          <Typography variant="caption">Share</Typography>
        </IconButton>
      </CardActions>

      <Divider />

      {showComments && (
        <section>
          <CardContent sx={{ paddingTop: 1 }}>
            <Typography variant="subtitle2" color="text.secondary">
              Most relevant ▼
            </Typography>
          </CardContent>
          
          <div className="flex items-center space-x-3 mx-3 my-2">
            <Avatar sx={{ width: 32, height: 32 }} />
            <input
              value={comment}
              type="text"
              onChange={(e) => setComment(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleCreateComment();
                }
              }}
              className="w-full outline-none bg-transparent border border-gray-300 rounded-full px-5 py-2"
              placeholder="Write a comment..."
            />
          </div>
          
          <Typography 
            variant="body2" 
            color="text.secondary" 
            sx={{ 
              textAlign: 'center', 
              padding: '8px',
              cursor: 'pointer'
            }}
            onClick={() => setShowComments(true)}
          >
            View comments
          </Typography>

          <Divider />

          <div className="mx-3 space-y-2 my-5 text-xs">
            {item.comments?.map((cmt, index) => (
              <motion.div
                key={index}
                className="flex items-center space-x-3"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Avatar sx={{ height: "2rem", width: "2rem" }}>C</Avatar>
                <p>{cmt.content}</p>
              </motion.div>
            ))}
          </div>
        </section>
      )}
    </Card>
  );
};

export default PostCard;
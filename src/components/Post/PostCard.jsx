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
import { motion } from "framer-motion"; // Import animation library

const PostCard = ({ item }) => {
  const dispatch = useDispatch();
  const {post} = useSelector(store =>store);


  const [showComments, setShowComments] = useState(false);
  const [comment, setComment] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [comments, setComments] = useState([]); // Danh sách bình luận
  const [loading, setLoading] = useState(false); // Trạng thái loading khi gửi comment

  const handleShowComment = () => setShowComments(!showComments);
  const handleLikePost = () => 
    {
        setIsLiked(prev => !prev);
        console.log("isLiked: ",isLiked);
        
        console.log("ID bài viết:", item.id);
        console.log("ID tác giả:", item.authorId);
        dispatch(likePostAction(item.id,item.authorId))
    }
  const handleBookmarkPost = () => setIsBookmarked(!isBookmarked);

  // Gửi comment
  const handleCreateComment = async () => {
    if (comment.trim() === "") return;

    setLoading(true);
    const reqData = {
      userId: item.authorId,
      postId: item.id,
      content: comment,
    };

    dispatch(createCommentAction(reqData));

    // Giả lập delay để hiển thị hiệu ứng loading
    setTimeout(() => {
      setComments([...comments, { content: comment }]); // Thêm bình luận vào danh sách
      setComment("");
      setLoading(false);
    }, 500);
  };

  return (
    <Card>
      <CardHeader
        avatar={<Avatar sx={{ bgcolor: red[500] }}>{item.authorUsername.charAt(0).toUpperCase()}</Avatar>}
        action={
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        }
        title={item.authorUsername}
        subheader="6 phút trước"
      />

      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {item.caption}
        </Typography>
      </CardContent>

      {/* <CardMedia
        component="img"
        height="194"
        image={item.imageUrl}
        alt="Post Image"
        style={{ maxWidth: "100%", height: "auto", minWidth: "436.139px" }}
      /> */}
      <img src={item.imageUrl} alt="" className="w-full max-h-[30rem] object-cover object-top"/>

      <CardActions disableSpacing>
        <IconButton onClick={handleLikePost}>
          <motion.div animate={{ scale: isLiked ? 1.2 : 1 }}>
            {isLiked ? <FavoriteIcon />: <FavoriteBorderIcon/>}
          </motion.div>
        </IconButton>
        <Typography variant="body2">{item.likeCount}</Typography>
        <IconButton onClick={handleShowComment}>
          <CommentIcon />
        </IconButton>
        <IconButton>
          <ShareIcon />
        </IconButton>
        <IconButton onClick={handleBookmarkPost} style={{ marginLeft: "auto" }}>
          {isBookmarked ? <BookmarkIcon color="primary" /> : <BookmarkBorderIcon />}
        </IconButton>
      </CardActions>

      {showComments && (
        <section>
          {/* Ô nhập bình luận */}
          <div className="flex items-center space-x-3 mx-3 my-5">
            <Avatar />
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
              placeholder="Viết bình luận..."
            />
            <button
              onClick={handleCreateComment}
              disabled={loading}
              className="px-4 py-1 text-white bg-blue-500 rounded-full hover:bg-blue-600 transition duration-200"
            >
              {loading ? <CircularProgress size={16} color="inherit" /> : "Gửi"}
            </button>
          </div>

          <Divider />

          {/* Danh sách bình luận */}
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

import { Avatar, Backdrop, Card, CircularProgress, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ImageIcon from "@mui/icons-material/Image";
import VideocamIcon from "@mui/icons-material/Videocam";
import ArticleIcon from "@mui/icons-material/Article";
import PostCard from "../Post/PostCard";
import CreatePostModal from "../CreatePost/CreatePostModal";
import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPostAction } from "../../Redux/Post/post.action";
import { motion, AnimatePresence } from "framer-motion";

const MiddlePart = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);
  
  const { jwt: token, user } = useSelector((state) => state.auth);
  const { posts, loading, error } = useSelector((state) => state.posts);
  const [openCreatePostModal, setOpenCreatePostModal] = useState(false);

  const handleCloseCreatePostModal = () => setOpenCreatePostModal(false);
  const handleOpenCreatePostModal = () => setOpenCreatePostModal(true);

  const fetchPosts = useCallback(() => {
    if (token) {
      dispatch(getAllPostAction());
    }
  }, [dispatch, token]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  useEffect(() => {
    // Simulate loading with animations
    const timer = setTimeout(() => {
      setIsLoading(false);
      setTimeout(() => setShowContent(true), 300); // Small delay for smooth transition
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <Backdrop
        sx={{ 
          color: '#fff', 
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: 'rgba(255,0,0,0)'
        }}
        open={isLoading}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          >
            <CircularProgress 
              color="inherit" 
              size={80} 
              thickness={4}
              sx={{ color: '#0866ff' }}
            />
          </motion.div>
        </motion.div>
      </Backdrop>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showContent ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        className="w-full bg-[#f8f9fa] dark:bg-[#1c1e21] min-h-screen flex justify-center"
      >
        <div className="w-full max-w-screen-md px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 py-4">
          {/* Ô nhập trạng thái */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Card className="p-4 bg-white dark:bg-[#25272a] shadow-md rounded-lg mb-5">
              <div className="flex items-center space-x-3">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Avatar
                    sx={{ width: "3rem", height: "3rem" }}
                    style={{ backgroundColor: "#0866ff" }}
                    src={user?.profilePicture || ""}
                  />
                </motion.div>
                <motion.div whileHover={{ scale: 1.01 }} className="flex-1">
                  <input
                    onClick={handleOpenCreatePostModal}
                    type="text"
                    placeholder="Bạn đang nghĩ gì thế?"
                    className="w-full outline-none rounded-full px-5 py-2 bg-transparent border border-[#3b4054] text-sm text-black dark:text-white"
                  />
                </motion.div>
              </div>

              {/* Nút tạo bài viết */}
              <motion.div 
                className="flex justify-between flex-wrap mt-5 gap-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                {[
                  { icon: <VideocamIcon />, color: "red", text: "Video trực tiếp" },
                  { icon: <ImageIcon />, color: "green", text: "Ảnh/video" },
                  { icon: <ArticleIcon />, color: "orange", text: "Bài viết/hoạt động" },
                ].map(({ icon, color, text }, index) => (
                  <motion.div 
                    key={index} 
                    className="flex items-center space-x-2 cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <IconButton style={{ color }} onClick={handleOpenCreatePostModal}>
                      {icon}
                    </IconButton>
                    <span className="text-sm text-black dark:text-white hidden sm:inline">{text}</span>
                  </motion.div>
                ))}
              </motion.div>
            </Card>
          </motion.div>

          {/* Stories */}
          <motion.section
            className="flex overflow-x-auto items-center py-5 space-x-4"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <motion.div 
              className="flex flex-col items-center flex-shrink-0 cursor-pointer"
              whileHover={{ scale: 1.05 }}
            >
              <Avatar
                sx={{ width: "3rem", height: "3rem" }}
                style={{ backgroundColor: "#0866ff" }}
              >
                <AddIcon sx={{ fontSize: "2.2rem" }} />
              </Avatar>
              <p className="text-sm mt-1 text-black dark:text-white text-center">Create Reels</p>
            </motion.div>
          </motion.section>

          {/* Danh sách bài viết */}
          <motion.div 
            className="space-y-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            {loading ? (
              <div className="flex justify-center py-10">
                <CircularProgress color="primary" />
              </div>
            ) : error ? (
              <motion.p 
                className="text-center text-red-500"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
              >
                Lỗi: {error}
              </motion.p>
            ) : posts?.length > 0 ? (
              <AnimatePresence>
                {posts.map((item, index) => (
                  <motion.div
                    key={item.id || index}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ 
                      delay: index * 0.1,
                      duration: 0.5 
                    }}
                  >
                    <PostCard item={item} />
                  </motion.div>
                ))}
              </AnimatePresence>
            ) : (
              <motion.p 
                className="text-center text-gray-500 py-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                Không có bài viết nào.
              </motion.p>
            )}
          </motion.div>

          {/* Modal tạo bài viết */}
          <CreatePostModal 
            handleClose={handleCloseCreatePostModal} 
            open={openCreatePostModal} 
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default MiddlePart;
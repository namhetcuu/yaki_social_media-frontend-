import {
  Avatar,
  Backdrop,
  Card,
  CircularProgress,
  IconButton,
} from "@mui/material";
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
    const timer = setTimeout(() => {
      setIsLoading(false);
      setTimeout(() => setShowContent(true), 300);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <Backdrop
        sx={{
          color: "#000",
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: "rgba(255,255,255,0.9)",
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
              sx={{ color: "#000" }}
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
        className="w-full min-h-screen flex justify-center bg-yellow-200"
      >
        <div className="w-full max-w-2xl px-4 py-6">
          {/* Input post box */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="bg-pink-200 p-5 mb-5 border-2 border-black shadow-[4px_4px_0px_#000] rounded-md"
          >
            <div className="flex items-center space-x-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Avatar
                  sx={{ width: "3rem", height: "3rem" }}
                  className="border-2 border-black"
                  src={user?.profilePicture || ""}
                />
              </motion.div>
              <motion.div className="flex-1" whileHover={{ scale: 1.01 }}>
                <input
                  onClick={handleOpenCreatePostModal}
                  type="text"
                  placeholder="What are you thinking?"
                  className="w-full px-4 py-2 border-2 border-black text-black font-bold bg-white shadow-[2px_2px_0px_#000] outline-none rounded-none hover:shadow-none focus:shadow-none transition-all duration-200"
                />
              </motion.div>
            </div>

            <div className="flex flex-wrap justify-between gap-3 mt-4">
              {[
                { icon: <VideocamIcon />, color: "#f87171", text: "Video trực tiếp" },
                { icon: <ImageIcon />, color: "#4ade80", text: "Ảnh/video" },
                { icon: <ArticleIcon />, color: "#facc15", text: "Bài viết/hoạt động" },
              ].map(({ icon, color, text }, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <IconButton onClick={handleOpenCreatePostModal} sx={{ color }}>
                    {icon}
                  </IconButton>
                  <span className="font-semibold text-black text-sm hidden sm:inline">
                    {text}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Reels section */}
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
                className="border-2 border-black bg-blue-300"
              >
                <AddIcon sx={{ fontSize: "2.2rem" }} />
              </Avatar>
              <p className="text-sm mt-1 text-black font-semibold">Tạo Reels</p>
            </motion.div>
          </motion.section>

          {/* Posts list */}
          <motion.div
            className="space-y-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            {loading ? (
              <div className="flex justify-center py-10">
                <CircularProgress sx={{ color: "#000" }} />
              </div>
            ) : error ? (
              <motion.p
                className="text-center text-red-600 font-bold"
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
                      duration: 0.5,
                    }}
                    className="border-2 border-black bg-white shadow-[4px_4px_0px_#000] p-4"
                  >
                    <PostCard item={item} />
                  </motion.div>
                ))}
              </AnimatePresence>
            ) : (
              <motion.p
                className="text-center text-gray-600 py-10 font-semibold"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                Không có bài viết nào.
              </motion.p>
            )}
          </motion.div>

          {/* Create Post Modal */}
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

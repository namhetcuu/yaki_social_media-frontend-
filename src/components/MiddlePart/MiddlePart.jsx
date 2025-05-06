import { Avatar, Card, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ImageIcon from "@mui/icons-material/Image";
import VideocamIcon from "@mui/icons-material/Videocam";
import ArticleIcon from "@mui/icons-material/Article";
import PostCard from "../Post/PostCard";
import CreatePostModal from "../CreatePost/CreatePostModal";
import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPostAction } from "../../Redux/Post/post.action";

//const stories = [1, 2, 3, 4, 5]; // Danh sách giả định

const MiddlePart = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { posts, loading, error } = useSelector((state) => state.posts);
  const [openCreatePostModal, setOpenCreatePostModal] = useState(false);

  const handleCloseCreatePostModal = () => setOpenCreatePostModal(false);
  const handleOpenCreatePostModal = () => setOpenCreatePostModal(true);

  // const { stories, loading: storiesLoading } = useSelector((state) => state.stories);

  const fetchPosts = useCallback(() => {
    if (token) {
      dispatch(getAllPostAction());
    }
  }, [dispatch, token]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  // useEffect(() => {
  //   dispatch(getStoriesAction()); // Lấy danh sách Stories
  // }, [dispatch]);

  return (
    <div className="px-10 w-full bg-[#f8f9fa] dark:bg-[#1c1e21] min-h-screen">
      {/* Ô nhập trạng thái */}
      <Card className="mt-5 p-5 bg-white dark:bg-[#25272a] shadow-md rounded-lg">
        <div className="flex justify-between">
          <Avatar
            sx={{ width: "3rem", height: "3rem" }}
            style={{ backgroundColor: "#0866ff" }}
            src="https://images.pexels.com/photos/31053761/pexels-photo-31053761/free-photo-of-b-n-be.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
          />
          <input
            onClick={handleOpenCreatePostModal}
            type="text"
            placeholder="Bạn đang nghĩ gì thế?"
            className="outline-none w-[90%] rounded-full px-5 bg-transparent border-[#3b4054] border text-black dark:text-white"
          />
        </div>

        {/* Nút tạo bài viết */}
        <div className="flex justify-between mt-5 space-x-9">
          {[
            { icon: <VideocamIcon />, color: "red", text: "Video trực tiếp" },
            { icon: <ImageIcon />, color: "green", text: "Ảnh/video" },
            { icon: <ArticleIcon />, color: "orange", text: "Bài viết/hoạt động" },
          ].map(({ icon, color, text }, index) => (
            <div key={index} className="flex items-center">
              <IconButton style={{ color }} onClick={handleOpenCreatePostModal}>
                {icon}
              </IconButton>
              <span className="text-black dark:text-white">{text}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Stories (Câu chuyện) */}
      <section className="flex items-center p-5 rounded-b-md">
        <div className="flex flex-col items-center mr-4 cursor-pointer">
          <Avatar sx={{ width: "3rem", height: "3rem" }} style={{ backgroundColor: "#0866ff" }}>
            <AddIcon sx={{ fontSize: "2.2rem" }} />
          </Avatar>
          <p className="text-black dark:text-white">Create Reels</p>
        </div>
        {/* {storiesLoading ? (
            <p>Đang tải...</p>
          ) : stories?.length > 0 ? (
            stories.map((story, index) => (
              <StoryCircle key={index} imageUrl={story.image} />
            ))
          ) : (
            <p>Không có story nào.</p>
          )} */}

      </section>

      {/* Danh sách bài viết */}
      <div className="mt-5 space-y-5">
        {loading ? (
          <p className="text-center text-gray-500">Đang tải bài viết...</p>
        ) : error ? (
          <p className="text-center text-red-500">Lỗi: {error}</p>
        ) : posts?.length > 0 ? (
          posts.map((item, index) => <PostCard key={index} item={item} />)
        ) : (
          <p className="text-center text-gray-500">Không có bài viết nào.</p>
        )}
      </div>

      {/* Modal tạo bài viết */}
      <CreatePostModal handleClose={handleCloseCreatePostModal} open={openCreatePostModal} />
    </div>
  );
};

export default MiddlePart;

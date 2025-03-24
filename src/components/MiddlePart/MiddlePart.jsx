import { Avatar, Card, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import StoryCircle from "./StoryCircle";
import ImageIcon from "@mui/icons-material/Image";
import VideocamIcon from "@mui/icons-material/Videocam";
import ArticleIcon from "@mui/icons-material/Article";
import PostCard from "../Post/PostCard";
import { Create } from "@mui/icons-material";
import CreatePostModal from "../CreatePost/CreatePostModal";
import { useState } from "react";

const stories = [1, 2, 3, 4, 5]; // Danh sách giả định có ID
const posts = [1, 2, 3, 4, 5]; // Danh sách giả định có ID

const MiddlePart = () => {
  const [openCreatePostModal, setOpenCreatePostModal] = useState(false);
  const handleCloseCreatePostModal = () => setOpenCreatePostModal(false);
  // const handleOpenCreatePostModal = () => setOpenCreatePostModal(true);

  const handleOpenCreatePostModal = () => {
    setOpenCreatePostModal(true);
    console.log("Open create post modal",openCreatePostModal);
  };


  return (
    <div className="px-10 w-full">
      {/* 💬 Ô nhập trạng thái */}
      <Card className="mt-5 p-5">
        <div className="flex justify-between">
          <Avatar
            sx={{ width: "3rem", height: "3rem" }}
            style={{ backgroundColor: "#0866ff" }}
            src="https://images.pexels.com/photos/31053761/pexels-photo-31053761/free-photo-of-b-n-be.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
          />
          <input
          onClick={handleOpenCreatePostModal}
            type="text"
            placeholder="Nam ơi, bạn đang nghĩ gì thế?"
            className="outline-none w-[90%] rounded-full px-5 bg-transparent border-[#3b4054] border"
          />
        </div>

        {/* 🔹 Nút tạo bài viết */}
        <div className="flex justify-between mt-5 space-x-9">
          <div className="flex items-center">
            <IconButton style={{ color: "red" }} onClick={handleOpenCreatePostModal}>
              <VideocamIcon />
            </IconButton>
            <span>Video trực tiếp</span>
          </div>

          <div className="flex items-center">
            <IconButton style={{ color: "green" }} onClick={handleOpenCreatePostModal}>
              <ImageIcon />
            </IconButton>
            <span>Ảnh/video</span>
          </div>

          <div className="flex items-center">
            <IconButton style={{ color: "orange" }} onClick={handleOpenCreatePostModal}>
              <ArticleIcon />
            </IconButton>
            <span>Bài viết/hoạt động</span>
          </div>
        </div>
      </Card>

      {/* 🔹 Stories (Câu chuyện) */}
      <section className="flex items-center p-5 rounded-b-md">
        {/* 🔹 Nút tạo story */}
        <div className="flex flex-col items-center mr-4 cursor-pointer">
          <Avatar sx={{ width: "3rem", height: "3rem" }} style={{ backgroundColor: "#0866ff" }}>
            <AddIcon sx={{ fontSize: "2.2rem" }} />
          </Avatar>
          <p>Create Reels</p>
        </div>

        {/* 🔹 Danh sách stories */}
        {stories.map((item, index) => (
          <StoryCircle key={index} />
        ))}
      </section>

      {/* 🔹 Danh sách bài viết */}
      <div className="mt-5 space-y-5">
        {posts.map((item, index) => (
          <PostCard key={index} />
        ))}
      </div>
      <div>
        <CreatePostModal handleClose={handleCloseCreatePostModal} open={openCreatePostModal}/>
      </div>
    </div>
  );
};

export default MiddlePart;

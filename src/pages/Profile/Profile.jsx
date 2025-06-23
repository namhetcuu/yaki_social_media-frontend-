import { Avatar, Box, Button, Card, Tab, Tabs, Modal, Fade, IconButton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Close } from '@mui/icons-material';
import PostCard from '../../components/Post/PostCard';
import ProfileModal from './ProfileModal';
import { getUsersPostAction } from '../../Redux/Post/post.action';

const tabs = [
  { value: 'post', name: 'Posts' },
  { value: 'reels', name: 'Reels' },
  { value: 'saved', name: 'Saved' },
  { value: 'repost', name: 'Repost' },
];

const Profile = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState('post');
  const [open, setOpen] = useState(false);
  const auth = useSelector((state) => state.auth);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleChange = (event, newValue) => setValue(newValue);

  const user = auth.user || { firstName: 'Guest', lastName: 'User' };
  const userId = user.id;
  const userPosts = useSelector((state) => state.posts?.userPosts || []);

  useEffect(() => {
    if (userId) {
      dispatch(getUsersPostAction(userId));
    }
  }, [dispatch, userId]);

  return (
    <div className="my-10 mx-auto w-[95%] bg-white border-2 border-black rounded-md">
      <div className="h-[15rem] border-b-2 border-black">
        <img className="w-full h-full object-cover rounded-t-md" src="https://images.pexels.com/photos/31120801/pexels-photo-31120801/free-photo-of-phong-c-nh-bai-bi-n-tuy-t-d-p-v-i-d-o-rocky.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" alt="cover" />
      </div>

      <div className="flex justify-between items-start px-6 mt-5 h-[5rem]">
        <Avatar className="transform -translate-y-24 border-2 border-black" sx={{ width: '10rem', height: '10rem' }} src={`${user.profilePicture}`} />
        <button
          onClick={handleOpen}
          className="border-2 border-black px-6 py-2 font-bold uppercase rounded-lg shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:shadow-none cursor-pointer transition duration-300"
        >
          Edit Profile
        </button>
      </div>

      <div className="p-6 text-black">
        <h1 className="font-bold text-3xl">{`${user.firstName} ${user.lastName}`}</h1>
        <p className="text-sm font-mono">@{`${user.firstName}-${user.lastName}`.toLowerCase()}</p>
        <div className="flex gap-6 items-center py-3 font-semibold">
          <span>41 posts</span>
          <span>35 followers</span>
          <span>5 followings</span>
        </div>
        <p className="italic text-gray-600">Lorem ipsum dolor sit amet consectetur adipisicing elit...</p>
      </div>

      <div className="border-t-2 border-black px-6">
        <div className="flex gap-4 text-center justify-around mt-4 font-bold text-black uppercase">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setValue(tab.value)}
              className={`px-4 py-2 border-2 ${value === tab.value ? 'bg-black text-white' : 'border-black'} rounded-md hover:bg-black hover:text-white transition`}
            >
              {tab.name}
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-center my-10">
        {value === 'post' && (
          <div className="space-y-5 w-[95%]">
            {Array.isArray(userPosts) && userPosts.length > 0 ? (
              userPosts.map((post) =>
                post ? (
                  <div key={post.id} className="border-2 border-black rounded-md p-4">
                    <PostCard item={post} />
                  </div>
                ) : (
                  <p key={Math.random()} className="text-center text-red-600 font-bold">Lỗi: Bài viết không hợp lệ</p>
                )
              )
            ) : (
              <p className="text-center font-mono">Người dùng chưa có bài viết nào.</p>
            )}
          </div>
        )}
      </div>

      <Modal open={open} onClose={handleClose} closeAfterTransition>
        <Fade in={open}>
          <div className="bg-white p-5 border-2 border-black rounded-md w-[400px] mx-auto mt-20 relative">
            <IconButton onClick={handleClose} className="absolute top-2 right-2 text-black">
              <Close />
            </IconButton>
            <ProfileModal open={open} handleClose={handleClose} user={user} />
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default Profile;

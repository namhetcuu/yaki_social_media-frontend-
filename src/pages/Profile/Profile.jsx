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
      console.log("🚀 Fetching user posts for userId:", userId);
      dispatch(getUsersPostAction(userId));
    }
  }, [dispatch, userId]);

  useEffect(() => {
    console.log("📌 Updated userPosts:", userPosts);
  }, [userPosts]);

  return (
    <Card className="my-10 w-[95%]">
      <div className="rounded-md">
        <div className="h-[15rem]">
          <img className="w-full h-full rounded-t-md" src="https://images.pexels.com/photos/31120801/pexels-photo-31120801/free-photo-of-phong-c-nh-bai-bi-n-tuy-t-d-p-v-i-d-o-rocky.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" alt="cover" />
        </div>

        <div className="px-5 flex justify-between items-start mt-5 h-[5rem]">
          <Avatar className="transform -translate-y-24" sx={{ width: '10rem', height: '10rem' }} src="https://images.pexels.com/photos/18166547/pexels-photo-18166547/free-photo-of-bi-n-k-ngh-dan-ba-b-bi-n.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" />
          <Button
            sx={{ borderRadius: '20rem', transition: '0.3s', '&:hover': { transform: 'scale(1.05)' }, '&:active': { transform: 'scale(0.95)' } }}
            variant="outlined"
            onClick={handleOpen}
          >
            Edit Profile
          </Button>
        </div>

        <div className="p-5">
          <h1 className="py-1 font-bold text-2xl">{`${user.firstName} ${user.lastName}`}</h1>
          <p>@{`${user.firstName}-${user.lastName}`.toLowerCase()}</p>
          <div className="flex gap-5 items-center py-3">
            <span>41 posts</span>
            <span>35 followers</span>
            <span>5 followings</span>
          </div>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit...</p>
        </div>

        <Box sx={{ width: '100%', borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="wrapped label tabs example">
            {tabs.map((item) => (
              <Tab key={item.value} value={item.value} label={item.name} />
            ))}
          </Tabs>
        </Box>

        <div className="flex justify-center my-10">
          {value === 'post' && (
            <div className="space-y-5 w-[95%]">
              {Array.isArray(userPosts) && userPosts.length > 0 ? (
                userPosts.map((post) => (
                  post ? (
                    <div key={post.id} className="border border-gray-200 rounded-md">
                      <PostCard item={post} />
                    </div>
                  ) : (
                    <p key={Math.random()} className="text-center text-red-500">Lỗi: Bài viết không hợp lệ</p>
                  )
                ))
              ) : (
                <p className="text-center">Người dùng chưa có bài viết nào.</p>
              )}
            </div>
          )}
        </div>
      </div>

      <Modal open={open} onClose={handleClose} closeAfterTransition>
        <Fade in={open}>
          <div className="bg-white p-5 rounded-lg shadow-lg w-[400px] mx-auto mt-20 relative">
            <IconButton onClick={handleClose} className="absolute top-2 right-2">
              <Close />
            </IconButton>
            <ProfileModal open={open} handleClose={handleClose} user={user} />
          </div>
        </Fade>
      </Modal>
    </Card>
  );
};

export default Profile;

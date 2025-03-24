import { Avatar, Box, Button, Card, Tab, Tabs } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import PostCard from '../../components/Post/PostCard';
import UserReelCard from '../../components/Reels/UserReelCard';
import ProfileModal from './ProfileModal';

const tabs = [
  { value: 'post', name: 'Posts' },
  { value: 'reels', name: 'Reels' },
  { value: 'saved', name: 'Saved' },
  { value: 'repost', name: 'Repost' },
];

const Profile = () => {
  //Biến value quản lý tab hiện tại, mặc định là post.
  const [value, setValue] = React.useState('post');
  //Biến open kiểm soát trạng thái modal chỉnh sửa hồ sơ.
  const [open, setOpen] = React.useState(false);
  //Lấy thông tin user từ Redux store.
  const auth = useSelector((state) => state.auth);
  
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleChange = (event, newValue) => setValue(newValue);

  const user = auth.user || { firstName: 'Guest', lastName: 'User' };

  return (
    <Card className="my-10 w-[95%]">
      <div className="rounded-md">
        {/* Ảnh bìa */}
        <div className="h-[15rem]">
          <img
            className="w-full h-full rounded-t-md"
            src="https://images.pexels.com/photos/31120801/pexels-photo-31120801/free-photo-of-phong-c-nh-bai-bi-n-tuy-t-d-p-v-i-d-o-rocky.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
            alt="cover"
          />
        </div>

        {/* Avatar và nút Edit */}
        <div className="px-5 flex justify-between items-start mt-5 h-[5rem]">
          <Avatar
            className="transform -translate-y-24"
            sx={{ width: '10rem', height: '10rem' }}
            src="https://images.pexels.com/photos/18166547/pexels-photo-18166547/free-photo-of-bi-n-k-ngh-dan-ba-b-bi-n.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
          />
          <Button sx={{ borderRadius: '20rem' }} variant="outlined" onClick={handleOpen}>
            Edit Profile
          </Button>
        </div>

        {/* Thông tin cá nhân */}
        <div className="p-5">
          <div className="text-left w-full">
            <h1 className="py-1 font-bold text-2xl">{`${user.firstName} ${user.lastName}`}</h1>
            <p>@{`${user.firstName}-${user.lastName}`.toLowerCase()}</p>
          </div>

          <div className="flex gap-5 items-center py-3">
            <span>41 posts</span>
            <span>35 followers</span>
            <span>5 followings</span>
          </div>

          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora minima dolorem vel, rerum porro fugit iure nesciunt culpa sint magni molestias tempore, libero omnis odit labore repellat in illum laborum?
          </p>
        </div>

        {/* Tabs */}
        <section>
          <Box sx={{ width: '100%', borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="wrapped label tabs example">
              {tabs.map((item) => (
                <Tab key={item.value} value={item.value} label={item.name} />
              ))}
            </Tabs>
          </Box>

          {/* Nội dung theo Tab */}
          <div className="flex justify-center my-10">
          {/* Nếu value === 'saved', React sẽ hiển thị: */}
            {value === 'post' && (
              <div className="space-y-5 w-[95%]">
                {[...Array(4)].map((_, index) => (
                  <div key={index} className="border border-gray-200 rounded-md">
                    <PostCard />
                  </div>
                ))}
              </div>
            )}

            {value === 'reels' && (
              <div className="flex justify-between flex-wrap gap-2">
                {[...Array(4)].map((_, index) => (
                  <UserReelCard key={index} />
                ))}
              </div>
            )}

            {value === 'saved' && (
              <div className="space-y-5 w-[70%]">
                {[...Array(4)].map((_, index) => (
                  <div key={index} className="border border-gray-200 rounded-md">
                    <PostCard />
                  </div>
                ))}
              </div>
            )}
            
          </div>
        </section>
      </div>

      {/* Modal chỉnh sửa hồ sơ */}
      <ProfileModal open={open} handleClose={handleClose} user={user}/>
    </Card>
  );
};

export default Profile;

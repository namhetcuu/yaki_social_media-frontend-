import * as React from 'react';
import { Avatar, Button, Card, Divider, Menu, MenuItem } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchUserProfile } from '../../Redux/Auth/auth.action.js';
import { useNavigate } from 'react-router-dom';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import HomeIcon from '@mui/icons-material/Home';
import ExploreIcon from '@mui/icons-material/Explore';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MessageIcon from '@mui/icons-material/Message';
import GroupIcon from '@mui/icons-material/Group';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Face5Icon from '@mui/icons-material/Face5';

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector(state => state.auth);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt && !auth.user) { 
      dispatch(fetchUserProfile());
    }
  }, [auth.user, dispatch]); 

  const userId = auth.user?.id || "default-id";

  // ✅ Tạo navigation bên trong component để tránh lỗi useSelector
  const navigation = [
    { title: 'Home', icon: <HomeIcon />, path: '/home' },
    { title: 'Reels', icon: <ExploreIcon />, path: '/home/reels' },
    { title: 'Create Reels', icon: <ControlPointIcon />, path: '/home/create-reels' },
    { title: 'Notifications', icon: <NotificationsIcon />, path: '/home/notifications' },
    { title: 'Message', icon: <MessageIcon />, path: '/message' },
    { title: 'Chat with AI', icon: <Face5Icon />, path: '/chatwithai' },
    { title: 'Communities', icon: <GroupIcon />, path: '/communities' },
    { title: 'Profile', icon: <AccountCircleIcon />, path: `/home/profile/${userId}` },
  ];

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleClose = () => {
    localStorage.removeItem("jwt"); // Xóa token
    dispatch({ type: "LOGOUT" }); // Nếu có action logout trong Redux, gọi nó
    navigate("/login"); // Chuyển hướng về trang đăng nhập
  };

  return (
    <Card className='h-screen flex flex-col justify-between py-5' style={{ padding: 5 }}>
      <div className='space-y-8 pl-5'>
        <div className='text-center'>
          <span className='font-bold text-5xl' 
          >Yaki</span>
        </div>

        <div className='space-y-6'>
          {navigation.map((item, index) => (
            <div 
              key={index} 
              onClick={() => navigate(item.path)} 
              className='flex items-center space-x-4 cursor-pointer p-2 hover:bg-gray-200 rounded'
            >
              <span className='text-2xl'>{item.icon}</span>
              <span className='text-lg'>{item.title}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <Divider />

        <div className='pl-5 flex items-center justify-between pt-5'>
          <div className='flex items-center space-x-3'>
            <Avatar 
              src={auth.user?.avatar || "https://via.placeholder.com/150"} 
              alt="User Avatar"
            />
            <div>
              <p className='font-bold'>{auth.user ? `${auth.user.firstName} ${auth.user.lastName}` : "Guest"}</p>
              <p className='opacity-70'>@{auth.user ? `${auth.user.firstName}-${auth.user.lastName}` : "guest-user"}</p>
            </div>
          </div>

          <div>
            <Button
              id="basic-button"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
            >
              <MoreVertIcon />
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{ 'aria-labelledby': 'basic-button' }}
            >
              <MenuItem onClick={() => { handleClose(); navigate(`/home/profile/${userId}`); }}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default Sidebar;

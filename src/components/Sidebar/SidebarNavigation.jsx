import HomeIcon from '@mui/icons-material/Home';
import ExploreIcon from '@mui/icons-material/Explore';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MessageIcon from '@mui/icons-material/Message';
import ListAltIcon from '@mui/icons-material/ListAlt';
import GroupIcon from '@mui/icons-material/Group';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useSelector } from 'react-redux';

const user = useSelector(state => state.auth.user); // Lấy user từ Redux

const navigation = [
    {
        title: 'Home',
        icon: <HomeIcon />, // ✅ Lưu JSX trực tiếp
        path: '/home'
    },
    {
        title: 'Reels',
        icon: <ExploreIcon />,
        path: '/home/reels'
    },
    {
        title: 'Create Reels',
        icon: <ControlPointIcon />,
        path: '/home/create-reels'
    },
    {
        title: 'Notifications',
        icon: <NotificationsIcon />,
        path: '/notifications'
    },
    {
        title: 'Message',
        icon: <MessageIcon />,
        path: '/message'
    },
    {
        title: 'Lists',
        icon: <ListAltIcon />,
        path: '/lists'
    },
    {
        title: 'Communities',
        icon: <GroupIcon />,
        path: '/communities'
    },
    {
        title: 'Profile',
        icon: <AccountCircleIcon />,
        path: `/home/profile/${user?.id || 1}`
    },
];

export default navigation;

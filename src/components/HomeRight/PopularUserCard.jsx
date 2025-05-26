import { Avatar, Button, Box } from '@mui/material';
import { red } from '@mui/material/colors';
import { useDispatch, useSelector } from 'react-redux';
import { followUser, getUserWithFollowStatus, unfollowUser } from '../../Redux/Users/user.action';

const PopularUserCard = ({ user }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.auth.user);
  const followed = user.followed;

  const handleFollowToggle = () => {
    if (!currentUser?.id || !user?.id) return;
    followed 
      ? dispatch(unfollowUser(currentUser.id, user.id))
      : dispatch(followUser(currentUser.id, user.id));
    
    setTimeout(() => dispatch(getUserWithFollowStatus(currentUser.id)), 300);
  };

  return (
    <Box sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%', // Hoặc width cố định nếu muốn
      minWidth: '300px', // Thiết lập chiều rộng tối thiểu
      maxWidth: '100%', // Giới hạn chiều rộng tối đa
      overflowX: 'auto', // Quan trọng: cho phép cuộn ngang khi nội dung tràn
      scrollbarWidth: 'thin', // Kiểu thanh cuộn
      '&::-webkit-scrollbar': { // Tùy chỉnh cho trình duyệt WebKit
        height: '6px',
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: 'text.secondary',
        borderRadius: '3px',
      },
      py: 1.5,
      px: 2,
      boxSizing: 'border-box',
      '&:hover': {
        backgroundColor: 'action.hover',
        borderRadius: 1
      }
    }}>
      {/* Phần bên trái - Avatar và thông tin */}
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        flex: 1,
        minWidth: 0,
        overflow: 'hidden',
        mr: 2
      }}>
        <Avatar 
          sx={{ 
            width: { xs: 48, sm: 56 },
            height: { xs: 48, sm: 56 },
            bgcolor: red[500],
            mr: 2,
            flexShrink: 0
          }}
          src={user?.avatar}
        >
          {user?.username?.charAt(0).toUpperCase() || 'U'}
        </Avatar>

        <Box sx={{
          minWidth: 0,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}>
          <Box sx={{
            fontWeight: 'bold',
            fontSize: { xs: '0.875rem', sm: '0.9375rem' },
            lineHeight: 1.2,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}>
            {user?.username || 'Anonymous'}
          </Box>
          <Box sx={{
            color: 'text.secondary',
            fontSize: { xs: '0.75rem', sm: '0.8125rem' },
            lineHeight: 1.2,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            mt: 0.5
          }}>
            @{(user?.username || 'user').toLowerCase().replace(/\s+/g, '')}
          </Box>
        </Box>
      </Box>

      {/* Nút Follow bên phải */}
      <Box sx={{
        flexShrink: 0,
        ml: 'auto'
      }}>
        <Button
          variant={followed ? 'outlined' : 'contained'}
          size="small"
          sx={{
            borderRadius: 6,
            fontSize: { xs: '0.75rem', sm: '0.8125rem' },
            fontWeight: 'bold',
            textTransform: 'none',
            px: { xs: 1.5, sm: 2.5 },
            py: 0.5,
            minWidth: { xs: 80, sm: 96 },
            height: { xs: 32, sm: 36 },
            backgroundColor: followed ? 'transparent' : '#0866ff',
            color: followed ? 'text.primary' : 'white',
            borderColor: followed ? 'action.disabled' : 'transparent',
            '&:hover': {
              backgroundColor: followed ? 'action.hover' : '#1877f2',
              borderColor: followed ? 'action.disabled' : 'transparent'
            }
          }}
          onClick={handleFollowToggle}
        >
          {followed ? 'Following' : 'Follow'}
        </Button>
      </Box>
    </Box>
  );
};

export default PopularUserCard;
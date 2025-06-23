import React, { useState } from 'react';
import { 
  Box,
  Badge,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  Divider,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  IconButton
} from '@mui/material';
import {
  Close as CloseIcon,
  MarkEmailRead as MarkEmailReadIcon,
  LocalShipping as LocalShippingIcon,
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon,
  Notifications as NotificationsIcon
} from '@mui/icons-material';
import { green, red, orange, blue } from '@mui/material/colors';

const Notification = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Bạn có tin nhắn mới",
      message: "Khánh lê công đã gửi bạn một tin nhắn",
      time: "10 phút trước",
      read: false,
      type: "message",
      avatar: "https://i.pravatar.cc/150?img=1"
    },
    {
      id: 2,
      title: "Bạn có 1 tin nhắn mới",
      message: "Liễu Hồ Thị đã gửi bạn một tin nhắn",
      time: "2 giờ trước",
      read: false,
      type: "order",
      avatar: "https://i.pravatar.cc/150?img=2"
    },
    {
      id: 3,
      title: "Hệ thống bảo trì",
      message: "Hệ thống sẽ bảo trì từ 2h-4h ngày mai",
      time: "1 ngày trước",
      read: true,
      type: "system",
      avatar: "https://i.pravatar.cc/150?img=3"
    },
    {
      id: 4,
      title: "Đăng tin reels thành công",
      message: "Bạn đã đăng tin reels thành công",
      time: "3 ngày trước",
      read: true,
      type: "payment",
      avatar: "https://i.pravatar.cc/150?img=4"
    }
  ]);

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleNotificationClick = (notification) => {
    // Đánh dấu là đã đọc
    if (!notification.read) {
      setNotifications(notifications.map(n => 
        n.id === notification.id ? {...n, read: true} : n
      ));
    }
    setSelectedNotification(notification);
    setOpenDialog(true);
  };

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map(n => ({...n, read: true})));
  };

  const handleDeleteAll = () => {
    setNotifications([]);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const getNotificationIcon = (type) => {
    switch(type) {
      case 'message':
        return <MarkEmailReadIcon sx={{ color: blue[500] }} />;
      case 'order':
        return <LocalShippingIcon sx={{ color: green[500] }} />;
      case 'system':
        return <WarningIcon sx={{ color: orange[500] }} />;
      case 'payment':
        return <CheckCircleIcon sx={{ color: green[500] }} />;
      default:
        return <NotificationsIcon />;
    }
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h6" fontWeight="bold">
          Thông báo ({unreadCount} chưa đọc)
        </Typography>
        <Box>
          <Button 
            size="small" 
            onClick={handleMarkAllAsRead}
            disabled={unreadCount === 0}
          >
            Đánh dấu đã đọc
          </Button>
          <Button 
            size="small" 
            onClick={handleDeleteAll}
            disabled={notifications.length === 0}
            color="error"
          >
            Xóa tất cả
          </Button>
        </Box>
      </Box>

      <List sx={{ p: 0 }}>
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <React.Fragment key={notification.id}>
              <ListItem 
                button
                onClick={() => handleNotificationClick(notification)}
                sx={{
                  bgcolor: notification.read ? 'inherit' : 'action.hover',
                  '&:hover': { bgcolor: 'action.selected' }
                }}
              >
                <ListItemAvatar>
                  <Badge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    badgeContent={getNotificationIcon(notification.type)}
                  >
                    <Avatar src={notification.avatar} />
                  </Badge>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography fontWeight={notification.read ? 'normal' : 'bold'}>
                        {notification.title}
                      </Typography>
                      {!notification.read && (
                        <Chip 
                          label="Mới" 
                          size="small" 
                          sx={{ ml: 1, height: '16px' }} 
                          color="error"
                        />
                      )}
                    </Box>
                  }
                  secondary={
                    <>
                      <Typography variant="body2">
                        {notification.message}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {notification.time}
                      </Typography>
                    </>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
            </React.Fragment>
          ))
        ) : (
          <ListItem>
            <ListItemText
              primary="Không có thông báo nào"
              secondary="Bạn sẽ thấy thông báo mới ở đây"
              sx={{ textAlign: 'center', py: 2 }}
            />
          </ListItem>
        )}
      </List>

      {/* Dialog xem chi tiết thông báo */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {selectedNotification && getNotificationIcon(selectedNotification.type)}
            <Typography variant="h6" sx={{ ml: 1 }}>
              {selectedNotification?.title}
            </Typography>
          </Box>
          <IconButton onClick={handleCloseDialog}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Avatar 
              src={selectedNotification?.avatar} 
              sx={{ width: 56, height: 56, mr: 2 }}
            />
            <Box>
              <Typography variant="subtitle1" gutterBottom>
                {selectedNotification?.message}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {selectedNotification?.time}
              </Typography>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Đóng</Button>
          <Button 
            variant="contained" 
            onClick={handleCloseDialog}
            color="primary"
          >
            Xem chi tiết
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Notification;

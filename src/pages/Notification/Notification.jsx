import React, { useState, useEffect } from 'react';
import { 
  Box,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  Badge,
  IconButton,
  Divider,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import CloseIcon from '@mui/icons-material/Close';
import { green, red, orange } from '@mui/material/colors';

// Dữ liệu thông báo mẫu (giữ nguyên)
const sampleNotifications = [
  {
    id: 1,
    title: "Bạn có tin nhắn mới",
    message: "Nguyễn Văn A đã gửi bạn một tin nhắn",
    time: "10 phút trước",
    read: false,
    type: "message",
    avatar: "https://i.pravatar.cc/150?img=1"
  },
  {
    id: 2,
    title: "Đơn hàng đã xác nhận",
    message: "Đơn hàng #12345 của bạn đã được xác nhận",
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
  }
];

const Notification = () => {
  const [notifications, setNotifications] = useState(sampleNotifications);
  const [open, setOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [selectedNotification, setSelectedNotification] = useState(null); // Thông báo được chọn để xem chi tiết

  // Tính số thông báo chưa đọc
  useEffect(() => {
    const count = notifications.filter(n => !n.read).length;
    setUnreadCount(count);
  }, [notifications]);

  // Đánh dấu đã đọc
  const markAsRead = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  // Đánh dấu tất cả là đã đọc
  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  // Xóa một thông báo
  const deleteNotification = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  // Xóa tất cả thông báo
  const clearAllNotifications = () => {
    setNotifications([]);
  };

  // Lấy màu theo loại thông báo
  const getTypeColor = (type) => {
    switch(type) {
      case 'message': return green[500];
      case 'order': return orange[500];
      case 'system': return red[500];
      default: return '#1976d2';
    }
  };

  // Mở modal xem chi tiết thông báo
  const handleOpenDetail = (notification) => {
    setSelectedNotification(notification);
    if (!notification.read) {
      markAsRead(notification.id);
    }
    setOpen(true);
  };

  // Đóng modal
  const handleCloseDetail = () => {
    setOpen(false);
    setSelectedNotification(null);
  };

  return (
    <Box sx={{ position: 'relative' }}>
      {/* Nút thông báo */}
      <IconButton 
        size="large"
        color="inherit"
        onClick={() => setOpen(prev => !prev)}
        sx={{ position: 'relative' }}
      >
        <Badge badgeContent={unreadCount} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>

      {/* Panel thông báo */}
      {open && (
        <Box sx={{
          position: 'absolute',
          right: 0,
          top: '100%',
          width: 350,
          maxHeight: 500,
          bgcolor: 'background.paper',
          boxShadow: 24,
          borderRadius: 1,
          overflow: 'hidden',
          zIndex: 1000
        }}>
          {/* Header */}
          <Box sx={{
            p: 2,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            bgcolor: 'primary.main',
            color: 'white'
          }}>
            <Typography variant="h6">Thông báo</Typography>
            <Box>
              <Button 
                size="small" 
                color="inherit"
                onClick={markAllAsRead}
                disabled={unreadCount === 0}
              >
                Đánh dấu đã đọc
              </Button>
              <Button 
                size="small" 
                color="inherit"
                onClick={clearAllNotifications}
                disabled={notifications.length === 0}
              >
                Xóa tất cả
              </Button>
            </Box>
          </Box>

          {/* Danh sách thông báo */}
          <List sx={{ 
            maxHeight: 400,
            overflowY: 'auto',
            '&::-webkit-scrollbar': { width: '6px' },
            '&::-webkit-scrollbar-thumb': { bgcolor: 'grey.400' }
          }}>
            {notifications.length === 0 ? (
              <ListItem>
                <ListItemText 
                  primary="Không có thông báo nào" 
                  sx={{ textAlign: 'center', color: 'text.secondary' }}
                />
              </ListItem>
            ) : (
              notifications.map((notification) => (
                <React.Fragment key={notification.id}>
                  <ListItem 
                    sx={{ 
                      bgcolor: notification.read ? 'inherit' : 'action.hover',
                      '&:hover': { bgcolor: 'action.selected' },
                      cursor: 'pointer'
                    }}
                    onClick={() => handleOpenDetail(notification)}
                  >
                    <ListItemAvatar>
                      <Avatar 
                        src={notification.avatar}
                        sx={{ 
                          bgcolor: getTypeColor(notification.type),
                          width: 40, 
                          height: 40 
                        }}
                      >
                        {notification.title.charAt(0)}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={notification.title}
                      secondary={
                        <>
                          <Typography
                            component="span"
                            variant="body2"
                            color="text.primary"
                            display="block"
                          >
                            {notification.message}
                          </Typography>
                          <Typography
                            component="span"
                            variant="caption"
                            color="text.secondary"
                          >
                            {notification.time}
                          </Typography>
                        </>
                      }
                    />
                    <IconButton 
                      edge="end" 
                      aria-label="delete"
                      onClick={(e) => {
                        e.stopPropagation(); // Ngăn không cho sự kiện click lan ra ListItem
                        deleteNotification(notification.id);
                      }}
                    >
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </React.Fragment>
              ))
            )}
          </List>
        </Box>
      )}

      {/* Modal xem chi tiết thông báo */}
      <Dialog open={open && !!selectedNotification} onClose={handleCloseDetail} maxWidth="sm" fullWidth>
        <DialogTitle>{selectedNotification?.title}</DialogTitle>
        <DialogContent dividers>
          <Typography variant="body1" gutterBottom>
            {selectedNotification?.message}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {selectedNotification?.time}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDetail} color="primary">
            Đóng
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Notification;

import { useState, useEffect, useMemo } from 'react';
import { Dialog, DialogContent, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { getUsersByIds } from '../../Redux/Users/user.action';

const ChatMessage = ({ messages, currentUserId }) => {
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const dispatch = useDispatch();

  const userIds = useMemo(() => {
    return messages?.map((message) => message.userId) || [];
  }, [messages]);

  const { allUsers } = useSelector((store) => store.users) || {};

  useEffect(() => {
    if (userIds.length > 0) {
      dispatch(getUsersByIds(userIds));
    }
  }, [dispatch, userIds]);

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="space-y-2 px-2">
      {messages?.map((message) => {
        const user = allUsers ? allUsers[message.userId] : null;

        return (
          <div
  key={message.id}
  className={`flex ${message.userId === currentUserId ? 'justify-end' : 'justify-start'}`}
>
  <div className="flex items-center space-x-2">
    {user?.profilePicture ? (
      <img
        src={user.profilePicture}
        alt={`${user.username} profile`}
        className="w-8 h-8 rounded-full object-cover"
      />
    ) : (
      <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-xs text-white">
        {user?.firstName?.charAt(0) || '?'}
      </div>
    )}
    <div
      className={`inline-block rounded-lg p-2 text-sm max-w-[100%] min-w-[50px] break-words ${
        message.userId === currentUserId
          ? 'bg-blue-500 text-white'
          : 'bg-gray-200 text-gray-800'
      }`}
      style={{ maxWidth: '100%', minWidth: '50px', wordBreak: 'break-word' }}
    >
      {message.image && (
        <img
          src={message.image}
          alt="Message content"
          className="rounded-lg mb-2 max-w-full h-auto cursor-pointer hover:opacity-90 transition-opacity"
          onClick={() => handleImageClick(message.image)}
        />
      )}
      {message.content && <p>{message.content}</p>}
      <p className="text-xs opacity-70 mt-0.5 text-right">
        {new Date(message.createdAt).toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit'
        })}
      </p>
    </div>
  </div>
</div>

        );
      })}

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogContent className="relative p-0">
          <IconButton
            aria-label="close"
            onClick={handleClose}
            className="absolute right-2 top-2 z-10 bg-black/50 text-white hover:bg-black/70"
          >
            <CloseIcon />
          </IconButton>
          <img
            src={selectedImage}
            alt="Preview"
            className="w-full h-full object-contain max-h-[80vh]"
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ChatMessage;

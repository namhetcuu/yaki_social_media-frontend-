import { useState } from 'react';
import { Dialog, DialogContent, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const ChatMessage = ({ messages, currentUserId }) => {
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="space-y-2 px-2">
      {messages?.map((message) => (
        <div
          key={message.id}
          className={`flex ${
            message.userId === currentUserId ? 'justify-end' : 'justify-start'
          }`}
        >
          <div
            className={`max-w-[30%] rounded-lg p-2 text-sm ${
              message.userId === currentUserId
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-800'
            }`}
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
      ))}

      {/* Modal xem ảnh phóng to */}
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
      >
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
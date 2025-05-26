import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateReelsForm = () => {
  const [title, setTitle] = useState('');
  const [videoFile, setVideoFile] = useState(null);
  const navigate = useNavigate();

  const handleVideoChange = (e) => {
    setVideoFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !videoFile) {
      alert('Vui lòng nhập đầy đủ thông tin');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('video', videoFile);

    try {
      const jwt = localStorage.getItem("jwt");
      await axios.post(
        '/api/reels', // <-- Đổi đường dẫn nếu khác
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      alert('Tạo reels thành công!');
      navigate('/home'); // hoặc trang reel list
    } catch (error) {
      console.error('Error uploading reel:', error);
      alert('Tạo reels thất bại!');
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: 500,
        margin: 'auto',
        mt: 4,
        p: 3,
        border: '1px solid #ddd',
        borderRadius: 3,
        boxShadow: 2,
        bgcolor: 'white',
      }}
    >
      <Typography variant="h5" gutterBottom>
        Tạo Reels mới
      </Typography>

      <TextField
        fullWidth
        label="Tiêu đề"
        variant="outlined"
        margin="normal"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <Button
        variant="contained"
        component="label"
        startIcon={<CloudUploadIcon />}
        fullWidth
        sx={{ my: 2 }}
      >
        Upload video
        <input
          type="file"
          accept="video/*"
          hidden
          onChange={handleVideoChange}
        />
      </Button>

      {videoFile && (
        <video
          controls
          width="100%"
          style={{ marginBottom: 16 }}
          src={URL.createObjectURL(videoFile)}
        />
      )}

      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{ py: 1.5 }}
      >
        Đăng Reels
      </Button>
    </Box>
  );
};

export default CreateReelsForm;

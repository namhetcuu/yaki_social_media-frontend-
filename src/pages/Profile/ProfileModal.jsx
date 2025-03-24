import { Modal, Box, TextField, Button } from "@mui/material";
import React, { useEffect, useState } from "react";

const ProfileModal = ({ open, handleClose, user }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    bio: "",
    avatar: "",
  });

  // Load dữ liệu khi mở modal
  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        bio: user.bio || "",
        avatar: user.avatar || "",
      });
    }
  }, [user, open]); // Chạy lại khi `user` hoặc `open` thay đổi

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    console.log("Dữ liệu mới:", formData);
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box className="bg-white p-5 rounded-md w-[400px] mx-auto mt-20">
        <h2 className="text-xl font-bold mb-3">Chỉnh sửa hồ sơ</h2>
        <TextField
          label="First Name"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          fullWidth
          className="mb-10"
        />
        <TextField
          label="Last Name"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          fullWidth
          className="mb-3"
        />


        <Button onClick={handleSave} variant="contained" color="primary">
          Lưu thay đổi
        </Button>
      </Box>
    </Modal>
  );
};

export default ProfileModal;

import { Modal, Box, TextField, Button, CircularProgress, IconButton } from "@mui/material";
import { useState, useEffect } from "react";
import { Close as CloseIcon } from "@mui/icons-material";
import { motion } from "framer-motion";

const ProfileModal = ({ open, handleClose, user }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    bio: "",
    avatar: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        bio: user.bio || "",
        avatar: user.avatar || "",
      });
    }
  }, [user, open]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      console.log("Dữ liệu mới:", formData);
      setLoading(false);
      handleClose();
    }, 1500); // Giả lập thời gian lưu dữ liệu
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Box
          className="bg-white p-6 rounded-lg shadow-lg w-[400px] mx-auto mt-20 relative"
        >
          {/* Close Button */}
          <IconButton
            className="absolute top-2 right-2"
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>

          <h2 className="text-xl font-bold mb-4 text-center">Chỉnh sửa hồ sơ</h2>
          <TextField
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            fullWidth
            className="mb-4"
          />
          <TextField
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            fullWidth
            className="mb-4"
          />
          <TextField
            label="Bio"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            fullWidth
            multiline
            rows={3}
            className="mb-4"
          />

          <Button
            onClick={handleSave}
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
            className="mt-3"
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Lưu thay đổi"}
          </Button>
        </Box>
      </motion.div>
    </Modal>
  );
};

export default ProfileModal;

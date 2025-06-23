import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, Snackbar, Alert } from '@mui/material';
import { useDispatch } from 'react-redux';
import { resetPasswordAction } from '../../Redux/Auth/auth.action';

const ResetPassword = () => {
  const { token } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(resetPasswordAction(token, password, (message, success) => {
      setSnackbar({ open: true, message, severity: success ? 'success' : 'error' });
      if (success) {
        setTimeout(() => navigate('/login'), 2000);
      }
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
      <h2 className="text-xl font-semibold">Reset Your Password</h2>
      <TextField
        label="New Password"
        fullWidth
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <Button type="submit" variant="contained" fullWidth>
        Reset Password
      </Button>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>
    </form>
  );
};

export default ResetPassword;

import React, { useState } from 'react';
import { TextField, Button, Snackbar, Alert } from '@mui/material';
import { useDispatch } from 'react-redux';
import { forgotPasswordAction } from '../../Redux/Auth/auth.action';

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(forgotPasswordAction(email, (message, success) => {
      setSnackbar({ open: true, message, severity: success ? 'success' : 'error' });
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
      <h2 className="text-xl font-semibold">Forgot Password</h2>
      <TextField
        label="Email"
        fullWidth
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        sx={{ marginBottom: 2}}
      />
      <Button 
      type="submit"
       sx={{
        backgroundColor: 'fff',
        border: '3px solid #000',
        color: '#000',
        '&:hover': {
          backgroundColor: '#222',
          color: '#fff',
        },
      }} 
       fullWidth>
        Send Reset Link
      </Button>
      <div className="flex gap-2 items-center justify-center pt-6 text-sm">
        <p>You want to back Login?</p>
        <button
          onClick={() => navigate('/login')}
          className="text-blue-700 font-semibold hover:underline cursor-pointer"
        >
          Login here
        </button>
      </div>

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

export default ForgotPassword;

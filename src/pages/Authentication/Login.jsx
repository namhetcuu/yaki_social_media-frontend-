import React, { useState } from 'react';
import { Button, TextField, IconButton, InputAdornment, Snackbar, Alert } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { loginUserAction } from '../../Redux/Auth/auth.action';
import { useNavigate } from 'react-router-dom';

const initialValues = { username: '', password: '' };

const validationSchema = Yup.object({
  username: Yup.string().min(3, "Username must be at least 3 characters").required('Username is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  // 👇 Snackbar state
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const handleCloseSnackbar = (event,reason) => {
    if(reason === "clickaway"){
      return;
    }
    setOpenSnackbar(false);
  }

  const handleSubmit = (values) => {
    dispatch(loginUserAction(values, navigate, () => {
      setOpenSnackbar(true); // 👈 Mở snackbar khi login thành công
    }));
  };

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, handleChange, values }) => (
          <Form className="flex flex-col space-y-4 w-full max-w-md mx-auto">
            <Field
              as={TextField}
              name="username"
              label="Username"
              fullWidth
              variant="outlined"
              value={values.username}
              onChange={handleChange}
              error={touched.username && Boolean(errors.username)}
              helperText={touched.username && errors.username}
            />

            <Field
              as={TextField}
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              fullWidth
              variant="outlined"
              value={values.password}
              onChange={handleChange}
              error={touched.password && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={toggleShowPassword} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              className="bg-blue-500 hover:bg-blue-600 text-white"
              sx={{ padding: '.8rem 0rem' }}
            >
              Login
            </Button>
          </Form>
        )}
      </Formik>

      {/* Snackbar success */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarMessage.includes('success') ? 'success' : 'error'}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>


      <div className="flex gap-2 items-center justify-center pt-5 text-sm">
        <p>Don't have an account?</p>
        <button
          onClick={() => navigate('/register')}
          className="text-blue-500 hover:underline"
        >
          Register here
        </button>
      </div>
    </>
  );
};

export default Login;

import React, { useState } from 'react';
import {
  Button,
  TextField,
  IconButton,
  InputAdornment,
  Snackbar,
  Alert,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { loginUserAction } from '../../Redux/Auth/auth.action';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import { useOutletContext } from 'react-router-dom';

const initialValues = { username: '', password: '' };

const validationSchema = Yup.object({
  username: Yup.string().min(3, "Username must be at least 3 characters").required('Username is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  // const [openSnackbar, setOpenSnackbar] = useState(false);
  // const [snackbarMessage, setSnackbarMessage] = useState('');
  const [loginAttemps, setLoginAttempts] = useState(0);
  const { setSnackbarMessage, setOpenSnackbar } = useOutletContext();


  const handleSubmit = (values) => {
    dispatch(loginUserAction(values, navigate, 
      () => {
      setSnackbarMessage("Login success!");
      setOpenSnackbar(true);
      setLoginAttempts(0); // Reset login attempts on successful login
    },
    () => {
      const newAttempts = loginAttemps + 1;
      setLoginAttempts(newAttempts);

      if(newAttempts >= 3) {
        navigate('/forgot-password');
      } else {
        setSnackbarMessage(`Login failed! Attempt ${newAttempts} of 3`);
        setOpenSnackbar(true);
      }
    }
  ));
  };

  const toggleShowPassword = () => setShowPassword(prev => !prev);

  return (
    <>
      
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {({ errors, touched, handleChange, values }) => (
          <Form className="flex flex-col space-y-6 ">
            <Field
              as={TextField}
              name="username"
              label="Username"
              fullWidth
              
              value={values.username}
              onChange={handleChange}
              error={touched.username && Boolean(errors.username)}
              helperText={touched.username && errors.username}
              className="bg-white border-2 border-e-blue-500"
              sx={{ marginBottom: 2}}
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
              className="bg-white rounded-none border-[3px] border-black"
              sx={{ marginBottom: 2 }}
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
              fullWidth
              sx={{
                backgroundColor: 'fff',
                border: '3px solid #000',
                color: '#000',
                '&:hover': {
                  backgroundColor: '#222',
                  color: '#fff',
                },
              }}
            >
              Login
            </Button>

            <div
              className="text-right text-sm text-blue-700 hover:underline cursor-pointer"
              onClick={() => navigate('/forgot-password')}
            >
              Forgot Password?
            </div>
          </Form>
        )}
      </Formik>

      <div className="flex gap-2 items-center justify-center pt-6 text-sm">
        <p>Don't have an account?</p>
        <button
          onClick={() => navigate('/register')}
          className="text-blue-700 font-semibold hover:underline"
        >
          Register here
        </button>
      </div>

      {/* <Snackbar
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
      </Snackbar> */}
    </>
  );
};

export default Login;

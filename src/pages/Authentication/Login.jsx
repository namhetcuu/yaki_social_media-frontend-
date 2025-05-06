import React, { useState } from 'react';
import { Button, TextField, IconButton, InputAdornment } from '@mui/material';
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

  const handleSubmit = (values) => {
    dispatch(loginUserAction(values, navigate));
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

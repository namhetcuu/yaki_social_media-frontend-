import { Card, Grid } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Header from '../../components/Header/Header';
import loginImage from '../../assets/loginArt-Ccm_ZjVq.png'; 
import { Snackbar, Alert } from '@mui/material';
import { useState } from 'react';

const Authentication = () => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') return;
    setOpenSnackbar(false);
  }
  return (
    <>
      <Grid container className="h-screen bg-amber-50">
        <Header />
        <Grid
          item
          xs={12}
          md={7}
          className="hidden md:block h-screen overflow-hidden"
        >
          <img
            className="h-2xl w-3xl object-cover"
            src={loginImage}
            alt="Social media background"
          />
        </Grid>

        <Grid item xs={12} md={5}>
          <div className="px-6 md:px-20 flex flex-col justify-center h-full" style={{ padding: 0 }}>
            
            <Card className="p-6 md:p-5 bg-white w-full md:w-[90%] mx-auto mt-10 md:mt-0 border-black shadow-[4px_4px_0px_#000] rounded-md">
              <div className="flex flex-col items-center mb-5 space-y-1">
                <h1 className="text-2xl md:text-3xl text-gray-700 font-bold">Connect with Yaki</h1>
                <p className="text-center text-sm text-gray-500">
                  Yaki Social helps you connect and share with the people in your life
                </p>
              </div>
              {/* Truyền context xuống Outlet */}
              <Outlet context={{ setSnackbarMessage, setOpenSnackbar }} />
            </Card>
          </div>
        </Grid>
      </Grid>
      {/* Snackbar dùng chung */}
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
      </>
  );
};

export default Authentication;

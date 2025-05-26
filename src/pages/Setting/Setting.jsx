import React from 'react';
import { Avatar, Button, Divider, TextField, Typography, Card } from '@mui/material';
import { useSelector } from 'react-redux';

const Setting = () => {
  const auth = useSelector(state => state.auth);
  const user = auth.user || {
    firstName: 'Guest',
    lastName: 'User',
    email: 'guest@example.com',
    profilePicture: 'https://via.placeholder.com/150'
  };

  const handleSave = () => {
    alert('Settings saved successfully!');
  };

  return (
    <div className="flex justify-center items-start min-h-screen bg-gray-100 py-10 px-4">
      <Card className="w-full max-w-3xl p-8 rounded-2xl shadow-md">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Typography variant="h5" className="font-semibold">
            Account Settings
          </Typography>
          <Button variant="contained" color="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </div>

        <Divider className="mb-6" />

        {/* Profile Info */}
        <div className="flex items-center space-x-5 mb-8">
          <Avatar
            src={user.profilePicture}
            alt="Profile Picture"
            sx={{ width: 80, height: 80 }}
          />
          <div>
            <Typography variant="h6" className="font-bold">
              {user.firstName} {user.lastName}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              @{user.firstName.toLowerCase()}_{user.lastName.toLowerCase()}
            </Typography>
          </div>
        </div>

        {/* Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TextField
            label="First Name"
            fullWidth
            defaultValue={user.firstName}
            variant="outlined"
          />
          <TextField
            label="Last Name"
            fullWidth
            defaultValue={user.lastName}
            variant="outlined"
          />
          <TextField
            label="Email"
            type="email"
            fullWidth
            defaultValue={user.email}
            variant="outlined"
          />
          <TextField
            label=""
            fullWidth
            defaultValue={user.location || ''}
            variant="outlined"
            type='tel'
          />
        </div>

        {/* Password Section */}
        <Divider className="my-8" />
        <Typography variant="h6" className="font-semibold mb-4">
          Security
        </Typography>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TextField
            label="New Password"
            type="password"
            fullWidth
            variant="outlined"
          />
          <TextField
            label="Confirm Password"
            type="password"
            fullWidth
            variant="outlined"
          />
        </div>

        {/* Save Button Bottom (Mobile Friendly) */}
        <div className="mt-10 flex justify-end md:hidden">
          <Button variant="contained" color="primary" onClick={handleSave} fullWidth>
            Save Changes
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Setting;

import React from 'react';
import { useSelector } from 'react-redux';

const Setting = () => {
  const auth = useSelector(state => state.auth);
  const user = auth.user || {
    firstName: 'Guest',
    lastName: 'User',
    email: 'guest@example.com',
    profilePicture: 'https://via.placeholder.com/150',
    location: 'Unknown'
  };

  const handleSave = () => {
    alert('Settings saved successfully!');
  };

  return (
    <div className="min-h-screen bg-[#f3f3f3] p-6 flex justify-center items-start">
      <div className="w-full max-w-3xl bg-white border-2 border-black shadow-[6px_6px_0_0_black] p-8">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-black">Account Settings</h1>
          <button
            onClick={handleSave}
            className="bg-yellow-400 text-black px-5 py-2 border-2 border-black shadow-[2px_2px_0_0_black] cursor-pointer hover:shadow-none hover:bg-yellow-300 active:shadow-none active:translate-x-0.5 active:translate-y-0.5"
          >
            Save Changes
          </button>
        </div>

        <hr className="border-black mb-6" />

        {/* Profile Info */}
        <div className="flex items-center space-x-5 mb-8">
          <img
            src={user.profilePicture}
            alt="Profile"
            className="w-20 h-20 object-cover border-2 border-black shadow-[2px_2px_0_0_black]"
          />
          <div>
            <h2 className="text-xl font-bold text-black">{user.firstName} {user.lastName}</h2>
            <p className="text-sm text-gray-600">@{user.firstName.toLowerCase()}_{user.lastName.toLowerCase()}</p>
          </div>
        </div>

        {/* Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-bold text-sm mb-1">First Name</label>
            <input
              defaultValue={user.firstName}
              className="w-full p-2 border-2 border-black bg-white text-black font-medium shadow-[2px_2px_0_0_black] focus:outline-none"
            />
          </div>
          <div>
            <label className="block font-bold text-sm mb-1">Last Name</label>
            <input
              defaultValue={user.lastName}
              className="w-full p-2 border-2 border-black bg-white text-black font-medium shadow-[2px_2px_0_0_black] focus:outline-none"
            />
          </div>
          <div>
            <label className="block font-bold text-sm mb-1">Email</label>
            <input
              type="email"
              defaultValue={user.email}
              className="w-full p-2 border-2 border-black bg-white text-black font-medium shadow-[2px_2px_0_0_black] focus:outline-none"
            />
          </div>
          <div>
            <label className="block font-bold text-sm mb-1">Location</label>
            <input
              defaultValue={user.location}
              className="w-full p-2 border-2 border-black bg-white text-black font-medium shadow-[2px_2px_0_0_black] focus:outline-none"
            />
          </div>
        </div>

        {/* Password Section */}
        <hr className="border-black my-8" />
        <h2 className="text-xl font-bold text-black mb-4">Security</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-bold text-sm mb-1">New Password</label>
            <input
              type="password"
              className="w-full p-2 border-2 border-black bg-white text-black font-medium shadow-[2px_2px_0_0_black] focus:outline-none"
            />
          </div>
          <div>
            <label className="block font-bold text-sm mb-1">Confirm Password</label>
            <input
              type="password"
              className="w-full p-2 border-2 border-black bg-white text-black font-medium shadow-[2px_2px_0_0_black] focus:outline-none"
            />
          </div>
        </div>

        {/* Mobile Save Button */}
        <div className="mt-10 md:hidden">
          <button
            onClick={handleSave}
            className="w-full bg-yellow-400 text-black px-4 py-2 border-2 border-black shadow-[2px_2px_0_0_black] hover:shadow-none hover:bg-yellow-300 active:shadow-none active:translate-x-0.5  active:translate-y-0.5"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Setting;

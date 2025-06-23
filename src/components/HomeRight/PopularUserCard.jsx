import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { followUser, getUserWithFollowStatus, unfollowUser } from '../../Redux/Users/user.action';

const PopularUserCard = ({ user }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.auth.user);
  const followed = user.followed;

  const handleFollowToggle = () => {
    if (!currentUser?.id || !user?.id) return;
    followed
      ? dispatch(unfollowUser(currentUser.id, user.id))
      : dispatch(followUser(currentUser.id, user.id));

    setTimeout(() => dispatch(getUserWithFollowStatus(currentUser.id)), 300);
  };

  return (
    <div className="flex items-center justify-between w-full min-w-[300px] px-4 py-3 border-2 border-black hover:bg-gray-100 transition-all duration-150">
      
      {/* Left - Avatar + Info */}
      <div className="flex items-center space-x-3 overflow-hidden">
        <img
          src={user?.avatar || `https://via.placeholder.com/56`}
          alt="avatar"
          className="w-14 h-14 rounded-full border-2 border-black object-cover bg-red-500 flex-shrink-0"
        />
        <div className="overflow-hidden">
          <p className="font-bold text-sm sm:text-base truncate">
            {user?.username || 'Anonymous'}
          </p>
          <p className="text-gray-500 text-xs sm:text-sm truncate mt-1">
            @{(user?.username || 'user').toLowerCase().replace(/\s+/g, '')}
          </p>
        </div>
      </div>

      {/* Right - Follow Button */}
      <div className="ml-auto">
        <button
          onClick={handleFollowToggle}
          className={`text-xs cursor-pointer sm:text-sm font-bold px-4 py-1.5 border-2 transition-all duration-200
            ${followed
              ? 'bg-white text-black border-black hover:bg-gray-200 shadow-[4px_4px_0px_#000] rounded-md hover:shadow-none'
              : 'bg-blue-600 text-white border-black hover:bg-blue-700 shadow-[4px_4px_0px_#000] rounded-md hover:shadow-none'}
          `}
        >
          {followed ? 'Following' : 'Follow'}
        </button>
      </div>
    </div>
  );
};

export default PopularUserCard;

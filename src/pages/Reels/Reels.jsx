import { useState, useRef, useEffect } from 'react';
import { IconButton, Avatar, CircularProgress } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import SendIcon from '@mui/icons-material/Send';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import { useSelector, useDispatch } from 'react-redux';
import { getReelsAction } from '../../Redux/Users/user.action';

const Reels = () => {
  const dispatch = useDispatch();
  const { reels, loading, error } = useSelector((store) => store.users || {});
  const { user } = useSelector((store) => store.auth || {});
  const userId = user?.id;

  const [localReels, setLocalReels] = useState([]);
  const [currentReelIndex, setCurrentReelIndex] = useState(0);
  const videoRef = useRef(null);

  useEffect(() => {
    if (userId) {
      dispatch(getReelsAction(userId));
    }
  }, [dispatch, userId]);

  useEffect(() => {
    if (reels && reels.length > 0 && user) {
      const mappedReels = reels.map((story) => ({
        id: story.id,
        videoUrl: story.video,
        title: story.title,
        username: user.username || 'Unknown',
        avatar: user.avatar || 'https://example.com/default-avatar.jpg',
        likes: 0,
        comments: 0,
        isLiked: false,
        isMuted: true,
      }));
      setLocalReels(mappedReels);
    }
  }, [reels, user]);

  const handleLike = (id) => {
    setLocalReels((prev) =>
      prev.map((reel) =>
        reel.id === id
          ? {
              ...reel,
              likes: reel.isLiked ? reel.likes - 1 : reel.likes + 1,
              isLiked: !reel.isLiked,
            }
          : reel
      )
    );
  };

  const toggleMute = (id) => {
    setLocalReels((prev) =>
      prev.map((reel) =>
        reel.id === id ? { ...reel, isMuted: !reel.isMuted } : reel
      )
    );
  };

  const handleScroll = (e) => {
    if (e.deltaY > 0 && currentReelIndex < localReels.length - 1) {
      setCurrentReelIndex((prev) => prev + 1);
    } else if (e.deltaY < 0 && currentReelIndex > 0) {
      setCurrentReelIndex((prev) => prev - 1);
    }
  };

  useEffect(() => {
    if (videoRef.current && localReels.length > 0) {
      videoRef.current.load();
      videoRef.current
        .play()
        .catch((err) => console.warn('Autoplay blocked:', err));
    }
  }, [currentReelIndex, localReels]);

  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-black text-white">
        <CircularProgress color="inherit" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-black text-white">
        <p>Error: {error}</p>
      </div>
    );
  }

  if (!userId) {
    return (
      <div className="flex items-center justify-center h-screen bg-black text-white">
        <p>Please log in to view reels</p>
      </div>
    );
  }

  return (
    <div className="relative h-screen w-full bg-black overflow-hidden" onWheel={handleScroll}>
      {localReels.length > 0 ? (
        <div className="relative h-full w-full">
          <video
            ref={videoRef}
            src={localReels[currentReelIndex].videoUrl}
            className="h-full w-full object-cover"
            loop
            muted={localReels[currentReelIndex].isMuted}
            onClick={() =>
              videoRef.current.paused ? videoRef.current.play() : videoRef.current.pause()
            }
          />

          <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
            <div className="flex items-center mb-4">
              <Avatar
                src={localReels[currentReelIndex].avatar}
                className="w-10 h-10 mr-3 border-2 border-white"
              />
              <span className="font-semibold">{localReels[currentReelIndex].username}</span>
            </div>
            <p className="text-sm mb-4">{localReels[currentReelIndex].title}</p>
          </div>

          <div className="absolute right-4 bottom-20 flex flex-col items-center space-y-5">
            <div className="flex flex-col items-center">
              <IconButton onClick={() => handleLike(localReels[currentReelIndex].id)}>
                {localReels[currentReelIndex].isLiked ? (
                  <FavoriteIcon style={{ color: 'red', fontSize: '2rem' }} />
                ) : (
                  <FavoriteBorderIcon style={{ color: 'white', fontSize: '2rem' }} />
                )}
              </IconButton>
              <span className="text-white text-sm">
                {formatNumber(localReels[currentReelIndex].likes)}
              </span>
            </div>

            <div className="flex flex-col items-center">
              <IconButton>
                <ChatBubbleOutlineIcon style={{ color: 'white', fontSize: '2rem' }} />
              </IconButton>
              <span className="text-white text-sm">
                {formatNumber(localReels[currentReelIndex].comments)}
              </span>
            </div>

            <IconButton>
              <SendIcon style={{ color: 'white', fontSize: '2rem' }} />
            </IconButton>

            <IconButton onClick={() => toggleMute(localReels[currentReelIndex].id)}>
              {localReels[currentReelIndex].isMuted ? (
                <VolumeOffIcon style={{ color: 'white', fontSize: '2rem' }} />
              ) : (
                <VolumeUpIcon style={{ color: 'white', fontSize: '2rem' }} />
              )}
            </IconButton>

            <IconButton>
              <MoreHorizIcon style={{ color: 'white', fontSize: '2rem' }} />
            </IconButton>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-full text-white">
          <p>Không có reels nào để hiển thị</p>
        </div>
      )}
    </div>
  );
};

export default Reels;

import { Avatar } from '@mui/material';

const StoryCircle = ({ imageUrl }) => {
  return (
    <div className='flex flex-col items-center mr-4 cursor-pointer'>
      <Avatar 
        sx={{ width: "3rem", height: "3rem" }} 
        style={{ backgroundColor: "#0866ff" }} 
        src={imageUrl} // ✅ Truyền đúng props vào `src`
      />
      <p>Yakinasu</p>
    </div>
  );
};

export default StoryCircle;

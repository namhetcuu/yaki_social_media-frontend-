import { Avatar } from '@mui/material'

const StoryCircle = () => {
  return (
    <div>
      <div className='flex flex-col items-center mr-4 cursor-pointer'>
        <Avatar sx={{width:"3rem", height: "3rem"}} style={{backgroundColor: "#0866ff"}}
        src='https://images.pexels.com/photos/31053761/pexels-photo-31053761/free-photo-of-b-n-be.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load'>



        </Avatar>
        <p>Yakinasu</p>
      </div>
    </div>
  )
}

export default StoryCircle
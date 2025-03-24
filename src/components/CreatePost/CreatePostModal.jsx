import { Avatar, Backdrop, Box, Button, CircularProgress, IconButton, Modal, Typography } from '@mui/material'
import { useFormik } from 'formik';
import React, { use, useState } from 'react'
import ImageIcon from '@mui/icons-material/Image';
import VideocamIcon from '@mui/icons-material/Videocam';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    bordeRadius: ".6rem",
    outline: "none"
  };

const CreatePostModal = ({handleClose,open}) => {

    const formilk = useFormik();
    const [selectedImage, setSelectedImage] = useState();
    const [selectedVideo, setSelectedVideo] = useState();
    const [isLoading, setIsLoading] = useState(false);

    const handleSelectImage = () => {
        setSelectedImage(URL.createObjectURL(event.target.files[0]));
        console.log('selectedImage',selectedImage);
    }
    const handleSelectVideo = ()=>{
        setSelectedVideo(URL.createObjectURL(event.target.files[0]));
        console.log('selectedVideo',selectedVideo);
    }
    const setIsLoading = () => {}
    const formilk = useFormik({
        initialValues: {
            caption: '',
            image: '',
            video: ''
        },
        onSubmit: (values) => {
            console.log('formilk',values);
        }
    })

  return (
    <div >
        <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <form action="" onSubmit={formilk.handleSubmit}>
                        <div>
                            <div className='flex space-x-4 items-center'>
                                <Avatar />
                                <div className=''>
                                    <p className='font-bold text-lg'>Nam nam</p>
                                    <p className='text-sm'>@Yakinasu</p>
                                </div>
                            </div>
                            <textarea name="caption"
                             cols={30} 
                            rows={4} 
                            onChange={formilk.handleChange}
                            placeholder='Write caption...'
                             value={formilk.values.caption} id="">

                            </textarea>

                            <div className='flex space-x-5 items-center mt-5'>
                                <div>
                                    <input
                                     type="file"
                                     accept='image/*'
                                      onChange={handleSelectImage}
                                       style={{display:"none"}} id='image-input'/>
                                       <label htmlFor="image-input">
                                            <IconButton color='primary'>
                                                <ImageIcon/>
                                            </IconButton>
                                       </label>
                                       <span>Image</span>
                                </div>
                                <div>
                                    <input
                                     type="file"
                                     accept='video/*'
                                      onChange={handleSelectVideo}
                                       style={{display:"none"}} id='video-input'/>
                                       <label htmlFor="video-input">
                                            <IconButton color='primary'>
                                                <VideocamIcon/>
                                            </IconButton>
                                       </label>
                                       <span>Video</span>
                                </div>
                            </div>
                            <div>
                                {selectedImage &&
                                <img src="{selectedImage}" alt="" className='h-[10rem]' />
                                }
                            </div>
                            <div className='flex w-full justify-end'>
                                <Button sx={{borderRadius: '1.5rem'}} type="submit"
                                 variant='contained' color='primary' 
                                 >
                                    Post 
                                </Button>
                            </div>
                        </div>
                    </form>
                    <Backdrop
                        sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
                        open={isLoading}
                        onClick={handleClose}
                    >
                        <CircularProgress color="inherit" />
                    </Backdrop>
                </Box>
            </Modal>
    </div>
  )
}

export default CreatePostModal
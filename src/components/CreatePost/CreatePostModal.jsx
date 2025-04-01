import { Avatar, Backdrop, Box, Button, CircularProgress, IconButton, Modal, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { useFormik } from 'formik';
import  { useState } from 'react';
import ImageIcon from '@mui/icons-material/Image';
import VideocamIcon from '@mui/icons-material/Videocam';
import CloseIcon from '@mui/icons-material/Close';
import { uploadToCloudinary } from '../../Utils/uploadToCloudiary';
import { useDispatch, useSelector } from 'react-redux';
import { createPostAction } from '../../Redux/Post/post.action';

const modalVariants = {
    hidden: { opacity: 0, y: '-10%' },
    visible: { opacity: 1, y: '0%', transition: { duration: 0.3, ease: 'easeOut' } },
    exit: { opacity: 0, y: '-10%', transition: { duration: 0.2, ease: 'easeIn' } }
};

const CreatePostModal = ({ handleClose, open }) => {
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const userId = useSelector(state => state.auth.user?.id);
    console.log("Redux userId:", userId);

    const formik = useFormik({
        initialValues: { caption: '', image: '', video: '' },
        validate: (values) => values.caption.trim() ? {} : { caption: "Caption không được để trống" },
        onSubmit: async (values, { resetForm }) => {
            if (!userId) {
                alert("Lỗi: Không tìm thấy userId!");
                return;
            }
            setIsLoading(true);
            try {
                //const payload = { userId, ...values };  // Gộp userId vào object gửi đi
                //console.log("Dữ liệu gửi đi:", payload);
                console.log("Dữ liệu gửi đi:", values);  // 🛠 Kiểm tra dữ liệu trước khi gửi
                await dispatch(createPostAction( userId, values )); 
                resetForm();
                handleClose();
            } catch (error) {
                console.error("Lỗi khi tạo bài viết:", error);
            }
            setIsLoading(false);
            
        }
    });

    const handleFileUpload = async (event, type) => {
        const file = event.target.files[0];
        if (!file) return;
        setIsLoading(true);
        try {
            const fileUrl = await uploadToCloudinary(file, type);
            if (fileUrl) {
                await formik.setFieldValue(type, fileUrl); // ✅ Đảm bảo cập nhật ngay lập tức
                console.log(`Updated values after setFieldValue (${type}):`, formik.values);
            }
        } catch (error) {
            console.error(`Lỗi khi upload ${type}:`, error);
        }
        setIsLoading(false);
    };
    

    return (
        <Modal open={open} onClose={handleClose} closeAfterTransition>
            <Backdrop open={open} sx={{ color: '#000', zIndex: 1300 }}>
                <motion.div variants={modalVariants} initial="hidden" animate="visible" exit="exit">
                    <Box sx={{
                        width: 450,
                        bgcolor: 'background.paper',
                        p: 4,
                        borderRadius: 3,
                        boxShadow: 5,
                        outline: 'none',
                        margin: 'auto',
                        position: 'relative'
                    }}>
                        <IconButton onClick={handleClose} sx={{ position: 'absolute', top: 10, right: 10 }}>
                            <CloseIcon />
                        </IconButton>
                        <form onSubmit={formik.handleSubmit}>
                            <div className='flex space-x-4 items-center'>
                                <Avatar />
                                <div>
                                    <Typography variant='h6'>Nam Nam</Typography>
                                    <Typography variant='body2' color='textSecondary'>@Yakinasu</Typography>
                                </div>
                            </div>
                            <textarea
                                name='caption'
                                className='w-full mt-5 p-2 bg-gray-100 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                                rows={4}
                                placeholder='Write caption...'
                                onChange={formik.handleChange}
                                value={formik.values.caption}
                            />
                            {formik.errors.caption && <Typography color='error'>{formik.errors.caption}</Typography>}

                            <div className='flex space-x-5 items-center mt-5'>
                                <label>
                                    <input type='file' accept='image/*' hidden onChange={(e) => handleFileUpload(e, 'image')} />
                                    <IconButton component='span' color='primary'> <ImageIcon /> </IconButton>
                                    <Typography variant='caption'>Ảnh</Typography>
                                </label>
                                <label>
                                    <input type='file' accept='video/*' hidden onChange={(e) => handleFileUpload(e, 'video')} />
                                    <IconButton component='span' color='secondary'> <VideocamIcon /> </IconButton>
                                    <Typography variant='caption'>Video</Typography>
                                </label>
                            </div>

                            <div className='mt-3'>
                                {formik.values.image && <img src={formik.values.image} alt='Uploaded' className='h-[10rem] rounded-md' />}
                                {formik.values.video && <video src={formik.values.video} controls className='h-[10rem] rounded-md' />}
                            </div>

                            <div className='flex w-full justify-end mt-4'>
                                <Button type='submit' variant='contained' color='primary' disabled={isLoading}>
                                    {isLoading ? <CircularProgress size={24} color='inherit' /> : 'Post'}
                                </Button>
                            </div>
                        </form>
                    </Box>
                </motion.div>
            </Backdrop>
        </Modal>
    );
};

export default CreatePostModal;

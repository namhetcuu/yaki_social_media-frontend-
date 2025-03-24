import { Card, Grid } from '@mui/material'

import { Outlet } from 'react-router-dom';
const Authentication = () => {
  return (
    <div>
        <Grid container>
            <Grid className='h-screen overflow-hidden' item xs={7}>
                <img className='h-full w-full'
                 src="https://thehornetonline.com/wp-content/uploads/2024/03/e27c3-top-5-reasons-why-you-need-a-social-media-manager-616015983b3ba-sej.png" alt="" />
            </Grid>
            <Grid item xs={5}>
                <div className='px-20 flex flex-col justify-center h-full'>

                    <Card className='card p-8'>
                        
                        <div className='flex flex-col items-center mb-5 space-y-1'>

                            <h1 className='log text-3xl text-gray-700 font-bold'>Connect with Yaki</h1>
                            <p className='text-center text-sm w-[70&]'>Yaki Social help you connect and share with the people in your life</p>

                        </div>

                        {/* Đây là nơi sẽ render Login hoặc Register */}
                        <Outlet />
                        

                        {/* <Login/> */}
                        {/* <Register/> */}

                    </Card>

                </div>
                
            </Grid>
        </Grid>
    </div>
  )
}

export default Authentication
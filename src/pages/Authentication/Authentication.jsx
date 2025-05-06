import { Card, Grid } from '@mui/material'

import { Outlet } from 'react-router-dom';
const Authentication = () => {
  return (
    <div>
        <Grid container className="h-screen">
          <Grid
            item
            xs={12}
            md={7}
            className="hidden md:block h-screen overflow-hidden"
          >
            <img
              className="h-full w-full object-cover"
              src="https://thehornetonline.com/wp-content/uploads/2024/03/e27c3-top-5-reasons-why-you-need-a-social-media-manager-616015983b3ba-sej.png"
              alt=""
            />
          </Grid>

            <Grid item xs={12} md={5}>
              <div className="px-6 md:px-20 flex flex-col justify-center h-full" style={{padding:'0'}}>
                <Card className="p-6 md:p-5 rounded-lg shadow-md bg-white w-full md:w-[90%] mx-auto mt-10 md:mt-0 h-100px">
                  <div className="flex flex-col items-center mb-5 space-y-1">
                    <h1 className="text-2xl md:text-3xl text-gray-700 font-bold">Connect with Yaki</h1>
                    <p className="text-center text-sm text-gray-500">Yaki Social helps you connect and share with the people in your life</p>
                  </div>

                  <Outlet />
                </Card>
              </div>
            </Grid>
        </Grid>

    </div>
  )
}

export default Authentication
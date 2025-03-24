import React from 'react'
import SearchUser from '../SearchUser/SearchUser'
import PopularUserCard from './PopularUserCard'
import { Card } from '@mui/material'

const popularUsers = [1,1,1,1]
const HomeRight = () => {
  return (
    <div className='pr-5'>

      <SearchUser/>

      <Card className='p-5'>

        <div className='flex items-center py-5 justify-between'>

          <p className='font-semibold opacity-70'>Người liên hệ</p>
          <p className='text-xs font-semibold opacity-95'>Xem tất cả</p>
          
        </div>

        <div className='space-y-5'>

          {popularUsers.map((item)=><PopularUserCard/>)}

        </div>
      </Card>


      

    </div>
  )
}

export default HomeRight
import React, { use } from 'react'
import SearchUser from '../SearchUser/SearchUser'
import PopularUserCard from './PopularUserCard'
import { Card } from '@mui/material'
import { useSelector } from 'react-redux'

const popularUsers = [1,1,1,1]
const HomeRight = () => {
  const allUsers = useSelector((state) => state.users.allUsers)
  const currentUser = useSelector((state) => state.auth.user)

  // Chuyển allUsers (object) thành mảng, lọc bỏ user hiện tại
  const usersToShow = allUsers
    ? Object.values(allUsers).filter(user => user.id !== currentUser?.id)
    : [];
  return (
    <div className='pr-5'>

      <SearchUser/>

      <Card className='p-5'>

        <div className='flex items-center py-5 justify-between'>

          <p className='font-semibold opacity-70'>Người liên hệ</p>
          <p className='text-xs font-semibold opacity-95'>Xem tất cả</p>
          
        </div>

        <div className='space-y-5'>

        {usersToShow.length > 0 ? (
            usersToShow.map(user => (
              <PopularUserCard key={user.id} user={user} />
            ))
          ) : (
            <p className="text-gray-500 text-sm">Không có người liên hệ nào.</p>
          )}

        </div>
      </Card>


      

    </div>
  )
}

export default HomeRight
import React, { use, useEffect, useState } from 'react'
import SearchUser from '../SearchUser/SearchUser'
import PopularUserCard from './PopularUserCard'
import { Card } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { getUserWithFollowStatus } from '../../Redux/Users/user.action'


const HomeRight = () => {

  const dispatch = useDispatch()
  const [showAll, setShowAll] = useState(false);
  const [initialUsersToShow, setInitialUsersToShow] = useState(5);

  const userWithFollow = useSelector((state) => state.users.userWithFollow)
  const currentUser = useSelector((state) => state.auth.user)


  useEffect(() => {
    if(currentUser?.id){
      dispatch(getUserWithFollowStatus(currentUser.id))
    }
  },[dispatch,currentUser])

  const toggleShowAll = () => {
    setShowAll(!showAll);
  }

  return (
    <div className='pr-5'>

      <SearchUser/>

      <Card className='p-5'>

        <div className='flex items-center py-5 justify-between'>

          <p className='font-semibold opacity-70'>Contact person</p>
          <p className='text-xs font-semibold opacity-95 cursor-pointer hover:underline' onClick={toggleShowAll}>
            {showAll ? 'Collapse' : 'Show All'}
          </p>
          
        </div>

        <div className={`space-y-5 ${showAll ? 'max-h-[500px] overflow-y-auto pr-2' : ''}`} style={{scrollbarWidth: 'thin'}}>

        {userWithFollow && userWithFollow.length > 0 ? (
          showAll ?
            userWithFollow.map(user => (
              <PopularUserCard key={user.id} user={user} />
            ))
           : userWithFollow.slice(0, initialUsersToShow).map(user => (
            <PopularUserCard key={user.id} user={user} />
           ))
          ): (
            <p className="text-gray-500 text-sm">There is no contact person.</p>
          )}

        </div>
      </Card>


      

    </div>
  )
}

export default HomeRight
import React from 'react'

const ChatMessage = () => {
  return (
    <div className={`flex ${true?"justify-start":"justify-end"} text-white`}>
        <div 
        className={`p-1 ${true?"rounded-md":"px-5 rounded-full"} bg-[#191c29]`}>
            {true && 
            <img className='w-[12rem] h-[17rem] object-cover rounded-md' 
            src='https://images.pexels.com/photos/31346973/pexels-photo-31346973/free-photo-of-c-nh-h-s-ng-mu-v-i-nh-ng-canh-cay-m-c-len.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load'/>}
            <p className={`${true?"py-2":"py-1"}`}>message...</p>
        </div>
    </div>
  )
}

export default ChatMessage
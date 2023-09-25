import React from 'react'
import Header from './Header'
import Feed from './Feed'
import SideImage from './SideImage'
const Forum = () => {
  return (
    <div className="w-full min-w-fit">
      <Header/>
     <div className="flex justify-center py-10 bg-opacity-5 bg-black min-w-min w-full">
    <div className="flex flex-row max-md:flex-col px-2 w-full max-w-screen-xl ">
      <SideImage/>
      <Feed/>
    </div>
   </div>

    </div>
  )
}

export default Forum

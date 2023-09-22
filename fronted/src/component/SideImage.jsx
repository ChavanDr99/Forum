import React from 'react'
import Logo1 from '../assets/Logo.png'


const SideImage = () => {
  return (
    <div className='mt-3 ml-2 '>
      <div className='flex flex-row gap-2  sticky top-20 '>
                <img src={Logo1} alt="logo" className=' animate-bounce h-[280px] w-[320px] mt-20 ml-10 ' />
                
              </div>
    </div>
    
  )
}

export default SideImage

import React, { useRef, useState } from 'react'
import { Outlet } from 'react-router-dom'
import bannerOne from '../../../src/assets/viedo2.webm'

const AuthLayout = () => {
  return (

    <div className='flex min-h-screen w-full'>
      <div className='hidden lg:flex items-center justify-center w-1/2 p-12 relative overflow-hidden'>
        <video  
          className="absolute top-0 left-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src={bannerOne} type="video/webm" />
          Your browser does not support the video tag.
        </video>
        <div className='max-w-md space-y-6 flex items-center justify-center text-center text-primary'>
          <h1 className='text-5xl font-extrabold tracking-tight text-white absolute drop-shadow-lg'>
            Welcome to E-Commerce <br /> Shopping</h1>

        </div>
      </div>
      <div className='flex flex-1 items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8'>
        <Outlet />
      </div>
    </div>

  )
}

export default AuthLayout
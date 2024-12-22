import React, { useState } from 'react'
import AdminSidebar from './adminsidebar'
import AdminHeader from './adminheader'
import { Outlet } from 'react-router-dom'

const AdminLayout = () => {
  const [opensidebar, setopensidebar] = useState(false)
  return (
    <div className='flex min-h-screen w-full'>
        <AdminSidebar open={opensidebar} setOpen={setopensidebar}/>
        <div className='flex flex-1 flex-col'>
         <AdminHeader setOpen={setopensidebar}/>
         <main className='flex-1 flex-col flex bg-muted/40 p-4 md:p-6'>
            <Outlet/>
         </main>
        </div>
    </div>
  )
}

export default AdminLayout
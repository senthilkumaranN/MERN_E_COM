import React from 'react'
import { ChartNoAxesCombined, LayoutDashboard, AlignEndVertical, Ambulance } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { SheetHeader, SheetTitle, Sheet, SheetContent } from '../ui/sheet'


const adminSidebarMenuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: <LayoutDashboard />
  },
  {
    id: "features",
    label: "Products",
    path: "/admin/features",
    icon: <AlignEndVertical />
  },
  {
    id: "orders",
    label: "Orders",
    path: "/admin/orders",
    icon: <Ambulance />
  }

]

function MenuItem({ setOpen }) {
  const navigate = useNavigate()
  return <nav className='mt-8 flex-col flex gap-2'>
    {
      adminSidebarMenuItems.map(MenuItem => <div key={MenuItem.id}
        onClick={() => {
          navigate(MenuItem.path)
          setOpen ? setOpen(false) : null
        }}
        className='flex text-xl cursor-pointer items-center font-semibold gap-2 rounded-md px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground'>
        {MenuItem.icon}
        <span>{MenuItem.label}</span>

      </div>)
    }
  </nav>
}

const AdminSidebar = ({ open, setOpen }) => {
  const navigate = useNavigate()
  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side='left' className='w-64'>
          <div className='flex flex-col h-full'>
            <SheetHeader className="border-b">
              <SheetTitle className='flex gap-2 mt-5 mb-5'>
                <ChartNoAxesCombined size={26} />
                <h3 className='text-xl font-extrabold'>Admin Panel</h3>
              </SheetTitle>
            </SheetHeader>
            <MenuItem setOpen={setOpen} />
          </div>
        </SheetContent>
      </Sheet>

      <aside className='hidden w-64 flex-col border-r bg-background p-6 lg:flex'>
        <div onClick={() => navigate('/admin/dashboard')} className='flex cursor-pointer items-center gap-2'>
          <ChartNoAxesCombined size={26} />
          <h3 className='text-xl font-extrabold'>Admin Panel</h3>
        </div>
        <MenuItem />
      </aside>
    </>
  )
}

export default AdminSidebar
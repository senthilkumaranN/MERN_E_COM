import { LogOut, Menu, School, ShoppingCart, UserCog } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from '../ui/sheet'
import { Button } from '../ui/button'
import { useDispatch, useSelector } from 'react-redux'
import { ShoppingViewHeaderMenuItems } from '@/config'
import { DropdownMenuTrigger, DropdownMenu, DropdownMenuContent } from '../ui/dropdown-menu'
import { AvatarFallback, Avatar } from '../ui/avatar'
import { DropdownMenuLabel, DropdownMenuSeparator } from '../ui/dropdown-menu'
import { LogoutUser, resetTokenAndCredentials } from '@/slice/AuthSlice'
import ShoppingCartWrapper from './cart-wrapper'
import { fetchToCart } from '@/slice/cart/Slice'
import { Label } from '../ui/label'





function MenuItems() {
  const navigate = useNavigate()
  const Location = useLocation()
  const [SearchParams, setSearchParams] = useSearchParams()

  function handleNavigate(getmenuitem) {
    sessionStorage.removeItem("filter")

    const currentfilter = getmenuitem.id !== 'home' && getmenuitem.id !== 'product' && getmenuitem.id !== 'search' ? {
      category: [getmenuitem.id]
    } : null

    sessionStorage.setItem("filter", JSON.stringify(currentfilter))
    Location.pathname.includes('list') && currentfilter !== null ?
      setSearchParams(new URLSearchParams(`?category=${getmenuitem.id}`)) :
      navigate(getmenuitem.path)
  }
  return (
    <nav className='flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row'>
      {
        ShoppingViewHeaderMenuItems.map(menuItems => <Label onClick={() =>
          handleNavigate(menuItems)

        }
          className='text-sm font-medium' key={menuItems.id}>{menuItems.label}</Label>)
      }
    </nav>)
}

function HeaderRightContent() {

  const { user } = useSelector(state => state.auth)
  const [openCartsidebar, setopenCartsidebar] = useState(false)
  const { cartitems } = useSelector(state => state.CartSlice)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  function handleLogout() {
    // dispatch(LogoutUser())
    dispatch(resetTokenAndCredentials())
    sessionStorage.clear()
    navigate('/auth/login')
  }

  useEffect(() => {
    dispatch(fetchToCart(user?.id))
  }, [dispatch])



  return <div className='flex lg:items-center lg:flex-row flex-col gap-4'>

    <Sheet open={openCartsidebar} onOpenChange={() => setopenCartsidebar(false)}>
      <Button onClick={() =>
        setopenCartsidebar(true)
      } variant="outline" size="icon" className="relative">
        <ShoppingCart className='w-6 h-6' />
        <span className='absolute top-[2px] right-[2px] font-bold'>{cartitems?.items?.length || 0}</span>
        <span className='sr-only'>User cart</span>
      </Button>
      <ShoppingCartWrapper setopenCartsidebar={setopenCartsidebar} cartitems={cartitems && cartitems.items && cartitems.items.length > 0 ?
        cartitems.items : null} />
    </Sheet>

    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className='bg-black flex items-center justify-center'>
          <AvatarFallback className='bg-black text-white text-xl font-extrabold'>
            {user?.userName[0].toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent side='right' className='w-56'>
        <DropdownMenuLabel>
          Logged in as {user?.userName}
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuLabel onClick={() => navigate("/shop/account")} className="cursor-pointer">
          <UserCog className='mr-2 h-4 w-4 inline-block' />
          Account
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuLabel className="cursor-pointer" onClick={handleLogout}>
          <LogOut className='mr-2 h-4 w-4 inline-block' />
          LogOut
        </DropdownMenuLabel>
      </DropdownMenuContent>
    </DropdownMenu>

  </div>
}

const ShoppingHeader = () => {


  return (
    <header className='sticky top-0 z-40 w-full border-b bg-background'>
      <div className='flex h-16 items-center justify-between px-4 md:px-6'>
        <Link to="/shop/home" className='flex items-center gap-2'>
          <School className="h-6 w-6" />
          <span className='font-bold text-2xl'>Ecommerce</span>
        </Link>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden">
              <Menu className='h-6 w-6' />
              <span className='sr-only'>Toggle header menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full max-w-xs pr-5">
            <SheetTitle className="text-center font-bold text-xl mb-7 capitalize hover:underline"> Menu content </SheetTitle>
            <MenuItems />
            <HeaderRightContent />
          </SheetContent>
        </Sheet>
        <div className='hidden lg:block'>
          <MenuItems />
        </div>
        <div className='hidden lg:block'>
          <HeaderRightContent />
        </div>
      </div>
    </header>
  )
}

export default ShoppingHeader
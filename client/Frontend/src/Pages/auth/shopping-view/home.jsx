import { Button } from '@/components/ui/button'
import {
  MoveRight, Baby, ChevronLeftIcon, ChevronRightIcon,
  PhilippinePeso, Footprints, Users, UsersRound, Watch, Check, Rabbit,
  Atom,
  Snowflake,
  Heading
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ShoppingProductTile from '@/components/shopping-view/Product-Tile'
import { getFilterProducts, getProductDetails } from '@/slice/shop/ProductSlice'
import { useNavigate } from 'react-router-dom'
import { addToCart, fetchToCart } from '@/slice/cart/Slice'
import ProductDetails from '@/components/shopping-view/Product-Details'
import { useToast } from '@/hooks/use-toast'
import { getFeatureImage } from '@/slice/Feature'


const ShoppingHome = () => {

  const categories = [
    { id: "men", label: "Men", icon: Users },
    { id: "women", label: "Women", icon: UsersRound },
    { id: "Kids", label: "Kids", icon: Baby },
    { id: "accessories", label: "Accessories", icon: Watch },
    { id: "footwear", label: "Footwear", icon: Footprints },
  ]

  const brand = [
    { id: "nike", label: "Nike", icon: Check },
    { id: "adidas", label: "Adidas", icon: Rabbit },
    { id: "puma", label: "Puma", icon: PhilippinePeso },
    { id: "levi", label: "Levi's", icon: Atom },
    { id: "zara", label: "Zara", icon: Snowflake },
    { id: "h&m", label: "H&M", icon: Heading },
  ]

  
  const [slidechange, setslidechange] = useState(0)
  const { user } = useSelector((state) => state.auth)
  const { ProductList, productDetails } = useSelector((state) => state.shopProducts)
  const { featureImageList } = useSelector(state => state.FeatureSlice)
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [openDetailsDialog, setopenDetailsDialog] = useState(false)
  const {toast} = useToast()

  useEffect(() => {
    dispatch(getFilterProducts({ filterParams: {}, sortParams: 'price-lowtohigh' }))
  }, [dispatch])

  function handleNaviagteToListingPage(getitem, section) {
    sessionStorage.removeItem("filter")
    const navlist = {
      [section]: [getitem.id]
    }
    sessionStorage.setItem("filter", JSON.stringify(navlist))
    navigate('/shop/list')
  }

  function handlegetProductId(getProductid) {
    dispatch(getProductDetails(getProductid))
  }

  function handleAddtoCart(getproductid) {
    dispatch(addToCart({
      userId: user?.id,
      productId: getproductid,
      quantity: 1,
    })).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchToCart(user?.id))
        toast({
          title: data.payload.message
        })
      }
    })
  }

  useEffect(() => {
    if (productDetails !== null) {
      setopenDetailsDialog(true)
    }
  }, [productDetails])


  useEffect(() => {
    const timer = setInterval(() => {
      setslidechange((prevslide) => (prevslide + 1) % featureImageList.length)

    }, 5000);

    return () => {
      clearInterval(timer)
    };
  }, [featureImageList])

  useEffect(()=>{
    dispatch(getFeatureImage())
  },[dispatch])
  

  return (
    <div className='flex flex-col min-h-screen'>
      <div className='relative w-full h-[600px] overflow-hidden'>
        {
          featureImageList && featureImageList.length > 0 ?
          featureImageList.map((slide, index) => (
            <img
              src={slide.image}
              key={slide._id}
              className={`${index === slidechange ? 'opacity-100' : 'opacity-0'} absolute top-0 left-0 w-full h-full
                object-center  transition-opacity duration-1000`} />
          )) : null
        }

        <Button variant="outline" size="icon" className='absolute top-1/2 left-4 transform 
           -translate-y-1/2 bg-white/80'
          onClick={() => {
            setslidechange((prevslide) => {
              (prevslide - 1 + featureImageList.length) % featureImageList.length;
            });
          }}
        > <ChevronLeftIcon className='w-4 h-4' />
        </Button>
        <Button variant="outline" size="icon" className='absolute top-1/2 right-4 transform 
           -translate-y-1/2 bg-white/80'  onClick={() => setslidechange((prevslide) => (prevslide + 1) % featureImageList.length)}
        > <ChevronRightIcon className='w-4 h-4' />
        </Button>

        <p className='absolute top-[30%] left-[73px] sm:top-[40%] sm:left-[90px] md:top-[35%]  md:left-[120px] capitalize
         text-2xl font-semibold md:font-normal sm:text-3xl md:text-4xl flex-wrap'>we picked every item <br /> with care,
          <span className='font-extrabold '>you must try</span> <br /> atleast once.</p>
        <div className='flex justify-center'>
          <Button className='absolute top-[50%] left-[73px] sm:top-[63%] sm:left-[90px]
           md:left-[120px]  md:top-[58%] sm:text-sm md:text-lg text-base rounded'>Go to Collection <MoveRight className='mt-1' /></Button>
        </div>
      </div>

      <section className='py-12 bg-gray-50'>
        <div className='container mx-auto px-4'>
          <h2 className='text-3xl font-bold text-center mb-8'>Shop by Category</h2>
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4'>
            {
              categories.map((item) => (<Card onClick={() => handleNaviagteToListingPage(item, "category")} key={item.id}
                className="cursor-pointer hover:shadow-lg transition:shadow">
                <CardContent className='flex flex-col items-center justify-center p-6'>
                  <item.icon className='w-12 h-12 mb-4 text-primary' />
                  <span className='font-bold'>{item.label}</span>
                </CardContent>
              </Card>
              )
              )
            }
          </div>
        </div>
      </section>
      <section className='py-12 bg-gray-50'>
        <div className='container mx-auto px-4'>
          <h2 className='text-3xl font-bold text-center mb-8'>Shop by Brand</h2>
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4'>
            {
              brand.map((item) => (<Card onClick={() => handleNaviagteToListingPage(item, "brand")} key={item.id}
                className="cursor-pointer hover:shadow-lg transition:shadow">
                <CardContent className='flex flex-col items-center justify-center p-6'>
                  <item.icon className='w-12 h-12 mb-4 text-primary' />
                  <span className='font-bold'>{item.label}</span>
                </CardContent>
              </Card>
              )
              )
            }
          </div>
        </div>
      </section>
      <section className='py-12 bg-gray-50'>
        <div className='container mx-auto px-4'>
          <h2 className='text-center font-bold text-3xl mb-8'>Feature Products</h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
            {
              ProductList && ProductList.length > 0 ?
                ProductList.map((productItem) => (<ShoppingProductTile key={productItem._id} product={productItem}
                  handlegetProductId={handlegetProductId} handleAddtoCart={handleAddtoCart} />)) : null
            }
          </div>
        </div>
        <ProductDetails open={openDetailsDialog} setOpen={setopenDetailsDialog} ProductDetails={productDetails}/>
      </section>
    </div>

  )
}

export default ShoppingHome


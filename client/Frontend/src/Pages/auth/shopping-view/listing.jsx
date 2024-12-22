import ProductFilter from '@/components/shopping-view/Filter'
import ProductDetails from '@/components/shopping-view/Product-Details'
import ShoppingProductTile from '@/components/shopping-view/Product-Tile'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioItem } from '@/components/ui/dropdown-menu'
import { DropdownMenuRadioGroup, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { sortOptions } from '@/config'
import { useToast } from '@/hooks/use-toast'
import { addToCart, fetchToCart } from '@/slice/cart/Slice'
import { getFilterProducts, getProductDetails } from '@/slice/shop/ProductSlice'
import { ArrowUpDownIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'

function createSearchParamsHelper(filterParams) {
  const queryParams = []

  for (const [key, value] of Object.entries(filterParams)) {
    if (Array.isArray(value) && value.length > 0) {
      const paramValue = value.join(',')

      queryParams.push(`${key}=${encodeURIComponent(paramValue)}`)
    }
  }
  return queryParams.join('&')
}

const ShoppingListing = () => {

  const dispatch = useDispatch()
  const { ProductList, productDetails } = useSelector((state) => state.shopProducts)
  const { user } = useSelector((state) => state.auth)
  const [filter, setFilter] = useState({})
  const [sort, setSort] = useState(null)
  const [searchparams, setsearchparams] = useSearchParams()
  const [openDetailsDialog, setopenDetailsDialog] = useState(false)
  const { toast } = useToast()

 
  const categorySearchParams = searchparams.get('category')

  function handleSort(value) {
    setSort(value)
  }

  function handlefilter(getsectionid, getcurrentoption) {
    let cpyFilter = { ...filter };
    const indexofcurrentsection = Object.keys(cpyFilter).indexOf(getsectionid)

    if (indexofcurrentsection === -1) {
      cpyFilter = {
        ...cpyFilter,
        [getsectionid]: [getcurrentoption]
      }
    } else {
      const indexofcurrentoption = cpyFilter[getsectionid].indexOf(getcurrentoption)
      if (indexofcurrentoption === -1) cpyFilter[getsectionid].push(getcurrentoption)
      else cpyFilter[getsectionid].splice(indexofcurrentoption, 1)
    }
    setFilter(cpyFilter)
    sessionStorage.setItem("filter", JSON.stringify(cpyFilter))
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
    setSort('price-lowtohigh')
    setFilter(JSON.parse(sessionStorage.getItem("filter")) || {})
  }, [categorySearchParams])

  useEffect(() => {
    if (filter && Object.keys(filter).length > 0) {
      const createQueryString = createSearchParamsHelper(filter)
      setsearchparams(new URLSearchParams(createQueryString))
    }
  }, [filter])

  useEffect(() => {
    if (filter !== null && sort !== null)
      dispatch(getFilterProducts({ filterParams: filter, sortParams: sort }))
  }, [dispatch, filter, sort])

  useEffect(() => {
    if (productDetails !== null) {
      setopenDetailsDialog(true)
    }
  }, [productDetails])






  return (
    <div className='grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 p-4 md:p-6'>
      <ProductFilter filter={filter} handlefilter={handlefilter} />
      <div className='bg-background w-full rounded-lg shadow-sm'>
        <div className='p-4 border-b flex items-center justify-between'>
          <h2 className='text-lg font-extrabold'>All Products</h2>
          <div className='flex items-center gap-2'>
            <span className='text-muted-foreground border p-1.5 rounded-lg'>{ProductList.length} Products</span>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button varient="outline" size="sm" className="flex items-center gap-1 bg-white text-black
              border hover:bg-gray-100">
                  <ArrowUpDownIcon className='h-4 w-4' />
                  <span>Sort by</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                  {
                    sortOptions.map((sortItem) => (
                      <DropdownMenuRadioItem key={sortItem.id} value={sortItem.id}>
                        {sortItem.label}
                      </DropdownMenuRadioItem>
                    ))
                  }
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-2'>
          {
            ProductList && ProductList.length ? (
              ProductList.map((productItem) => (<ShoppingProductTile key={productItem._id} product={productItem}
                handlegetProductId={handlegetProductId} handleAddtoCart={handleAddtoCart} />))

            ) : <div>No Products</div>
          }
        </div>
      </div>
      <ProductDetails open={openDetailsDialog} setOpen={setopenDetailsDialog} ProductDetails={productDetails}
      />
    </div>
  )
}

export default ShoppingListing
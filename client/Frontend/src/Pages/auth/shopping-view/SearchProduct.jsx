import ProductDetails from "@/components/shopping-view/Product-Details";
import ShoppingProductTile from "@/components/shopping-view/Product-Tile";
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast";
import { addToCart, fetchToCart } from "@/slice/cart/Slice";
import { fetchSearchProduct, resetSearchList } from "@/slice/search/Slice";
import { getProductDetails } from "@/slice/shop/ProductSlice";
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";




const SearchProduct = () => {

  const [keyword, setKeyword] = useState("");
  const [searchParams, setsearchParams] = useSearchParams()
  const dispatch = useDispatch()
  const { searchList } = useSelector(state => state.searchProduct)
  const { productDetails } = useSelector((state) => state.shopProducts)
  const [openDetailsDialog, setopenDetailsDialog] = useState(false)
  const { user } = useSelector((state) => state.auth)
  const { toast} = useToast()

  useEffect(() => {
    if (keyword && keyword.trim() !== '' && keyword.trim().length >= 3) {
      setTimeout(() => {
        setsearchParams(new URLSearchParams(`?keyword=${keyword}`))
        dispatch(fetchSearchProduct(keyword))
      }, 1000)
    } else {
      dispatch(resetSearchList())
    }
  }, [keyword])


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


  return (
    <div className="container mx-auto md:px-6 px-4 py-8">
      <div className="flex justify-center mb-8">
        <div className="w-full flex items-center">
          <Input className="py-6"
            placeholder='Search Products...'
            value={keyword}
            name="keyword"
            onChange={(event) => setKeyword(event.target.value)} />
        </div>
      </div>
      {
        !searchList.length ? (
          <h1 className="text-5xl font-extrabold">No result found!</h1>
        ) : null
      }
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {
          searchList.map((searchItem) => (<ShoppingProductTile key={searchItem.id} product={searchItem}
            handlegetProductId={handlegetProductId} handleAddtoCart={handleAddtoCart} />))
        }

      </div>
      <ProductDetails open={openDetailsDialog} setOpen={setopenDetailsDialog} ProductDetails={productDetails}
      />
    </div>
  )
}

export default SearchProduct
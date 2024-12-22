
import { StarIcon } from "lucide-react"
import { Button } from "../ui/button"
import { Dialog, DialogContent } from "../ui/dialog"
import { Separator } from "../ui/separator"
import { useDispatch, useSelector } from "react-redux"
import { useToast } from "@/hooks/use-toast"
import { addToCart, fetchToCart } from "@/slice/cart/Slice"
import { setProductDetails } from "@/slice/shop/ProductSlice"



const ProductDetails = ({ open, setOpen, ProductDetails }) => {

    const dispatch = useDispatch()
    const { user } = useSelector(state => state.auth)
    const { toast } = useToast()

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

    function handleDialogClose() {
        setOpen(false)
        dispatch(setProductDetails())
    }

    return (
        <Dialog open={open} onOpenChange={handleDialogClose}>
            <DialogContent className='grid grid-cols-2 gap-8 sm:p-12 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw]'>
                <div className="relative overflow-hidden rounded-lg">
                    <img
                        src={ProductDetails?.image}
                        alt={ProductDetails?.title}
                        width={600}
                        height={600}
                        className="aspect-square w-full object-cover"
                    />
                </div>
                <div className="">
                    <div>
                        <h1 className="text-3xl font-extrabold">{ProductDetails?.title}</h1>
                        <p className="text-muted-foreground text-2xl mb-5 mt-4">{ProductDetails?.description}</p>
                    </div>

                    <div className='flex justify-between items-center '>
                        <span className={`${ProductDetails?.salePrice > 0 ? "line-through" : ""}
                     text-2xl font-extrabold text-primary `}>${ProductDetails?.price}</span>
                        {
                            ProductDetails?.salePrice > 0 ?
                                <span className='text-xl font-bold text-muted-foreground'>${ProductDetails?.salePrice}</span> : null
                        }
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-0.5">
                            <StarIcon className="w-5 h-5 fill-primary" />
                            <StarIcon className="w-5 h-5 fill-primary" />
                            <StarIcon className="w-5 h-5 fill-primary" />
                            <StarIcon className="w-5 h-5 fill-primary" />
                            <StarIcon className="w-5 h-5 fill-primary" />
                        </div>
                        <span className="text-muted-foreground">(4.5)</span>
                    </div>
                    <div className="mt-5 mb-5">
                        <Button className="w-full" onClick={() => handleAddtoCart(ProductDetails?._id)}>Add to Cart</Button>
                    </div>
                    <Separator />
                    <div className="max-h-[300px] overflow-auto">
                        <h2 className="text-xl font-bold mb-4">Reviews</h2>
                        <div className="grid gap-1">
                            <div className="flex items-center gap-2">
                                <h3 className="font-bold capitalize text-xl">Sen</h3>
                            </div>
                            <div className="flex items-center gap-0.5">
                                <StarIcon className="w-5 h-5 fill-yellow-400 "/>
                                <StarIcon className="w-5 h-5 fill-yellow-400"/>
                                <StarIcon className="w-5 h-5 fill-yellow-400"/>
                                <StarIcon className="w-5 h-5 fill-yellow-400"/>
                                <StarIcon className="w-5 h-5 fill-primary"/>
                            </div>
                            <p className="text-muted-foreground">
                                Nice Good!
                            </p>
                        </div>
                    </div>
                </div>

            </DialogContent>
        </Dialog>
    )
}

export default ProductDetails
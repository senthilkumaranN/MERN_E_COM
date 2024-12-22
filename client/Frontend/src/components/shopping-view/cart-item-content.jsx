import { Minus, Plus, Trash } from "lucide-react"
import { Button } from "../ui/button"
import { useDispatch, useSelector } from "react-redux"
import { deleteToCart, UpdateToCart } from "@/slice/cart/Slice"
import { useToast } from "@/hooks/use-toast"


const ShoopingCartItemContent = ({ cartitems }) => {
    const { user } = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const {toast} = useToast()

    function handleDeleteCart(getcartitems) {
        dispatch(deleteToCart({ userId: user?.id, productId: getcartitems?.productId })
        ).then(data => {
            if(data.payload.success){
               toast({
                   title: 'Cart item is deleted successfully'
               })
            }
       })
        
    }

    function handleUpdateQty(getcartitems, typeofaction) {
        dispatch(UpdateToCart({
            userId: user?.id, productId: getcartitems?.productId, quantity:
                typeofaction === "plus" ? cartitems.quantity + 1 : cartitems.quantity - 1,
        })
        ).then(data => {
             if(data.payload.success){
                toast({
                    title: 'Cart item is updated successfully'
                })
             }
        })
    }

    
return (
    <div className="flex items-center space-x-4 mb-8 ">
        <img
            src={cartitems?.image}
            alt={cartitems?.title}
            className="w-20 h-20 rounded-lg object-cover"
        />
        <div className="flex-1">
            <h3 className="font-extrabold">{cartitems?.title}</h3>
            <div className="flex items-center gap-2 mt-1">
                <Button variant="outline" className="h-8 w-8 rounded-full" size="icon" disabled={cartitems.quantity === 1}
                    onClick={() => handleUpdateQty(cartitems, "minus")}>
                    <Minus className="w-4 h-4"></Minus>
                    <span className="sr-only">Decrease</span>
                </Button>
                <span className="font-extrabold">{cartitems?.quantity}</span>
                <Button variant="outline" className="h-8 w-8 rounded-full" size="icon"
                    onClick={() => handleUpdateQty(cartitems, "plus")}>
                    <Plus className="w-4 h-4" />
                    <span className="sr-only">Decrease</span>
                </Button>
            </div>
        </div>
        <div className="flex flex-col items-end">
            <p className="font-semibold">
                ${(
                    (cartitems.salePrice > 0 ? cartitems.salePrice : cartitems.price) * cartitems.quantity.toFixed(2)
                )}
            </p>
            <Trash onClick={() => handleDeleteCart(cartitems)} className='cursor-pointer mt-1' size={20}></Trash>
        </div>

    </div>
)
}

export default ShoopingCartItemContent
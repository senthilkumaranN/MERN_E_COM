import { useNavigate } from "react-router-dom"
import { Button } from "../ui/button"
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet"
import ShoopingCartItemContent from "./cart-item-content"


const ShoppingCartWrapper = ({ cartitems, setopenCartsidebar }) => {
    const navigate = useNavigate()


    const totalAmount = cartitems && cartitems.length > 0 ?
        cartitems.reduce((sum, currentitem) => sum + (currentitem?.salePrice > 0 ? currentitem.salePrice : currentitem.Price
        ) * currentitem.quantity, 0) : 0
    return (
        <SheetContent className="sm:max-w-md overflow-y-scroll">
            <SheetHeader>
                <SheetTitle>Your Cart</SheetTitle>
            </SheetHeader>
            <div className="mt-8">
                {
                    cartitems && cartitems.length > 0 ?
                        cartitems.map((item) => (<ShoopingCartItemContent cartitems={item} key={item._id} />)) : null
                }
            </div>
            <div className="mt-8 space-y-4">
                <div className="flex justify-between">
                    <span className="font-bold">Total</span>
                    <span className="font-bold">${totalAmount}</span>
                </div>
            </div>
            <Button onClick={() => {
                    navigate("/shop/checkout")
                    setopenCartsidebar(false)
                }} className="mt-8 w-full">CheckOut</Button>
        </SheetContent>
    )
}

export default ShoppingCartWrapper
import Address from "@/components/shopping-view/Address";
import bannerOne from "../../../assets/web-shop.jpg";
import { useSelector } from "react-redux";
import ShoopingCartItemContent from "@/components/shopping-view/cart-item-content";
import { Button } from "@/components/ui/button";

const ShoppingCheckout = () => {
  const { cartitems } = useSelector(state => state.CartSlice)

  const totalAmount = cartitems && cartitems.items && cartitems.items.length > 0 ?
    cartitems.items.reduce((sum, currentitem) =>
      sum + (currentitem?.salePrice > 0 ? currentitem.salePrice : currentitem.Price
      ) * currentitem.quantity, 0) : 0
  return (

    <div className="flex flex-col">
      <div className="realtive h-[300px] w-full overflow-hidden">
        <img
          src={bannerOne}
          className="h-full w-full  object-cover object-center"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 p-5">
        <Address />
        <div className="flex flex-col gap-4">
          {
            cartitems && cartitems.items && cartitems.items.length > 0 ?
              cartitems.items.map((item) => (
                <ShoopingCartItemContent cartitems={item} key={item.id}/>
              )) : null
          }
          <div className="mt-8 space-y-4">
            <div className="flex justify-between">
              <span className="font-bold">Total</span>
              <span className="font-bold">${totalAmount}</span>
            </div>
          </div>
          <div className="mt-4">
             <Button className="w-full capitalize">CheckOut with PayPal</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShoppingCheckout
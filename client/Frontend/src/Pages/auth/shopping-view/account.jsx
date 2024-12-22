import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import accImg from "../../../assets/web-shop2.jpg";
import { TabsContent } from "@radix-ui/react-tabs";
import Address from "@/components/shopping-view/Address";
import ShoppingOrders from "@/components/shopping-view/Orders";


const ShoppingAccount = () => {
  return (
    <div className='flex flex-col'>
      <div className='relative h-[350px] w-full overflow-hidden'>
        <img
          src={accImg}
          width={'1600'}
          height={'300'}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="container mx-auto grid grid-cols-1 gap-8 py-8">
        <div className="flex flex-col rounded-lg border bg-background p-3">
          <Tabs defaultValue="orders">
            <TabsList>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="address">Address</TabsTrigger>
            </TabsList>
            <TabsContent value="orders">
              <ShoppingOrders/>
            </TabsContent>
            <TabsContent value="address">
              <Address />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

export default ShoppingAccount
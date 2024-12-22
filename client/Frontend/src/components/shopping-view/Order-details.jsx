
import { DialogContent, DialogDescription, DialogTitle } from "../ui/dialog"
import { Label } from "../ui/label"
import { Separator } from "../ui/separator"





const ShoppingOrderDetails = () => {
   
    return (
        <DialogContent className="sm:max-w-[600px]   ">
            <div className="grid gap-3">
                <div className="grid gap-2">
                    <DialogTitle className='font-bold text-xl text-center mb-1'>Your Details</DialogTitle>
                    <div className="flex mt-1 items-center justify-between ">
                        <DialogDescription className="font-bold text-center text-lg">Order ID</DialogDescription>
                        <Label className="text-lg">12345</Label>
                    </div>
                    <div className="flex mt-1 items-center justify-between ">
                        <DialogDescription className="font-bold text-center text-lg">Order Date</DialogDescription>
                        <Label className="text-lg">12/23/24</Label>
                    </div>
                    <div className="flex mt-1 items-center justify-between ">
                        <DialogDescription className="font-bold text-center text-lg">Order Status</DialogDescription>
                        <Label className="text-lg">In Process</Label>
                    </div>
                    <div className="flex mt-1 items-center justify-between ">
                        <DialogDescription className="font-bold text-center text-lg">Order Price</DialogDescription>
                        <Label className="text-lg">$500</Label>
                    </div>
                </div>
                <Separator />
                <div className="grid gap-2">
                    <div className="grid gap-1">
                        <div className="font-semibold text-lg">Order Details</div>
                        <ul className="grid gap-1">
                            <li className="flex items-center justify-between">
                                <span className="font-medium">Product One</span>
                                <span className="font-medium">$100</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="grid gap-0.5">
                    <div className="grid ">
                        <div className="font-semibold text-lg">Shipping Info</div>
                        <div className="grid gap-0.5 text-muted-foreground font-semibold">
                            <span>John Doe</span>
                            <span>Address</span>
                            <span>City</span>
                            <span>Pincode</span>
                            <span>Phone</span>
                            <span>Notes</span>
                        </div>
                    </div>
                </div>
            </div>
        </DialogContent>
    )
}

export default ShoppingOrderDetails
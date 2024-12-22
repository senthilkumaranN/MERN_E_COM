import { Button } from "../ui/button"
import { CardContent,Card, CardFooter } from "../ui/card"
import { Label } from "../ui/label"



const AddressCard = ({addressInfo, handleDeleteAddress, handleEditAddress}) => {
  return (
    <Card>
        <CardContent className="grid p-4 gap-4">
           <Label>Address: {addressInfo?.Address}</Label>
           <Label>City: {addressInfo?.City}</Label>
           <Label>Pincode: {addressInfo?.Pincode}</Label>
           <Label>Phone: {addressInfo?.Phone}</Label>
           <Label>Notes: {addressInfo?.Notes}</Label>
        </CardContent>
        <CardFooter className='p-3 flex justify-between'>
            <Button onClick={()=>handleEditAddress(addressInfo)}>Edit</Button>
            <Button onClick={()=>handleDeleteAddress(addressInfo)}>Delete</Button>
        </CardFooter>
    </Card>
  )
}

export default AddressCard
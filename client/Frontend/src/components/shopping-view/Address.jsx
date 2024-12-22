import { useEffect, useState } from "react"
import CommonForm from "../common/form"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { addressFormControls } from "@/config"
import { useDispatch, useSelector } from "react-redux"
import { addAddress, deleteAddress, editAddress, fetchAddress } from "@/slice/address/Slice"
import AddressCard from "./Address-card"
import { useToast } from "@/hooks/use-toast"

const initialState = {
    Address: '',
    Phone: '',
    City: '',
    Pincode: '',
    Notes: ''
}



const Address = () => {
    const [formData, setFormData] = useState(initialState)
    const { user } = useSelector((state) => state.auth)
    const { AddressList } = useSelector((state) => state.AddressSlice)
    const [currentAddressEdit, setcurrentAddressEdit] = useState(null)
    const { toast } = useToast()
    const dispatch = useDispatch()
     
    function onSubmit(event) {
        event.preventDefault()

        if(AddressList >= 3 && currentAddressEdit === null){
            setFormData(initialState)
            toast({
                title: "user can Add max 3 only",
                variant: destructive
            })
        }
        currentAddressEdit !== null ?
            dispatch(editAddress({ userId: user?.id, addressId: currentAddressEdit, formData },
                
            )).then((data) => {
                if (data?.payload?.success) {
                    dispatch(fetchAddress(user?.id))
                    setFormData(initialState)
                    setcurrentAddressEdit(null)
                    toast({
                        title: data?.payload?.message
                    })
                }
            })
            : dispatch(addAddress({
                ...formData,
                userId: user?.id
            })).then((data) => {
                if (data.payload.success) {
                    dispatch(fetchAddress(user?.id))
                    setFormData(initialState)
                    toast({
                        title: data?.payload?.message
                    })
                }
            })
    }



    function handleDeleteAddress(getcurrentAddress) {
        dispatch(deleteAddress({ userId: user?.id, addressId: getcurrentAddress?._id })).then((data) => {
            if (data.payload.success) {
                dispatch(fetchAddress(user?.id))
                toast({
                    title: data.payload.message
                })
            }
        })

    }

    function isVaildForm() {
        return Object.keys(formData)
            .map((key) => formData[key].trim() !== "")
            .every((item) => item);
    }

    function handleEditAddress(getcurrentAddress){
         setcurrentAddressEdit(getcurrentAddress._id)
         setFormData({
            ...formData,
            Address: getcurrentAddress?.Address,
            City: getcurrentAddress?.City,
            Phone: getcurrentAddress?.Phone,
            Pincode: getcurrentAddress?.Pincode,
            Notes: getcurrentAddress?.Notes,
         })
    }

    useEffect(() => {
        dispatch(fetchAddress(user?.id))
    }, [dispatch])




    return (
        <Card>
            <div className="mb-5 p-3 grid grid-cols-1 sm:grid-cols-2  gap-2" >
                {
                    AddressList && AddressList.length > 0 ?
                        AddressList.map((address) => (<AddressCard addressInfo={address} key={address._id}
                            handleDeleteAddress={handleDeleteAddress} handleEditAddress={handleEditAddress}/>)) : null
                }
            </div>
            <CardHeader>
                <CardTitle>{currentAddressEdit !== null ? "Edit Address" : "Add New Address"}</CardTitle>
            </CardHeader>
            <CardContent>
                <CommonForm
                    formControls={addressFormControls}
                    formData={formData}
                    setFormData={setFormData}
                    onSubmit={onSubmit}
                    Buttontext={currentAddressEdit !== null ? "Edit Address" : "Add Address"}
                    isbuttonDisabled={!isVaildForm()} />
            </CardContent>
        </Card>
    )
}

export default Address
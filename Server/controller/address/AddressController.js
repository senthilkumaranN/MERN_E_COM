const AddressDB = require('../../model/Address.js')



const addAddress = async (req, res) => {
    try {
        const { userId, Address, City, Pincode, Notes, Phone } = req.body

        if (!userId || !Address || !City || !Pincode || !Notes || !Phone) {
            return res.status(404).json({
                success: false,
                message: "Invaild Data Provided"
            })
        }

        const newlyCreatedAddress = new AddressDB({
             userId, Address, City, Pincode, Notes, Phone
        })

        await newlyCreatedAddress.save()

        res.status(201).json({
            success: true,
            data: newlyCreatedAddress,
            message: "Address Added Successfully!"
        })
    } catch (e) {
        console.log(e)
        res.status(500).json({
            success: false,
            message: "Error occurred while adding address"
        })
    }
}

const fetchAddress = async (req, res) => {
    try {
        const { userId } = req.params

        if (!userId) {
            return res.status(404).json({
                success: false,
                message: "UserId not found"
            })
        }

        const getAddress = await AddressDB.find({ userId })

        if (!getAddress) {
            res.status(404).json({
                success: false,
                message: "Address is not found"
            })
        }

        res.status(200).json({
            success: true,
            data: getAddress,
            message: "Address Fetched Successfully!"
        })



    } catch (e) {
        console.log(e)
        res.status(500).json({
            success: false,
            message: "Error occurred while fetching address"
        })
    }
}

const editAddress = async (req,res) => {
    try{
        const {userId,addressId} = req.params
        const formData = req.body

        if(!userId || !addressId){
            return res.status(400).json({
                success : true,
                message: "User and Address Id's are not found"
            })
        }

        const address = await AddressDB.findOneAndUpdate({
            _id: addressId, userId
        }, formData, {new: true})

        if(!address){
            return res.status(404).json({
                success: false,
                message: "Address not found"
            })
        }

        res.status(200).json({
            success: true,
            data: address,
            message: "Address Updated Successfully"
        })

    }catch(e){
        console.log(e)
        res.status(500).json({
            success: false,
            message: "Error occurred while Updating the address"
        })
    }
}

const deleteAddress = async (req,res) => {
    try{
        const { userId, addressId} = req.params;

        if(!userId || !addressId){
            return res.status(404).json({
                success: true,
                message: "user and Address Id's are not found"
            })
        }

        const address = await AddressDB.findOneAndDelete({_id: addressId, userId})

        if(!address){
            return res.status(404).json({
                success: fasle,
                message: "Address is not found"
            })
        }

        res.status(200).json({
            success: true,
            message: "Address Deleted Successfully"
        })

    }catch(e){
        console.log(e)
        res.status(500).json({
            success: false,
            message: "Error occurred while deleting address"
        })
    }
}

module.exports = {addAddress, editAddress, fetchAddress, deleteAddress}
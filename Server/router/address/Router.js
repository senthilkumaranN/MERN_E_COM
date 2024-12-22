const { addAddress,
    editAddress,
    deleteAddress,
    fetchAddress } = require('../../controller/address/AddressController')


const express = require('express')
const router = express.Router()

router.get('/get/:userId', fetchAddress)
router.post('/addAddress',addAddress)
router.put('/edit/:userId/:addressId', editAddress)
router.delete('/delete/:userId/:addressId', deleteAddress)


module.exports = router
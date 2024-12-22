const {getFilterProduct, getProductDetails} = require('../../controller/shop/ProductShop_Controller')
const express = require('express')

const router = express.Router()


router.get('/get',getFilterProduct)
router.get('/get/:id',getProductDetails)



module.exports = router
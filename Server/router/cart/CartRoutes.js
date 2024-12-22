const express = require('express');

const { addCartItem,
    updateCartItem,
    fetchCartItem,
    deleteCartItem } = require('../../controller/cart/Controller')


const router = express.Router()


router.get('/get/:userId', fetchCartItem)
router.post('/add', addCartItem)
router.put('/updateCart', updateCartItem)
router.delete('/:userId/:productId', deleteCartItem)

module.exports = router;
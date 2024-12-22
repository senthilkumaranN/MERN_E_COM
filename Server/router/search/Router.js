const express = require('express')

const {searchProducts} = require('../../controller/search/Controller')

const router = express.Router()


router.get('/:keyword', searchProducts)


module.exports = router
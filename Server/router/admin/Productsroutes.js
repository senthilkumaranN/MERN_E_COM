const express = require('express');
const { upload } = require('../../helper/cloudinary');
const { handleImageUpload,
    addProduct, getProduct, editProduct, deleteProduct } = require('../../controller/admin/Imageupload-Controller');

const router = express.Router()


router.post('/uploadimage', upload.single('my_file'), handleImageUpload)
router.post('/add',addProduct)
router.get('/fetch', getProduct)
router.put('/edit/:id',editProduct)
router.delete('/delete/:id',deleteProduct)

module.exports = router
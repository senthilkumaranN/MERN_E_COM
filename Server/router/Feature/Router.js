const express = require('express')

const { addFeature, getFeature, deleteImage } = require('../../controller/admin/Feature')
const router = express.Router()


router.post('/add', addFeature)
router.get('/get', getFeature)
router.delete('/delete/:id', deleteImage)


module.exports = router
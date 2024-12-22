const { ImageUploadUtil } = require("../../helper/cloudinary");
const Product = require('../../model/Product')
const mongoose = require('mongoose')

// Step 1: Convert the uploaded file to a Base64 string
//(req.file)This is the file object provided by middleware like Multer when a file is uploaded.
//req.file.buffer contains the raw binary data of the uploaded file.

//(Buffer.from(req.file.buffer)
//Converts the binary data in req.file.buffer to a Buffer object, which is a Node.js way of handling raw data
//Definition of the code
//Converts the file's binary data to a Base64 string.
//Constructs a Data URL using the Base64 string and the file's MIME type.
//Calls a utility function to upload the image to a cloud service.

const handleImageUpload = async (req, res) => {
    try {
        const b64 = Buffer.from(req.file.buffer).toString('base64');
        const url = "data:" + req.file.mimetype + ";base64," + b64;
        const result = await ImageUploadUtil(url)

        res.json({
            success: true,
            url: result.url,
        })

    } catch (error) {
        console.log(error)
        res.json({
            success: false,
            message: "Error-occured"
        })
    }
}

const addProduct = async (req, res) => {
    try {
        const { image, title, description, category, brand, price, salePrice, totalStock } = req.body;

        const newlyCreatedProduct = new Product({
            image, title, description, category, brand, price, salePrice, totalStock
        })

        await newlyCreatedProduct.save();
        res.status(201).json({
            success: true,
            data: newlyCreatedProduct,
            message: "New Product Added Successfully"
        })
    } catch (e) {
        console.log(e)
        res.status(500).json({
            success: false,
            message: "Error-occured"
        })
    }
}

const getProduct = async (req, res) => {
    try {
        const getProduct = await Product.find({})
        res.status(200).json({
            success: true,
            getProduct
        })

    } catch (e) {
        console.log(e)
        res.status(500).json({
            success: false,
            message: "Error-occured"
        })
    }
}

const editProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { image, title, description, category, brand, price, salePrice, totalStock } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid product ID",
            });
        }

        let findProduct = await Product.findById(id);
        if (!findProduct) {
            return res.status(401).json({
                success: false,
                message: "Product not found"
            })
        }

        findProduct.title = title || findProduct.title
        findProduct.description = description || findProduct.description
        findProduct.category = category || findProduct.category
        findProduct.brand = brand || findProduct.brand
        findProduct.price = price === '' ? 0 : '' || findProduct.price
        findProduct.salePrice = salePrice === '' ? 0 : '' || findProduct.salePrice
        findProduct.totalStock = totalStock || findProduct.totalStock
        findProduct.image = image || findProduct.image

        await findProduct.save();
        res.status(200).json({
            success: true,
            data: findProduct,
            message: "Product Edited Successfully"
        });

    } catch (e) {
        console.error("Error updating product:", e);
        res.status(500).json({
            success: false,
            message: "An error occurred while updating the product",
        });
    }
}

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            })
        }
        res.status(200).json({
            success: true,
            message: "Product deleted Successfully"
        })

    } catch (e) {
        console.log(e)
        res.status(500).json({
            success: false,
            message: "Error-occured"
        })
    }
}

module.exports = { handleImageUpload, addProduct, editProduct, getProduct, deleteProduct }




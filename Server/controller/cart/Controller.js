const Cart = require('../../model/Cart')
const Product = require('../../model/Product')


const addCartItem = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body

        if (!userId || !productId || !quantity) {
            return res.status(400).json({
                success: false,
                message: "Invaild data provided!"
            })
        }

        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            })
        }

        let cart = await Cart.findOne({ userId });

        if (!cart) {
            cart = new Cart({ userId, items: [] });
        }

        const findCurrentProductindex = cart.items.findIndex((item) => item.productId.toString() === productId)

        if (findCurrentProductindex === -1) {
            cart.items.push({ productId, quantity });
        } else {
            cart.items[findCurrentProductindex].quantity += quantity
        }

        await cart.save();
        res.status(200).json({
            success: true,
            data: cart,
            message: "Product Added to cart"
        })

    } catch (e) {
        console.log(e)
        res.status(500).json({
            success: false,
            message: "Error"
        })
    }
}

const updateCartItem = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body

        if (!userId || !productId || !quantity) {
            return res.status(400).json({
                success: false,
                message: "Invaild data provided!"
            })
        }
        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found",
            })
        }

        const findCurrentProductindex = cart.items.findIndex((item) =>
            item.productId.toString() === productId);

        if (findCurrentProductindex === -1) {
            return res.status(404).json({
                success: false,
                message: "Cart item not present!",
            })
        }

        cart.items[findCurrentProductindex].quantity = quantity
        await cart.save();

        await cart.populate({
            path: "items.productId",
            select: "image title price salePrice",
        })

        const populateCartItems = cart.items.map((item) => ({
            productId: item.productId ? item.productId._id : null,
            image: item.productId ? item.productId.image : null,
            title: item.productId ? item.productId.title : "Product not found",
            price: item.productId ? item.productId.price : null,
            salePrice: item.productId ? item.productId.salePrice : null,
            quantity: item.quantity,
        }))

        res.status(200).json({
            success: true,
            data: {
                ...cart._doc,
                items: populateCartItems
            }
        })


    } catch (e) {
        console.log(e)
        res.status(500).json({
            success: false,
            message: "Error"
        })
    }
}

const fetchCartItem = async (req, res) => {
    try {
        const { userId } = req.params;

        if (!userId) {
            return res.status(400).json({
                sucess: false,
                message: "user id is manditory"
            })
        }

        const cart = await Cart.findOne({ userId }).populate({
            path: "items.productId",
            select: "image title price salePrice",
        })

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found",
            })
        }

        const vaildItems = cart.items.filter((productItem) => productItem.productId);

        if (vaildItems.length < cart.items.length) {
            cart.items = vaildItems;
            await cart.save();
        }

        const populateCartItems = vaildItems.map(item => ({
            productId: item.productId._id,
            image: item.productId.image,
            title: item.productId.title,
            price: item.productId.price,
            salePrice: item.productId.salePrice,
            quantity: item.quantity,
        }))

        res.status(200).json({
            success: true,
            data: {
                ...cart._doc,
                items: populateCartItems
            }
        })
    } catch (e) {
        console.log(e)
        res.status(500).json({
            success: false,
            message: "Error"
        })
    }
}

const deleteCartItem = async (req, res) => {
    try {
        const { userId, productId } = req.params;

        if (!userId || !productId) {
            return res.status(400).json({
                success: false,
                message: "Invalid data provided!"
            });
        }

        // Find the user's cart
        const cart = await Cart.findOne({ userId }).populate({
            path: "items.productId",
            select: "image title price salePrice",
        });

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found",
            });
        }

        // Filter out the item to delete
        const updatedItems = cart.items.filter(
            item => item.productId._id.toString() !== productId
        );

        if (updatedItems.length === cart.items.length) {
            return res.status(404).json({
                success: false,
                message: "Product not found in cart",
            });
        }

        cart.items = updatedItems;
        await cart.save();

        // Re-populate cart items after saving
        await cart.populate({
            path: "items.productId",
            select: "image title price salePrice",
        });

        // Prepare response data
        const populatedCartItems = cart.items.map((item) => ({
            productId: item.productId ? item.productId._id : null,
            image: item.productId ? item.productId.image : null,
            title: item.productId ? item.productId.title : "Product not found",
            price: item.productId ? item.productId.price : null,
            salePrice: item.productId ? item.productId.salePrice : null,
            quantity: item.quantity,
        }));

        return res.status(200).json({
            success: true,
            data: {
                ...cart._doc,
                items: populatedCartItems,
            },
        });
    }  catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while deleting the cart item",
        });
    }
}
   

module.exports = { addCartItem, updateCartItem, fetchCartItem, deleteCartItem }
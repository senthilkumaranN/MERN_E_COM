const shopProduct = require('../../model/Product')



const getFilterProduct = async (req, res) => {
    const { category = [], brand = [], sortBy = "price-lowtohigh" } = req.query
    try {

        let filter = {};
        if (category.length) {
            filter.category = { $in: category.split(',') }
        }

        if (brand.length) {
            filter.brand = { $in: brand.split(',') }
        }

        let sort = {}

        switch (sortBy) {
            case 'price-lowtohigh':
                sort.price = 1
                break;
            case 'price-hightolow':
                sort.price = -1
                break;
            case 'title-atoz':
                sort.title = 1
                break;
            case 'title-ztoa':
                sort.title = -1
                break;
            default:
                sort.price = 1
                break;
        }
        const getFilterProduct = await shopProduct.find(filter).sort(sort);
        res.status(200).json({
            success: true,
            data: getFilterProduct
        })

    } catch (e) {
        console.log(e)
        res.status(500).json({
            success: false,
            message: "Error-occured while fetching shopProduct"
        })
    }
}

const getProductDetails = async (req,res) => { 
      try{
        const {id} = req.params
        const product = await shopProduct.findById(id)
        if(!product){
            return res.status(404).json({
                success: false,
                message: "Product not found!"
            })
        }
        res.status(200).json({
            success: true,
            Product: product
        })

      }catch(e){
        res.status(500).json({
            success: false,
            message: " Error occured while fetching details"
        })
      }
}

module.exports = {getFilterProduct, getProductDetails}
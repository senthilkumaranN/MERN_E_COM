const Product = require('../../model/Product')



const searchProducts = async(req,res)=>{
    try{

        const {keyword}= req.params;

        if( !keyword || typeof keyword !== 'string'){
            return res.status(400).json({
                success: false,
                message: "keyword is requires and must be in string format"
            })
        }

        const regx = new RegExp(keyword, 'i')

        const createSearchQuery = {
            $or: [
                {title : regx},
                {description : regx},
                {category : regx},
                {brand : regx},
            ]
        }

        const searchResults = await Product.find(createSearchQuery);

        res.status(200).json({
            success : true,
            message: "Your Product",
            data: searchResults
        })

    }catch(e){
        console.log(e)
        res.status(500).json({
            success: false,
            message: "Error occured while sreaching"
        })
    }
}

module.exports = {searchProducts}
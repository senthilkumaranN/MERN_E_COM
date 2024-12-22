const express = require('express')
require('dotenv').config()
const connectdb = require('./Database_connection/db.js')
const cors = require('cors')
const cookie = require('cookie-parser')
const authrouter = require('./router/auth_router.js')
const adminrouter = require('./router/admin/Productsroutes.js')
const shoprouter = require('./router/shop/Product_router.js')
const Cartrouter = require('./router/cart/CartRoutes.js')
const Addressrouter = require('./router/address/Router.js')
const searchRouter = require('./router/search/Router.js')
const FeatureRouter = require('./router/Feature/Router.js')


const app = express();


connectdb();

app.use(cors({
    origin: process.env.APPLICATION_URL,
    methods: ["POST", "GET", "PUT", "DELETE"],
    allowedHeaders: [
        "Content-Type",
        "Authorization",
        "Cache-Control",
        "Expires",
        "Pragma"
    ],
    credentials: true
}))

app.use(express.json())
app.use(cookie())
app.use('/api', authrouter)
app.use('/api/admin/products', adminrouter)
app.use('/api/shop/products', shoprouter)
app.use('/api/shop/cart', Cartrouter)
app.use('/api/shop/address', Addressrouter)
app.use('/api/shop/products/search', searchRouter)
app.use('/api/shop/feature',FeatureRouter)



const PORT = process.env.PORT
app.listen(PORT, (res, req) => {
    console.log(`server connected on ${PORT}`);
})
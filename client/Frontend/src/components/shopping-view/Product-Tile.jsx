import React from 'react'
import { Badge } from '../ui/badge'
import { CardContent, CardFooter, Card } from '../ui/card'
import { Button } from '../ui/button'

const ShoppingProductTile = ({ product, handlegetProductId, handleAddtoCart }) => {
    return (

        <Card className="w-full max-w-sm mx-auto">
            <div onClick={() => handlegetProductId(product?._id)}>
                <div className='relative'>
                    <img
                        src={product?.image}
                        alt={product?.title}
                        className='w-full h-[300px] object-cover rounded-t-lg'
                    />
                    {
                        product?.salePrice > 0 ? (
                            <Badge className='absolute top-2 left-2 bg-red-600 hover:bg-red-500'>
                                Sale
                            </Badge>
                        ) : null
                    }
                </div>
                <CardContent className='p-4'>
                    <h2 className='text-xl font-bold mb-2'>{product?.title}</h2>
                    <div className='flex justify-between items-center mb-2'>
                        <span className='text-[16px] text-muted-foreground'>{product?.category}</span>
                        <span className='text-[16px] text-muted-foreground'>{product?.brand}</span>
                    </div>
                    <div className='flex justify-between items-center mb-2'>
                        <span className={`${product.salePrice > 0 ? "line-through" : ""}
                     text-lg font-semibold text-primary`}>${product?.price}</span>
                        {
                            product.salePrice > 0 ?
                                <span className='text-lg font-bold'>${product?.salePrice}</span> : null
                        }
                    </div>
                </CardContent>
            </div>
            <CardFooter>
                <Button onClick={()=>handleAddtoCart(product?._id)} className="w-full">
                    Add to Cart
                </Button>
            </CardFooter>
        </Card>
    )
}

export default ShoppingProductTile
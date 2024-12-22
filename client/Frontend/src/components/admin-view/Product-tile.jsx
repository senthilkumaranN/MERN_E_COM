import React from 'react'
import { CardContent, CardFooter, Card } from '../ui/card'
import { Button } from '../ui/button'

const AdminProductTile = ({ product, setFormData, setcurrentProductId, setopenSidebarProduct, handleDelete }) => {
    return (
        <Card className="w-full max-w-sm mx-auto sm:w-[200px]">
            <div>
                <div className='relative'>
                    <img src={product?.image}
                        alt={product?.title}
                        className='w-full h-[200px] sm:h-[250px] sm:w-[200px] object-cover rounded-t-lg'></img>
                </div>
                <CardContent>
                    <h2 className='text-xl font-bold my-2 capitalize'>{product?.title}</h2>
                    <div className='flex justify-between items-center my-1'>
                        <span className={`${product.salePrice > 0 ? "line-through" : ""}
                     text-lg font-semibold text-primary`}>${product?.price}</span>
                        {
                            product.salePrice > 0 ?
                                <span className='text-lg font-bold'>${product?.salePrice}</span> : null
                        }

                    </div>
                </CardContent>
                <CardFooter className='flex justify-between items-center '>
                    <Button onClick={() => {
                        setopenSidebarProduct(true)
                        setcurrentProductId(product._id)
                        setFormData(product)
                    }}>edit</Button>
                    <Button onClick={()=> handleDelete(product._id)}>Delete</Button>
                </CardFooter>
            </div>
        </Card >
    )
}

export default AdminProductTile
import ProductImageUpload from '@/components/admin-view/image-upload'
import AdminProductTile from '@/components/admin-view/Product-tile'
import CommonForm from '@/components/common/form'
import { Button } from '@/components/ui/button'
import { SheetContent, SheetHeader, SheetTitle, Sheet } from '@/components/ui/sheet'
import { addProductFormElements } from '@/config'
import { useToast } from '@/hooks/use-toast'
import { addProducts, deleteProducts, editProducts, getProducts } from '@/slice/admin/ProductSlice'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const initialState = {
  image: null,
  title: '',
  description: '',
  category: '',
  brand: '',
  price: '',
  salePrice: '',
  totalStock: '',
}



const AdminFeatures = () => {
  const [openSidebarProduct, setopenSidebarProduct] = useState(false)
  const [formData, setFormData] = useState(initialState)
  const [imageupload, setimageupload] = useState(null)
  const [uploadedImageUrl, setuploadedImageUrl] = useState("")
  const [imageloading, setimageloading] = useState(false)
  const [currentProductId, setcurrentProductId] = useState(null)
  const dispatch = useDispatch()
  const { toast } = useToast()
  const { ProductList } = useSelector((state) => state.adminProducts)


  function onSubmit(event) {
    event.preventDefault()
    currentProductId !== null ? dispatch(editProducts({
      id: currentProductId, formData
    })).then((data) => {
      if (data.payload.success) {
        dispatch(getProducts())
        setFormData(initialState)
        setopenSidebarProduct(false)
        setcurrentProductId(null)
        toast({
           title: data?.payload?.message
        })
      }

    }) :
      dispatch(
        addProducts({
          ...formData,
          image: uploadedImageUrl,
        })
      ).then((data) => {
        if (data.payload.success) {
          dispatch(getProducts())
          setopenSidebarProduct(false)
          setimageupload(null)
          setFormData(initialState)
          toast({
            title: data?.payload?.message
          })
        }
      })
  }

  function handleDelete(getProductid){
     dispatch(deleteProducts(getProductid)).then(data=>{
      if(data?.payload?.success){
        dispatch(getProducts())
        toast({
          title: data?.payload?.message
        })
      }
     })
  }
  
  function isFormvaild(){
     return Object.keys(formData)
      .map((key) => formData[key] !== "")
      .every(item => item);
  }

  useEffect(() => {
    dispatch(getProducts())
  }, [dispatch])
  
  return (
    <>
      <div className='mb-5 w-full flex justify-end'>
        <Button onClick={() => setopenSidebarProduct(true)}>
          Add New Product
        </Button>
      </div>
      <div className='grid gap-4 md:grid-cols-3 lg:grid-cols-4 sm:grid-cols-2'>
        {
          ProductList && ProductList.length > 0 ? (
            ProductList.map(productItem =>
              <AdminProductTile key={productItem._id} product={productItem}
                setFormData={setFormData}
                setcurrentProductId={setcurrentProductId}
                setopenSidebarProduct={setopenSidebarProduct}
                handleDelete={handleDelete} />)

          ) : <div>No Products</div>
        }
      </div>
      <Sheet open={openSidebarProduct}
        onOpenChange={() => {
          setopenSidebarProduct(false)
          setcurrentProductId(null)
          setFormData(initialState)
        }}>
        <SheetContent side="right" className='overflow-auto'>
          <SheetHeader>
            <SheetTitle>
              {currentProductId === null ? "Add New Product" : "Edit Product"}
            </SheetTitle>
          </SheetHeader>
          <ProductImageUpload
            imageupload={imageupload}
            setimageupload={setimageupload}
            setuploadedImageUrl={setuploadedImageUrl}
            setimageloading={setimageloading}
            imageloading={imageloading}
            iseditmode={currentProductId !== null} />
          <div className='py-5'>
            <CommonForm
              formControls={addProductFormElements}
              onSubmit={onSubmit}
              formData={formData}
              setFormData={setFormData}
              Buttontext={currentProductId === null ? "Add Products" : "Edit Products"}
              isbuttonDisabled={!isFormvaild()}
            />
          </div>

        </SheetContent>
      </Sheet>

    </>
  )
}

export default AdminFeatures
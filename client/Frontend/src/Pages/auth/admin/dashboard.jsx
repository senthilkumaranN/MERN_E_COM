import ProductImageUpload from '@/components/admin-view/image-upload'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'
import { addFeatureImage, deleteFeatureImage, getFeatureImage } from '@/slice/Feature'
import { Trash } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const AdminDashboard = () => {
  const [imageupload, setimageupload] = useState(null)
  const [uploadedImageUrl, setuploadedImageUrl] = useState("")
  const [imageloading, setimageloading] = useState(false)
  const { featureImageList } = useSelector(state => state.FeatureSlice)
  const dispatch = useDispatch()
  const {toast}= useToast()

  function handleUploadFeatureImage() {
    dispatch(addFeatureImage(uploadedImageUrl)).then((data) => {
      if (data.payload.success) {
        dispatch(getFeatureImage())
         setimageupload(null)
         setuploadedImageUrl(null)
      }
    })
  }

  function handledeleteFeature(getimgid){
       dispatch(deleteFeatureImage(getimgid))
       .then((data) => {
            if(data.payload.success){
                dispatch(getFeatureImage())
                toast({
                   title: data.payload.message
                })
            }
            
       })
  }

  useEffect(() => {
    dispatch(getFeatureImage())
  }, [dispatch])


  return (
    <div>
      <h1 className='text-center my-3 font-bold text-2xl'>Upload User Home Images  </h1>
      <ProductImageUpload
        imageupload={imageupload}
        setimageupload={setimageupload}
        setuploadedImageUrl={setuploadedImageUrl}
        setimageloading={setimageloading}
        imageloading={imageloading}
        isCustomStyling={true}
      />
      <Button onClick={handleUploadFeatureImage} className='mt-5 w-full'>Upload</Button>
      <div className='flex flex-col gap-4 mt-5'>
        {
          featureImageList && featureImageList.length > 0 ?
            featureImageList.map((featureImageList) => (
              <div className='relative' key={featureImageList._id}>
                <img
                  src={featureImageList.image}
                  className='w-full h-[300px] object-cover rounded-sm'
                />
                <div className='mt-3'>
                  <Button className="w-full" onClick={()=>handledeleteFeature(featureImageList._id)}>
                     <Trash/>Delete
                     
                  </Button>
                </div>
              </div>
            )) : <p>No images Uploaded</p>
        }

      </div>
    </div>
  )
}

export default AdminDashboard
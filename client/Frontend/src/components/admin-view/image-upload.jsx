import React, { useEffect, useRef } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { FileIcon, UploadCloudIcon, XIcon } from 'lucide-react';
import { Button } from '../ui/button';
import axios from 'axios';
import { Skeleton } from '../ui/skeleton';

const ProductImageUpload = ({ imageupload,
    setimageupload,
    setuploadedImageUrl,
    setimageloading,
    imageloading,
    iseditmode,
    isCustomStyling =false }) => {

    const inputref = useRef(null);

    function handleImagefilechange(event) {
        const selectedfiles = event.target.files?.[0];
        if (selectedfiles) setimageupload(selectedfiles)
    }

    function handleDragOver(event) {
        event.preventDefault()
    }
    function handleDrop(event) {
        event.preventDefault()
        const droppedfile = event.dataTransfer.files?.[0]
        if (droppedfile) setimageupload(droppedfile)
    }
    function handleRemove() {
        setimageupload(null)
        if (inputref.current) {
            inputref.current.value = ''
        }
    }

    async function uploadImageToCloudinary() {
        try {
            setimageloading(true)
            const data = new FormData();
            data.append('my_file', imageupload)
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/admin/products/uploadimage`, data)
            if (response?.data?.success) {
                setuploadedImageUrl(response?.data.url)
                setimageloading(false)
            }
        } catch (error) {
            console.error("Error occurred during image upload:", error.message);
        }
    }



    useEffect(() => {
        if (imageupload !== null) {
            uploadImageToCloudinary()
        }
    }, [imageupload])


    return (
        <div className={`w-full  mt-3 ${isCustomStyling ? '' : 'max-w-md mx-auto'}`}>
            <Label className='text-lg font-semibold mb-2 block'>Upload Image</Label>
            <div onDragOver={handleDragOver} onDrop={handleDrop} className={`${iseditmode ? "opacity-60" : ""}
            border-2 border-dashed rounded-lg p-4`}>
                <Input id='image-upload' type='file' ref={inputref} onChange={handleImagefilechange}
                 className='hidden' disabled={iseditmode} />
                {
                    !imageupload ?
                        <Label htmlFor='image-upload' className={`${iseditmode ? "cursor-not-allowed" : ''} 
                        flex flex-col justify-center items-center h-32 cursor-pointer`}>
                            <UploadCloudIcon className='w-10 h-10 text-muted-foreground mb-2' />
                            <span>Drag & Drop or click to upload Image</span>
                        </Label> :
                        imageloading ?
                            <Skeleton className='h-10 bg-gray-300'></Skeleton> :
                            <div className='flex justify-between items-center'>
                                <div className='flex items-center'>
                                    <FileIcon className='w-8 text-primary mr-2 h-8' />
                                </div>
                                <p className='text-sm font-medium'>{imageupload.name}</p>
                                <Button variant='ghost' size='icon' className='text-muted-foreground 
                         hover:bg-muted-foreground' onClick={handleRemove}>
                                    <XIcon className='w-4 h-4' />
                                    <span className='sr-only'>Remove File</span>
                                </Button>
                            </div>
                }
            </div>
        </div>
    )
}

export default ProductImageUpload
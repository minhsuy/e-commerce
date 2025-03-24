import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types'
import Button from '../Button/Button';
import { useForm } from 'react-hook-form';
import InputForms from '../Inputs/InputForms';
import { MdDelete } from 'react-icons/md';
import { imageToBase64 } from '../../utils/helper';
import { toast } from 'react-toastify'
import { apiAddVarriant } from '../../apis/product';


const CustomizeVariants = ({ render, customizeVariant, setCustomizeVariant }) => {
    const { handleSubmit, register, formState: { errors }, reset, watch } = useForm()
    useEffect(() => {
        reset({
            title: customizeVariant.title,
            price: customizeVariant.price,
            color: customizeVariant.color,

        })
    }, [])
    const [preview, setPreview] = useState({
        thumb: null,
        images: []
    })
    const handlePreviewThumb = async (img) => {
        const dataImage = await imageToBase64(img);
        setPreview((prev) => ({ ...prev, thumb: dataImage }))
    }
    const handlePreviewImages = async (images) => {
        const previewImg = []
        for (let image of images) {
            const dataImage = await imageToBase64(image)
            previewImg.push(dataImage)
        }
        setPreview((prev) => ({ ...prev, images: previewImg }))
    }
    useEffect(() => {
        if (watch('thumb') instanceof FileList && watch('thumb').length > 0) handlePreviewThumb(watch('thumb')[0])
    }, [watch('thumb')])
    useEffect(() => {
        if (watch('images') instanceof FileList && watch('images').length > 0) handlePreviewImages(watch('images'))
    }, [watch('images')])
    const handleDeleteImages = (name) => {
        setPreview(prev => ({ ...prev, thumb: null }))
    }
    const handleAddVariant = async (data) => {
        if (data.color === customizeVariant.color) {
            toast.warn('Color must be differrent !')
            return
        }
        else {
            const formdata = new FormData()
            for (let i of Object.entries(data)) formdata.append(i[0], i[1])
            if (data?.thumb) formdata.append("thumb", data?.thumb[0])
            if (data?.images) {
                for (let i of data.images) {
                    formdata.append('images', i)
                }
            }
            const response = await apiAddVarriant(formdata, customizeVariant._id)
            if (response.success) {
                toast.success('Create customize varriant successfully !')
                setCustomizeVariant(null)
                render()
            }
            else {
                toast.error('Create customize varriant failed !')
                setCustomizeVariant(null)
                render()
            }
        }
    }
    return (
        <div className='w-full flex flex-col gap-4 relative'>
            <h1 className='h-[75px] flex justify-between items-center' >
                <span className='text-2xl font-bold'>Customize product</span>
                <div className='p-5'>
                    <Button style={`bg-red-500 w-[250px]`} handleOnClick={() => setCustomizeVariant(null)}>Back to manage products</Button>
                </div>
            </h1 >
            <form onSubmit={handleSubmit(handleAddVariant)}>
                <div className='flex flex-col gap-y-5 w-full'>
                    {/* name */}
                    <div className='flex gap-x-4 '>
                        {/* original name */}
                        <InputForms label={'Original Name'} register={register} errors={errors} placeholder={'Product name'} id={'title'} className={`w-[400px] `} ></InputForms>
                        {/* original price */}
                        <InputForms label={'Original Price'} register={register} errors={errors} placeholder={'Product name'} id={'price'} className={`w-[400px] `} ></InputForms>
                        {/* original color */}
                        <InputForms label={'Original Color'} register={register} errors={errors} placeholder={'Product name'} id={'color'} className={`w-[400px] `} ></InputForms>
                    </div>

                    {/* thumb */}
                    <div className='mt-8 flex flex-col gap-y-3'>
                        <label htmlFor="thumb" className='font-semibold'>Upload thumbnail</label>
                        <input type="file" id='thumb' {...register("thumb")} />
                        <span className='text-main'>{errors && errors['thumb']?.message}</span>
                        {/* display */}
                        {preview.thumb && <div className='w-[200px] relative'>
                            <span className='absolute top-2  right-2 cursor-pointer p-2 rounded-lg text-white bg-main' onClick={() => handleDeleteImages(preview.thumb, 'thumb')}>
                                <MdDelete className='text-xl' onClick={() => handleDeleteImages(preview.thumb)}></MdDelete>
                            </span>
                            <img src={preview.thumb} alt="thumbnail" className='w-[200px] object-contain' />
                        </div>}
                    </div>
                    {/* images */}
                    <div className='mt-8 flex flex-col gap-y-3'>
                        <label htmlFor="image" className='font-semibold'>Upload images of product</label>
                        <input type="file" id='image' {...register("images")} multiple />
                        {/* display */}
                        {preview.images?.length > 0 && <div className='flex gap-x-4'>
                            {preview.images.map((item, index) => (
                                <div key={index} className='relative'>
                                    <img src={item} className='w-[150px] object-contain' alt="images" />
                                </div>
                            ))}
                        </div>}
                        <span className='text-main'>{errors && errors['images']?.message}</span>

                    </div>
                    <div className='mt-6'>
                        <Button style={'bg-main'} type={'submit'}>Add variant</Button>
                    </div>
                </div>
            </form>
        </div>
    );
};
CustomizeVariants.propTypes = {
    customizeVariant: PropTypes.any,
    setCustomizeVariant: PropTypes.any,
    render: PropTypes.any
}
export default memo(CustomizeVariants);
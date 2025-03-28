import React, { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../../components/Button/Button';
import InputForms from '../../components/Inputs/InputForms';
import { useSelector } from 'react-redux';
import Select from '../../components/Inputs/Select';
import MarkdownEditor from '../../components/Inputs/MarkdownEditor';
import { imageToBase64, validate } from '../../utils/helper'
import { icons } from '../../utils/icons';
import { apiCreateProduct, apiGetProduct } from '../../apis/product'
import { toast } from 'react-toastify'
import { showModal } from '../../store/app/appSlice'
import { useDispatch } from 'react-redux';
import Loading from '../../components/common/Loading';
const { MdDelete } = icons
const CreateProduct = () => {
    const dispatch = useDispatch()
    const { categories } = useSelector((state) => state.app)
    const { register, watch, formState: { errors }, handleSubmit, reset } = useForm();
    const [payload, setPayload] = useState({
        description: '',
    })
    const [preview, setPreview] = useState({
        thumb: null,
        images: []
    })
    const [invalidFields, setInvalidFields] = useState([])
    const changeValue = useCallback((e) => {
        setPayload(e)
    }, [payload])
    const handlePreviewThumb = async (img) => {
        const dataImage = await imageToBase64(img);
        setPreview((prev) => ({ ...prev, thumb: dataImage }))
    }
    const handlePreviewImages = async (images) => {
        const previewImg = []
        for (let image of images) {
            const dataImage = await imageToBase64(image)
            previewImg.push({ name: image.name, path: dataImage })
        }
        setPreview((prev) => ({ ...prev, images: previewImg }))
    }
    useEffect(() => {
        if (watch('thumb').length > 0) handlePreviewThumb(watch('thumb')[0])
    }, [watch('thumb')])
    useEffect(() => {
        handlePreviewImages(watch('images'))
    }, [watch('images')])
    const handleDeleteImages = (name, type) => {
        if (type === 'thumb') {
            setPreview((prev) => ({ ...prev, thumb: null }))
        }
        else {
            setPreview((prev) => ({ ...prev, images: prev?.images?.filter((item) => item.name !== name) }))
        }
    }
    const handleCreateProduct = async (data) => {
        if (data.category) data.category = categories?.find((item) => item._id === data.category).title
        const finalProductData = { ...data, ...payload }
        const formData = new FormData()
        for (let i of Object.entries(finalProductData)) {
            formData.append(i[0], i[1])
        }
        if (finalProductData?.thumb) formData.append('thumb', finalProductData.thumb[0])
        if (finalProductData?.images) {
            for (let i of finalProductData.images) {
                formData.append('images', i)
            }
        }
        dispatch(showModal({ isShowModal: true, modalChildren: <Loading></Loading> }))
        const response = await apiCreateProduct(formData)
        if (response.success) {
            dispatch(showModal({ isShowModal: false, modalChildren: null }))
            toast.success('Create a new product successfully !')
            reset()
            setPreview({
                thumb: null,
                images: []
            })
            setPayload({
                description: ''
            })
        }
        else {
            toast.error('Create a new product failed !')
        }
    }

    return (
        <div className='w-full'>
            <h1 className='h-[75px] flex justify-between items-center'>
                <span className='text-2xl font-bold'>Create product</span>
            </h1>
            <div className='p-4'>
                <form onSubmit={handleSubmit(handleCreateProduct)}>
                    {/* name */}
                    <InputForms label={'Name Product'} register={register} errors={errors} placeholder={'Product name'} id={'title'} className={`w-[600px]`} validate={{
                        required: 'Name product is required'
                    }}></InputForms>
                    <div className='w-full flex-col gap-y-4 mt-4'>
                        <div className='flex gap-x-4 mb-4'>
                            {/* price */}
                            <InputForms label={'Price Product'} register={register} errors={errors} placeholder={'Price Product'} id={'price'} className={`w-[300px]`} validate={{
                                required: 'Price product is required'
                            }} type='number'></InputForms>
                            {/* quantity */}
                            <InputForms label={'Quantity Product'} register={register} errors={errors} placeholder={'Quantity of Product'} id={'quantity'} className={`w-[300px]`} validate={{
                                required: 'Quantity product is required'
                            }} type='number'></InputForms>
                        </div>
                        {/* color */}
                        <InputForms label={'Color Product'} register={register} errors={errors} placeholder={'Color of Product'} id={'color'} className={`w-[300px]`} validate={{
                            required: 'Color product is required'
                        }} type='text'></InputForms>
                        {/* color */}
                        <div className='flex gap-x-4  mt-4'>
                            {/* category */}
                            <Select id={'category'} register={register} label={'Category Product'} errors={errors} className={'w-[300px]'} validate={{ required: 'Category is required !' }} option={categories && categories?.map((item) => ({ code: item?._id, value: item?.title }))}></Select>
                            {/* brand */}
                            <Select id={'brand'} register={register} label={'Brand Product'} errors={errors} validate={{ required: 'Brand is required !' }} className={'w-[300px]'} option={categories && categories.find((item) => item._id === watch('category'))?.brand.map((el) => ({ code: el, value: el }))}></Select>
                        </div>
                    </div>
                    <div className='mt-8'>
                        <MarkdownEditor name='description' changeValue={changeValue} label={'Description'} invalidFields={invalidFields} setInvalidFields={setInvalidFields} ></MarkdownEditor>
                    </div>
                    {/* thumb */}
                    <div className='mt-8 flex flex-col gap-y-3'>
                        <label htmlFor="thumb" className='font-semibold'>Upload thumbnail</label>
                        <input type="file" id='thumb' {...register("thumb", { required: 'Thumb of product is required' })} />
                        <span className='text-main'>{errors && errors['thumb']?.message}</span>
                        {/* display */}
                        {preview.thumb && <div className='w-[200px] relative'>
                            <span className='absolute top-2  right-2 cursor-pointer p-2 rounded-lg text-white bg-main' onClick={() => handleDeleteImages(preview.thumb, 'thumb')}>
                                <MdDelete className='text-xl'></MdDelete>
                            </span>
                            <img src={preview.thumb} alt="thumbnail" className='w-[200px] object-contain' />

                        </div>}
                    </div>
                    {/* images */}
                    <div className='mt-8 flex flex-col gap-y-3'>
                        <label htmlFor="image" className='font-semibold'>Upload images of product</label>
                        <input type="file" id='image' {...register("images", { required: 'Images of product is required' })} multiple />
                        {/* display */}
                        {preview.images?.length > 0 && <div className='flex gap-x-4'>
                            {preview.images.map((item, index) => (
                                <div key={index} className='relative'>
                                    <span className='absolute top-2  right-2 cursor-pointer p-2 rounded-lg text-white bg-main' onClick={() => handleDeleteImages(item.name, 'images')}>
                                        <MdDelete className='text-xl'></MdDelete>
                                    </span>
                                    <img src={item.path} className='w-[150px] object-contain' alt="images" />

                                </div>
                            ))}
                        </div>}
                        <span className='text-main'>{errors && errors['images']?.message}</span>

                    </div>
                    <div className='mt-6'>
                        <Button style={'bg-main'} type={'submit'}>Create new product</Button>
                    </div>
                </form>

            </div>
        </div>
    );
};

export default CreateProduct;
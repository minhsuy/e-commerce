import React, { memo, useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form';
import Button from '../../components/Button/Button';
import InputForms from '../../components/Inputs/InputForms';
import { useSelector } from 'react-redux';
import Select from '../../components/Inputs/Select';
import MarkdownEditor from '../../components/Inputs/MarkdownEditor';
import { imageToBase64, validate } from '../../utils/helper'
import { icons } from '../../utils/icons';
import { apiCreateProduct, apiGetProduct, apiUpdateProduct } from '../../apis/product'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux';
import { MdDelete } from 'react-icons/md';
import { showModal } from '../../store/app/appSlice'
import Loading from '../../components/common/Loading';
const UpdateProduct = ({ editProduct, setEditProduct, render }) => {
    const { handleSubmit, register, formState: { errors }, reset, watch } = useForm()
    const dispatch = useDispatch()
    const { categories } = useSelector((state) => state.app)
    const [payload, setPayload] = useState({
        description: '',
    })
    const [preview, setPreview] = useState({
        thumb: null,
        images: []
    })
    const [editMarkdown, setEditMarkdown] = useState(false)
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
            previewImg.push(dataImage)
        }
        setPreview((prev) => ({ ...prev, images: previewImg }))
    }
    const handleDeleteImages = (name, type) => {
        if (type === 'thumb') {
            setPreview((prev) => ({ ...prev, thumb: null }))
        }
        else {
            setPreview((prev) => ({ ...prev, images: prev?.images?.filter((item) => item.name !== name) }))
        }
    }
    useEffect(() => {
        reset({
            title: editProduct?.title || '',
            price: editProduct?.price || 0,
            quantity: editProduct?.quantity || 0,
            color: editProduct?.color || '',
            category: editProduct?.category || '',
            brand: editProduct?.brand || '',
        })
        setPayload({ description: editProduct?.description[0] })
        setPreview({
            thumb: editProduct?.thumb || '',
            images: editProduct?.images || []
        })

    }, [editProduct])
    useEffect(() => {
        if (watch('thumb') instanceof FileList && watch('thumb').length > 0) handlePreviewThumb(watch('thumb')[0])
    }, [watch('thumb')])
    useEffect(() => {
        if (watch('images') instanceof FileList && watch('images').length > 0) handlePreviewImages(watch('images'))
    }, [watch('images')])
    const handleUpdateProduct = async (data) => {
        if (data.category) {
            data.category = categories?.find((item) => item.title === data.category)?.title;
        }

        const finalProductData = { ...data, ...payload };
        const formData = new FormData();
        for (let i of Object.entries(finalProductData)) {
            if (i[1] instanceof FileList) {
                Array.from(i[1]).forEach((file) => {
                    formData.append(i[0], file);
                });
            } else {

                formData.append(i[0], i[1]);
            }
        }
        dispatch(showModal({ isShowModal: true, modalChildren: <Loading></Loading> }))
        const response = await apiUpdateProduct(formData, editProduct?._id);

        if (response.success) {
            dispatch(showModal({ isShowModal: false, modalChildren: null }))

            toast.success('Update product successfully!');
            reset();
            setEditProduct(null)
            setPreview({
                thumb: null,
                images: [],
            });
            setPayload({
                description: '',
            });
            render()
        } else {
            toast.error('Create a new product failed!');
        }
    };


    return (
        <div className='w-full flex flex-col gap-4 relative'>
            <h1 className='h-[75px] flex justify-between items-center' >
                <span className='text-2xl font-bold'>Update product</span>
                <div className='p-5'>
                    <Button style={`bg-red-500 w-[250px]`} handleOnClick={() => setEditProduct(null)}>Back to manage products</Button>
                </div>
            </h1 >

            <div className='p-4'>
                <form onSubmit={handleSubmit(handleUpdateProduct)}>
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
                            <Select id={'category'} register={register} label={'Category Product'} errors={errors} className={'w-[300px]'} validate={{ required: 'Category is required !' }} option={categories && categories?.map((item) => ({ code: item?.title, value: item?.title }))}></Select>
                            {/* brand */}
                            <Select id={'brand'} register={register} label={'Brand Product'} errors={errors} validate={{ required: 'Brand is required !' }} className={'w-[300px]'} option={categories && categories.find((item) => item.title === watch('category'))?.brand.map((el) => ({ code: el, value: el }))}></Select>
                        </div>
                    </div>
                    <div className='mt-8'>
                        <MarkdownEditor name='description' changeValue={changeValue} label={'Description'} value={payload?.description} invalidFields={invalidFields} setInvalidFields={setInvalidFields} setEditMarkdown={setEditMarkdown}  ></MarkdownEditor>
                    </div>
                    {/* thumb */}
                    <div className='mt-8 flex flex-col gap-y-3'>
                        <label htmlFor="thumb" className='font-semibold'>Upload thumbnail</label>
                        <input type="file" id='thumb' {...register("thumb")} />
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
                        <Button style={'bg-main'} type={'submit'}>Update product</Button>
                    </div>
                </form>

            </div>
        </div>
    );
};
UpdateProduct.propTypes = {
    editProduct: PropTypes.any,
    setEditProduct: PropTypes.any,
    render: PropTypes.any
}
export default memo(UpdateProduct);
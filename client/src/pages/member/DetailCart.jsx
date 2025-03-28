import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { formatMoney, formatPrice } from '../../utils/helper';
import { CiTrash } from 'react-icons/ci';
import { apiRemoveCart, apiUpdateCart } from '../../apis/user';
import { toast } from 'react-toastify';
import { getCurrent } from '../../store/user/asyncAction';
import Button from '../../components/Button/Button';
import { useNavigate } from 'react-router-dom';
import path from '../../utils/path';

const DetailCart = () => {
    const navigate = useNavigate();
    const { current } = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const updateCart = async (pid, color) => {
        const response = await apiRemoveCart({ pid, color })
        if (response.success) {
            toast.success('Remove product from cart !')
            dispatch(getCurrent())
        }
        else toast.error('Add product to cart failed !')
    }
    return (
        <div className='w-main'>
            <h3 className='text-2xl font-bold tracking-tight my-8  w-main'>My Cart</h3>
            {current?.cart?.map((item) => (
                <div key={item?._id} className='flex p-2 w-[500px] items-center justify-between border border-gray-300 mt-4 rounded-md'>
                    <div className='flex gap-x-5'>
                        <div onClick={() => navigate(`/${item?.category}/${item?.product?._id}/${item?.product?.title}`)}>
                            <img src={item?.thumbnail || item?.product?.thumb} alt="thumbnail" className='w-[100px] h-[100px] object-cover cursor-pointer' />
                        </div>
                        <div className='flex flex-col gap-1 '>
                            <span className='font-semibold hover:text-main cursor-pointer' onClick={() => navigate(`/${item?.category}/${item?.product?._id}/${item?.product?.title}`)}>
                                {item?.title || item?.product?.title}
                            </span>
                            <span>Color : {item?.color}</span>
                            <span className=''>Price : <span className='text-main font-semibold'>
                                {formatMoney(item?.price || item?.product?.price)} VNĐ</span></span>
                            <div className='flex gap-x-3 items-center'>
                                <span>Quantity  : </span>
                                <span>
                                    {item?.quantity}
                                </span>
                            </div>
                        </div>
                    </div>
                    <span className='cursor-pointer text-red-500 flex items-center justify-center' onClick={() => updateCart(item?.product?._id, item?.color)}>
                        <CiTrash size={28} ></CiTrash>
                    </span>
                </div>
            ))}
            <div className='flex  justify-end ml-10 p-5 mx-auto'>
                <div className='flex flex-col gap-y-4'>
                    <div className='flex gap-x-2 text-main text-base font-bold'>
                        <span className='text-black font-semibold'>Subtotal : </span>
                        <span>{formatMoney(formatPrice(current?.cart?.reduce((sum, item) => sum + Number(item?.price || item?.product?.price) * Number(item?.quantity), 0)))} VNĐ</span>
                    </div>
                    <div>
                        <Button style={`bg-red-500 w-[200px]`} handleOnClick={() => navigate(`/${path.CHECKOUT}`)}>Check out</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailCart;
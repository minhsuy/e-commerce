import React from 'react';
import { icons } from '../utils/icons';
import { showCart } from '../store/app/appSlice';
import { useDispatch, useSelector } from 'react-redux';
import { formatMoney, formatPrice } from '../utils/helper';
import Button from '../components/Button/Button';
import { apiRemoveCart } from '../apis/user';
import { toast } from 'react-toastify';
import { getCurrent } from '../store/user/asyncAction';
import { useNavigate } from 'react-router-dom';
import path from '../utils/path';
const { IoIosCloseCircleOutline, CiTrash } = icons
const Cart = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { current } = useSelector((state) => state.user)
    const updateCart = async (pid, color) => {
        const response = await apiRemoveCart({ pid, color })
        if (response.success) {
            toast.success('Remove product from cart !')
            dispatch(getCurrent())
        }
        else toast.error('Add product to cart failed !')
    }
    const handleGetDetailProduct = (item) => {
        navigate(`/${item?.category}/${item?.product?._id}/${item?.product?.title}`)
        dispatch(showCart({ signal: false }))
    }
    return (
        <div className={`w-[400px] ${current?.cart?.length > 5 ? "h-full" : 'h-screen'} overflow-hidden bg-gray-900 text-white p-2 flex flex-col`} onClick={(e) => e.stopPropagation()}>
            <header className='border-b border-gray-300 font-bold text-2xl flex items-center justify-between row-span-1 h-full'>
                <span>Your Cart</span>
                <span className='cursor-pointer p-2  text-red-500' onClick={() => dispatch(showCart({ signal: false }))}>
                    <IoIosCloseCircleOutline size={30} ></IoIosCloseCircleOutline>
                </span>
            </header>
            {current?.cart?.length === 0 && <span className='text-main font-bold text-2xl'>Your cart is empty</span>}
            {current?.cart?.length > 0 &&
                <>
                    <section className='row-span-6 h-auto flex flex-col gap-y-5 mt-3 '>
                        {current?.cart?.map((item) => (
                            <div key={item?._id} className='flex gap-4   p-1 relative border-b' >
                                <img src={item?.thumbnail || item?.product?.thumb} alt="thumbnail" className='w-[50px] h-[50px] object-cover' />
                                <div className='flex flex-col gap-1 '>
                                    <span className='font-semibold hover:text-main cursor-pointer' onClick={() => handleGetDetailProduct(item)}>
                                        {item?.title || item?.product?.title}
                                    </span>
                                    <span> {item?.color}</span>
                                    <span>Quantity : {item?.quantity}</span>
                                    <span className=''>{formatMoney(item?.price || item?.product?.price)} VNĐ</span>
                                    <span className='absolute right-2 top-4  cursor-pointer text-red-500' onClick={() => updateCart(item?.product?._id, item?.color)}>
                                        <CiTrash size={28}></CiTrash>
                                    </span>
                                </div>
                            </div>
                        ))}
                    </section>
                    <div className='row-span-3 h-full max-h-full overflow-y-auto mt-5 '>
                        <div className='font-bold text-main text-base text-center' >
                            <span>Subtotal : </span>
                            <span>{formatMoney(formatPrice(current?.cart?.reduce((sum, item) => sum + Number(item?.price || item?.product?.price) * Number(item?.quantity), 0)))}</span>
                        </div>
                        <div className='mt-4 p-3'>
                            <Button style={'bg-main w-full'}
                                handleOnClick={() => {
                                    navigate(`/${path.MEMBER}/${path.DETAIL_CART}`)
                                    dispatch(showCart({ signal: false }))
                                }}
                            >Shopping cart</Button>
                        </div>
                    </div>
                </>}
        </div >
    );
};

export default Cart;
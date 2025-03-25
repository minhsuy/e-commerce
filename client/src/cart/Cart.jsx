import React from 'react';
import { icons } from '../utils/icons';
import { showCart } from '../store/app/appSlice';
import { useDispatch, useSelector } from 'react-redux';
import { formatMoney } from '../utils/helper';

const { IoIosCloseCircleOutline } = icons
const Cart = () => {
    const dispatch = useDispatch()
    const { current } = useSelector((state) => state.user)
    return (
        <div className='w-[400px] h-screen overflow-hidden bg-slate-800 text-white p-6 grid grid-rows-10' onClick={(e) => e.stopPropagation()}>
            <header className='border-b border-gray-300 font-bold text-2xl flex items-center justify-between row-span-1 h-full'>
                <span>Your Cart</span>
                <span className='cursor-pointer p-2  text-red-500' onClick={() => dispatch(showCart({ signal: false }))}>
                    <IoIosCloseCircleOutline size={30}  ></IoIosCloseCircleOutline>
                </span>
            </header>
            {current?.cart?.length === 0 && <span className='text-main font-bold text-2xl'>Your cart is empty</span>}
            {current?.cart?.length > 0 &&
                <>
                    <section className='row-span-6 h-auto flex flex-col gap-y-5 mt-3 '>
                        {current?.cart?.map((item) => (
                            <div key={item?._id} className='flex gap-4  rounded-md p-1'>
                                <img src={item?.product?.thumb} alt="thumbnail" className='w-[50px] h-[50px] object-cover' />
                                <div className='flex flex-col gap-1'>
                                    <span className='font-semibold'>
                                        {item?.product?.title}
                                    </span>
                                    <span> {item?.color}</span>
                                    <span className='text-main'>{formatMoney(item?.product?.price)} VNĐ</span>
                                </div>
                            </div>
                        ))}
                    </section>
                    <div className='row-span-3 h-full max-h-full overflow-y-auto'>
                        Checkout
                    </div>
                </>
            }
        </div>
    );
};

export default Cart;
import React, { useCallback, useEffect, useState } from 'react';
// import payment from '../../assets/online-shopping-payment.png'
import payment from '../../assets/payment2.webp'
import { useDispatch, useSelector } from 'react-redux'
import { formatMoney } from '../../utils/helper';
import Paypal from '../../components/common/Paypal';
import Logo from '../../assets/logo.png'
import { Link } from 'react-router-dom';
import path from '../../utils/path';
import { useForm } from 'react-hook-form';
import InputForms from '../../components/Inputs/InputForms';
import Congrat from '../../components/common/Congrat';
import { getCurrent } from '../../store/user/asyncAction'
const Checkout = () => {
    const { cart } = useSelector((state) => state.user.current)
    const dispatch = useDispatch()
    const { current } = useSelector((state) => state.user)
    const [value, setValue] = useState('')
    const [isSuccess, setIsSuccess] = useState(false)
    const handleGetValue = useCallback((v) => {
        setValue(v)
    }, [value])
    useEffect(() => {
        dispatch(getCurrent())
    }, [isSuccess])
    return (
        <div className='p-8 gap-6 w-full h-full max-h-screen overflow-y-auto grid grid-cols-10'>
            {isSuccess && <Congrat ></Congrat>}
            <div className='w-full h-[800px] flex flex-col justify-center items-center col-span-4 gap-y-6'>
                <Link to={`/${path.HOME}`}>
                    <img src={Logo} alt="" /></Link>
                <img src={payment} alt="payment" className='h-[80%] w-[80%] object-contain' />
            </div>
            <div className='flex w-full flex-col items-center gap-y-6 col-span-6'>
                <h1 className='h-[75px] flex justify-between items-center' >
                    <span className='text-2xl font-bold text-main'>Checkout your order</span>
                </h1 >
                <table className='table-auto w-full border border-gray-300 rounded-md'>
                    <thead>
                        <tr className='border bg-gray-200 p-2 rounded-md'>
                            <th className='text-center p-2'>Product</th>
                            <th className='text-center p-2'>Quantity</th>
                            <th className='text-center p-2'>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart?.map((item) => (
                            <tr key={item._id}>
                                <td className='text-center p-2'>{item.title || item?.product?.title}</td>
                                <td className='text-center p-2'>{item.quantity}</td>
                                <td className='text-center p-2'>{formatMoney((item?.price || item?.product?.price) * item?.quantity)} VNĐ</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className='w-full flex justify-between mt-4 text-base font-bold gap-x-2 items-center'>
                    <div className=' items-center gap-x-2 font-bold w-full flex justify-start'>
                        <input type="text" placeholder='Enter your  address' className='px-4 py-2 rounded-md border border-gray-300 focus:border-main outline-none w-full' onChange={(e) => handleGetValue(e.target.value)} />
                    </div>
                    <div className=' gap-x-2 font-medium w-full flex justify-end'>
                        <span>Subtotal : </span>
                        <span className='text-main'>{formatMoney(cart?.reduce((sum, item) => sum + item?.quantity * (item?.price || item?.product?.price), 0))} VNĐ</span>
                    </div>
                </div>
                {value && <div className='w-[50%] mt-10 content-center'>
                    <Paypal setIsSuccess={setIsSuccess} payload={{
                        products: cart,
                        total: Math.ceil(cart?.reduce((sum, item) => sum + item?.quantity * (item?.price || item?.product?.price), 0) / 23500),
                        orderBy: current?._id,
                        address: value
                    }} amount={Math.ceil(cart?.reduce((sum, item) => sum + item?.quantity * (item?.price || item?.product?.price), 0) / 23500)}></Paypal>
                </div>}
            </div>
        </div >
    );
};

export default Checkout;


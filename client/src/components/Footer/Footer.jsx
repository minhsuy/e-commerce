import React, { memo } from 'react';
import { icons } from '../../utils/icons';
const Footer = () => {
    const { MdEmail } = icons
    return (
        <div className='w-full  mt-8'>
            <div className='h-[103px] bg-main w-full flex items-center justify-center'>
                <div className='w-main flex items-center justify-between'>
                    <div className='flex flex-col flex-1'>
                        <span className='text-[24px] font-serif text-gray-100'>Sign up to Newsletter</span>
                        <small className='text-[15px] text-gray-300'>Subscribe now and receive weekly newsletter</small>
                    </div>
                    <div className='flex-1 flex items-center'>
                        <input type="text" className='p-4 w-full text-white  rounded-l-full outline-none flex-1 bg-[#F04646] placeholder:text-gray-300 placeholder:italic placeholder:opacity-50' placeholder='Email address' />
                        <div className='h-[56px] w-[56px] bg-[#F04646] rounded-r-full flex items-center justify-center'><MdEmail size={20} color='white'></MdEmail></div>
                    </div>
                </div>
            </div>
            <div className='h-[407px] bg-[#191919] w-full flex items-center justify-center'>
                <div className='w-main flex  text-white' >
                    <div className='flex-2 flex flex-col gap-y-3'>
                        <h3 className='mb-5 text-base  border-l-2 border-main pl-[15px] font-bold'>ABOUT US</h3>
                        <span>
                            <span>Address :</span>
                            <span className='opacity-50'> 474 Ontario St Toronto, ON M4X 1M7 Canada</span>
                        </span>
                        <span>
                            <span>Phone :</span>
                            <span className='opacity-50' >  (+8435)7462426</span>
                        </span>
                        <span>
                            <span>Mail :</span>
                            <span className='opacity-50'> tadathemes@gmail.com</span>
                        </span>
                    </div >
                    <div className='flex-1 flex flex-col gap-2'>
                        <h3 className='mb-5 text-base  border-l-2 border-main pl-[15px] font-bold'>INFOMATION</h3>
                        <span className='opacity-50'>Typography</span>
                        <span className='opacity-50'>Gallery</span>
                        <span className='opacity-50'>Store Location</span>
                        <span className='opacity-50'>Today Deals</span>
                        <span className='opacity-50'>Contact</span>
                    </div >
                    <div className='flex-1 flex flex-col gap-2'>
                        <h3 className='mb-5 text-base  border-l-2 border-main pl-[15px] font-bold'>WHO WE ARE</h3>
                        <span className='opacity-50'>Help</span>
                        <span className='opacity-50'>Free Shipping</span>
                        <span className='opacity-50'>FAQs</span>
                        <span className='opacity-50'>Today Deals</span>
                        <span className='opacity-50'>Return & Exchange</span>
                    </div >
                    <div className='flex-1 flex flex-col gap-2'>
                        <h3 className='mb-5 text-base  border-l-2 border-main pl-[15px] font-bold'>#DigitalWorldStore</h3>

                    </div >
                </div>
            </div>
        </div>
    );
};

export default memo(Footer);
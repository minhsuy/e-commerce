import React from 'react';
import logo from '../assets/logo.png'
import { icons } from "../utils/icons"
import { Link } from 'react-router-dom';
import path from '../utils/path'
const Header = () => {
    const { FaPhoneAlt, MdEmail, FaShoppingCart, FaUserCircle, AiOutlineUser, IoBagHandleSharp } = icons
    return (
        <div className='w-main h-[110px] py-[35px] flex justify-between' >
            <Link to={`/${path.HOME}`}>
                <img src={logo} alt="logo" className='w-[234px object-contain'
                /></Link>
            <div className='flex text-[14px]'>
                <div className='flex flex-col items-center gap-y-2 px-6 border-r'>
                    <span className='flex gap-x-4 items-center'>
                        <FaPhoneAlt className='text-main'></FaPhoneAlt>
                        <span className='font-semibold'>(+8435) 746 2426</span>
                    </span>
                    <span>Mon-Sat 9:00AM - 8:00PM</span>
                </div>
                <div className='flex flex-col items-center gap-y-2 px-6 border-r'>
                    <span className='flex gap-x-4 items-center'>
                        <MdEmail className='text-main'></MdEmail>
                        <span className='font-semibold'> thaiminh0612@gmail.com</span>
                    </span>
                    <span>Online Support 24/7</span>
                </div>
                <div className='flex items-center justify-center gap-2 px-6 border-r '>
                    <IoBagHandleSharp className='text-main text-xl'></IoBagHandleSharp>
                    <span>0 item(s)</span>
                </div>
                <div className='flex items-center justify-center px-6'><FaUserCircle className='text-3xl text-gray-500'></FaUserCircle></div>
            </div>
        </div>
    );
};

export default Header;
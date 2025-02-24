import React from 'react';
import { Link } from 'react-router-dom';
import path from '../utils/path';
const TopHeader = () => {
    return (
        <div className='h-[38px] w-full bg-main flex items-center justify-center'>
            <div className='w-main flex items-center justify-between text-sm text-white'>
                <span>
                    ORDER ONLINE OR CALL US (+8435) 746 2426
                </span>
                <Link to={`/${path.LOGIN}`} className='hover:text-black transition-all'>Sign In or Create Account</Link>
            </div>
        </div>
    );
};

export default TopHeader;
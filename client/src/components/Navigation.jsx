import React from 'react';
import { navigation } from '../utils/constant'
import { NavLink } from 'react-router-dom';
const Navigation = () => {
    return (
        <div className=' w-main h-[48px] py-2 text-sm flex items-center justify-between border border-gray-200 rounded-md px-3 mb-12 mt-8'>
            <div>
                {navigation.map((item) =>
                (
                    <NavLink to={item.path}
                        key={item.id} className={({ isActive }) => isActive ? "pr-12 text-main hover:text-main" : "pr-12 hover:text-main"}>{item.value}</NavLink>
                )
                )}
            </div>
            <div >
                <input type="text" placeholder='Search something ...' className='outline-none text-base' />
            </div>
        </div>
    );
};

export default Navigation;
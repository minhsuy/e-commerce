import React, { memo, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom'
import { apiGetCategories } from '../../apis/app'
import { createSlug } from '../../utils/helper'
import { useSelector } from 'react-redux'

const Sidebar = () => {

    const { categories } = useSelector((state) => state.app)
    return (
        <div className='flex flex-col border border-gray-200 rounded-md z-50'>
            {categories && categories.map((item) => (
                <NavLink key={item._id} to={createSlug(item.title)} className={({ isActive }) => isActive ? 'bg-main text-white hover:text-main px-5 pt-[15px] pb-[14px] text-base' : 'hover:text-main px-5 pt-[15px] pb-[14px] text-base'}>{item.title}</NavLink>
            ))}
        </div>
    );
};

export default memo(Sidebar);

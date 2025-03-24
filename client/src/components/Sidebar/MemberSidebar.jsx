import React, { Fragment, memo, useState } from 'react';
import { icons } from '../../utils/icons';
import logo from '../../assets/logo.png'
import { memberSidebar } from '../../utils/extraInfomation'
import { Link, NavLink } from 'react-router-dom';
const { IoIosArrowDown, IoIosArrowUp } = icons
import { useSelector } from 'react-redux';
const MemberSidebar = () => {
    const { current } = useSelector((state) => state.user)
    const [active, setActive] = useState([])
    const handleShowTabs = (tabs) => {
        const alreadyClick = active.some((item) => item === tabs)
        if (alreadyClick) setActive(prev => prev.filter(item => item !== tabs))
        else setActive((prev) => [...prev, tabs])
    }
    return (
        <div className='py-4 h-full bg-slate-100 p-3 '>
            <div className='flex flex-col items-center justify-center gap-2'>
                <Link to={`/`}>
                    <img src={logo} alt="logo" className='w-[200px] object-contain' />
                </Link>
                <span className='text-base font-medium mt-4'>User WorkSpace</span>
            </div>
            <div className='flex flex-col gap-y-3 mt-10'>
                {memberSidebar && memberSidebar.map((item) => (
                    <Fragment key={item.id}>
                        {item.type === 'SINGLE' && <NavLink to={item.path} className={({ isActive }) => isActive ? 'flex items-center gap-x-4 p-2 rounded-sm bg-blue-500 text-white' : 'flex items-center gap-x-4 p-2 rounded-sm hover:bg-blue-500 hover:text-white'}  >
                            <span>{item.icon}</span>
                            <span>{item.text}</span>
                        </NavLink>}
                        {item.type === 'PARENT' && <div className=''>
                            <div className='flex items-center justify-between gap-x-4 hover:bg-blue-500 hover:text-white p-2 rounded-sm cursor-pointer' onClick={() => handleShowTabs(+item.id)}>
                                <div className='flex items-center justify-center gap-x-4' >
                                    <span>{item.icon}</span>
                                    <span>{item.text}</span>
                                </div>
                                {active.some((i) => i === item.id) ? <IoIosArrowUp></IoIosArrowUp> : <IoIosArrowDown></IoIosArrowDown>}
                            </div>
                            {active.some((i) => i === item.id) && <div className='flex flex-col px-8 py-2 gap-y-2'>
                                {item?.submenu?.map((el, index) => (
                                    <NavLink key={index} to={el.path} className={({ isActive }) => isActive ? 'flex items-center gap-x-4 p-2 rounded-sm bg-blue-500 text-white' : 'flex items-center gap-x-4 p-2 rounded-sm hover:bg-blue-500 hover:text-white'}>{el.text}</NavLink>
                                ))}
                            </div>}

                        </div>}
                    </Fragment>
                ))}
            </div>
        </div>
    );
};

export default memo(MemberSidebar);
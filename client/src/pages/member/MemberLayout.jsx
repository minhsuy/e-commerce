import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import path from '../../utils/path';
import { useSelector } from 'react-redux';
import MemberSidebar from '../../components/Sidebar/MemberSidebar';
const MemberLayout = () => {
    const { isLoggedIn, current } = useSelector((state) => state.user)
    if (!isLoggedIn || !current) return <Navigate to={`/${path.LOGIN}`} replace={true}></Navigate>
    return (
        <div className='flex w-full relative'>
            <div className='w-[300px] fixed top-0 bottom-0 '>
                <MemberSidebar></MemberSidebar>
            </div>
            <div className='w-[327px]'></div>
            <div className='flex-auto'>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default MemberLayout;
import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import path from '../../utils/path';
import { useSelector } from 'react-redux';
import AdminSideBar from '../../components/Sidebar/AdminSideBar';
import Pagination from '../../components/Pagination/Pagination';
const AdminLayout = () => {
    const { isLoggedIn, current, role } = useSelector((state) => state.user)
    if (!isLoggedIn || !current || current.role !== '0') {
        return <Navigate to={`/${path.LOGIN}`} replace={true}></Navigate>
    }
    return (
        <div className='flex w-full relative'>
            <div className='w-[300px] fixed top-0 bottom-0 '>
                <AdminSideBar></AdminSideBar>
            </div>
            <div className='w-[327px]'></div>
            <div className='flex-auto'>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default AdminLayout;
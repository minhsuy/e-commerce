import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import path from '../utils/path';
import { useDispatch, useSelector } from 'react-redux'
import { getCurrent } from '../store/user/asyncAction'
import { icons } from '../utils/icons'
import { logout } from '../store/user/userSlice'
import Swal from 'sweetalert2'
import { toast } from 'react-toastify';
import { clearMessage } from '../store/user/userSlice'
import { useNavigate } from 'react-router-dom';
const TopHeader = () => {
    const navigate = useNavigate()
    const { MdOutlineLogin } = icons
    const dispatch = useDispatch()
    const { isLoggedIn, current, mes } = useSelector(state => state.user)
    const state = useSelector(state => state.user)
    useEffect(() => {
        if (isLoggedIn) dispatch(getCurrent())
    }, [dispatch, isLoggedIn])
    const handleLogOut = () => {
        Swal.fire({ title: 'Logout', text: "Bạn có muốn đăng xuất ? ", icon: 'warning' }).then((result) => {
            if (result.isConfirmed) dispatch(logout())
        })
    }
    useEffect(() => {
        if (mes) Swal.fire({ title: 'Đăng nhập lại ? ', text: "Phiên đăng nhập đã hết hạn ? ", icon: 'warning' }).then((result) => {
            if (result.isConfirmed) {
                dispatch(clearMessage())
                navigate(`/${path.LOGIN}`)
            }
        })
    }, [mes])

    return (
        <div className='h-[38px] w-full bg-main flex items-center justify-center'>
            <div className='w-main flex items-center justify-between text-sm text-white'>
                <span>
                    ORDER ONLINE OR CALL US (+8435) 746 2426
                </span>
                {isLoggedIn && current ? <div className='flex items-center justify-center gap-x-5'>
                    <span>Welcome, {current.firstname} {current.lastname}</span>
                    <span onClick={handleLogOut} className='cursor-pointer'>
                        <MdOutlineLogin className='text-xl cursor-pointer'></MdOutlineLogin>
                    </span>
                </div> : <Link to={`/${path.LOGIN}`} className='hover:text-gray-800 transition-all'>Đăng nhập hoặc đăng ký tài khoản </Link>}

            </div>
        </div>
    );
};

export default TopHeader;
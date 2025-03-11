import React, { memo, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import path from '../../utils/path';
const FinalRegister = () => {
    const navigate = useNavigate()
    const { status } = useParams()
    console.log(status)
    useEffect(() => {
        if (status === 'success') {
            Swal.fire({ title: 'Congratulation!', text: "Đăng ký tài khỏan thành công!", icon: 'success' })
            navigate(`/${path.LOGIN}`)
        }
        else {
            Swal.fire({ title: 'OPPS!', text: "Đăng ký tài khỏan thất bại!", icon: 'error' })
            navigate(`/${path.LOGIN}`)
        }
    }, [])
    return (
        <div>
            Final
        </div>
    );
};

export default memo(FinalRegister);
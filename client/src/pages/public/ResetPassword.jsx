import React, { memo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { apiResetPassword } from '../../apis/user';
import Swal from 'sweetalert2';
import path from '../../utils/path';
import Button from '../../components/Button/Button';
const ResetPassword = () => {
    const { token } = useParams()
    const navigate = useNavigate()
    const [password, setPassword] = useState('')
    const handleResetPassword = async () => {
        const response = await apiResetPassword({ password, token })
        if (response.success) {
            Swal.fire({ title: 'CONGRATULATION !', text: response.message, icon: 'success' }).then(() => {
                navigate(`/${path.LOGIN}`)
            })
        }
        else {
            Swal.fire({ title: 'OPPS !', text: 'Token đã hết hạn !', icon: 'error' }).then(() => {
                navigate(`/${path.LOGIN}`)
            })
        }
    }
    return (
        <div className='absolute inset-0 bg-white flex justify-center py-8 z-50'>
            <div className='flex flex-col gap-y-3'>
                <span className=' font-bold text-base'>Nhập password mới</span>
                <input placeholder='Enter your passwword' type="password" className=' py-2 px-4 w-[280px] pb-2 rounded-md border-b outline-none focus:border focus:border-gray-400' value={password} onChange={(e) => setPassword(e.target.value)} />
                <div className='flex justify-end w-[800px] gap-x-6'>
                    <Button type={'button'} style={'w-[120px] bg-green-500'} handleOnClick={handleResetPassword}>Submit</Button>
                </div>

            </div>
        </div>
    );
};

export default memo(ResetPassword);
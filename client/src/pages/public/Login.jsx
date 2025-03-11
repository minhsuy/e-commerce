import React, { memo, useCallback, useEffect, useState } from 'react';
import logImage from '../../assets/login.jpg'
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import InputField from '../../components/InputField';
import Button from '../../components/Button';
import { apiRegister, apiLogin, apiForgotPassword } from '../../apis/user';
import path from '../../utils/path'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../../store/user/userSlice';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Swal from 'sweetalert2'
import { toast } from 'react-toastify'
import { validate } from '../../utils/helper';


const Login = () => {


    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [payload, setPayload] = useState({
        email: '',
        password: '',
        firstname: '',
        lastname: '',
        mobile: ''
    })
    const [invalidFields, setInvalidFields] = useState([])
    const [email, setEmail] = useState('')
    const [isForgotPassword, setIsForgotPassword] = useState(false)
    const [isRegister, setIsRegister] = useState(false)
    const resetPayload = () => {
        setPayload({
            email: "",
            password: "",
            firstname: "",
            lastname: "",
            mobile: ""
        })
    }

    useEffect(() => {
        resetPayload()
    }, [isRegister])

    // authentication
    const handleAuth = useCallback(async () => {
        const { firstname, lastname, mobile, ...data } = payload
        const validateAuth = isRegister ? validate(payload, setInvalidFields) : validate(data, setInvalidFields)
        // register
        if (validateAuth === 0) {
            if (isRegister) {
                const response = await apiRegister(payload)
                if (response.success === true) {
                    Swal.fire({ title: 'Register successfully', text: response.message, icon: 'success' }).then(() => {
                        resetPayload()
                        setIsRegister(false)
                    })

                }
                else {
                    Swal.fire({ title: 'Register failed', text: response.message, icon: 'error' }).then(() =>
                        setIsRegister(false))
                }

            }
            // login
            else {
                const result = await apiLogin(data)
                if (result.userData) {
                    Swal.fire({ icon: 'success', title: "Login successfully", text: result.message }).then(() => {
                        dispatch(login({ isLoggedIn: true, token: result.accessToken, userData: result.userData }))
                        navigate(`/${path.HOME}`)
                    })

                }
                else {
                    Swal.fire({ title: 'Login failed', text: result.message, icon: 'error' })
                }
            }
        }


    }, [payload, isRegister, dispatch, navigate])
    const handleForgotPassword = useCallback(async () => {
        const response = await apiForgotPassword({ email })

        if (response.success) {
            Swal.fire({ title: 'CONGRATULATION !', text: response.message, icon: 'success' })
        }
        else {
            Swal.fire({ title: 'OPPS !', text: response.message, icon: 'error' })
        }
    }, [email])
    return (
        <div className='w-screen h-screen relative'>
            {isForgotPassword && <div className='absolute inset-0 bg-white flex justify-center py-8 z-50'>
                <div className='flex flex-col gap-y-3'>
                    <span className=' font-bold text-base'>Nhập email của bạn vào</span>
                    <input placeholder='Enter your email' type="email" className=' py-2 px-4 w-[280px] pb-2 rounded-md border-b outline-none focus:border focus:border-gray-400' value={email} onChange={(e) => setEmail(e.target.value)} />
                    <div className='flex justify-end w-[800px] gap-x-6'>
                        <Button type={'button'} style={'w-[120px] bg-green-500'} handleOnClick={handleForgotPassword}>Submit</Button>
                        <Button type={'button'} style={'w-[60px] bg-main'} handleOnClick={() => setIsForgotPassword(false)}>Back</Button>
                    </div>

                </div>
            </div>}
            <img src='https://plus.unsplash.com/premium_photo-1684785618727-378a3a5e91c5?q=80&w=1684&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' alt="login-image" className='w-full h-full object-cover' />
            <div className='absolute inset-0 flex items-center justify-center'>
                <div className='p-8 bg-white rounded-md min-w-[500px] flex flex-col gap-y-4'>
                    <div className='m-5'>
                        <Link to={`/${path.HOME}`}> <img src="../../src/assets/logo.png" className='w-[250px] mx-auto object-cover' /></Link>
                    </div>
                    <h1 className='text-2xl font-bold text-main text-center'>{isRegister ? "Đăng ký " : 'Đăng nhập'}</h1>
                    {/* firstname + lastname */}
                    {isRegister &&
                        <div className='flex flex-col   gap-y-4'>
                            <span>Firstname</span>
                            <InputField
                                setValue={setPayload}
                                placeholder={'Enter your firstname'}
                                name={'firstname'}
                                invalidFields={invalidFields}
                                value={payload.firstname}
                            />

                            <span>Lastname</span>
                            <InputField value={payload.lastname} setValue={setPayload} placeholder={'Enter your lastname'} name={'lastname'} invalidFields={invalidFields} setInvalidFields={setInvalidFields}></InputField>
                            <span>Mobile</span>
                            <InputField value={payload.mobile} setValue={setPayload} placeholder={'Enter your phone number'} name={'mobile'} invalidFields={invalidFields} setInvalidFields={setInvalidFields}></InputField>
                        </div>

                    }
                    {/* email */}
                    <span>Email address</span>
                    <InputField type={'email'} value={payload.email} setValue={setPayload} placeholder={'Enter your email address'} name={'email'} invalidFields={invalidFields} setInvalidFields={setInvalidFields}></InputField>
                    {/* password */}
                    <span>Password</span>
                    <InputField type={'password'} value={payload.password} setValue={setPayload} placeholder={'Enter your password'} name={'password'} invalidFields={invalidFields} setInvalidFields={setInvalidFields}></InputField>
                    {/* button */}
                    <Button style={' bg-main'} handleOnClick={handleAuth}>{isRegister ? 'Đăng ký' : 'Đăng nhập'} </Button>
                    <div className='flex items-center justify-between my-2 cursor-pointer'>
                        {!isRegister && <span onClick={() => setIsForgotPassword(true)} className='text-main '>Quên mật khẩu ?</span>}
                        {isRegister && <div>
                            <span className='text-main' onClick={() => setIsRegister(false)}>
                                Đăng nhập</span>
                        </div>}
                        {!isRegister && <span className='text-main ' onClick={() => setIsRegister(true)}>Tạo tài khoản mới</span>}
                    </div>

                </div>
            </div >
        </div >
    );
};

export default memo(Login);




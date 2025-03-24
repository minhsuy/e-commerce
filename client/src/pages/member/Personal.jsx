import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../components/Button/Button';
import InputForms from '../../components/Inputs/InputForms';
import moment from 'moment';
import { imageToBase64 } from '../../utils/helper'
import { apiUpdateCurrent } from '../../apis/user';
import { showModal } from '../../store/app/appSlice';
import { toast } from 'react-toastify';
import { getCurrent } from '../../store/user/asyncAction';
const Personal = () => {
    const dispatch = useDispatch()
    const { handleSubmit, formState: { errors }, register, reset, watch } = useForm()
    const { current } = useSelector((state) => state.user)
    const [avatar, setAvatar] = useState(null)
    useEffect(() => {
        reset({
            firstname: current?.firstname,
            lastname: current?.lastname,
            mobile: current?.mobile,
            email: current?.email,
            avatar: current?.avatar,
            description: current?.description,
        },)
    }, [current?.avatar, current?.description, current?.email, current?.firstname, current?.lastname, current?.mobile, reset])
    const handlePreviewAvatar = async (img) => {
        const dataImage = await imageToBase64(img);
        setAvatar(dataImage)
    }
    useEffect(() => {
        console.log(watch('avatar'))
        if (watch('avatar')?.length > 0) handlePreviewAvatar(watch('avatar')[0])
    }, [watch('avatar')])
    const handleUpdatePersonal = async (data) => {
        const formData = new FormData()
        if (data.avatar.length > 0) {
            formData.append('avatar', data.avatar[0])
        }
        delete data.avatar
        for (let i of Object.entries(data)) {
            formData.append(i[0], i[1])
        }
        const response = await apiUpdateCurrent(formData)
        if (response.success) {
            dispatch(getCurrent())
            toast.success('Update successfully !')
        }
        else {
            toast.error('Updated failed !')
        }
    }
    return (
        <div className='w-full relative'>
            <h1 className='h-[75px] flex justify-between items-center'>
                <span className='text-2xl font-bold'>Manage personal</span>
            </h1>
            <div className='w-full  flex items-center justify-between pl-10 mt-5'>
                <div className='flex  gap-x-4 items-center justify-between'>
                    <img src={current?.avatar} alt="avatar" className='w-[65px] h-[65px] rounded-full object-cover' />
                    <div className='flex flex-col gap-y-2'>
                        <span className='font-bold text-xl text-main'>{current?.firstname} {current?.lastname}</span>
                        <span className='text-base text-gray-700'>{current?.description}</span>
                        <div className='flex gap-x-2 mt-2'>
                            <span className='p-2 font-bold rounded-lg text-white bg-green-500'>User</span>
                            <span className='p-2 font-bold rounded-lg text-white bg-green-500'>{current?.isBlocked ? 'Blocked' : 'Active'}</span>
                        </div>
                        <span className='text-base text-gray-700'>Created at : {moment(current?.createdAt).format("DD/MM/YYYY HH:mm:ss")}</span>
                    </div>
                </div>

            </div>
            <form onSubmit={handleSubmit(handleUpdatePersonal)} className='flex flex-col gap-y-5 w-full pl-10 mt-8'>
                <div className='flex gap-y-4 flex-col'>
                    {/* firstname */}
                    <InputForms label={'Firstname'} register={register} errors={errors} placeholder={'First name'} id={'firstname'} className={`w-[450px] `} validate={{
                        required: 'Firstname is required'
                    }} ></InputForms>
                    {/* lastname */}
                    <InputForms label={'Lastname'} register={register} errors={errors} placeholder={'Last name'} id={'lastname'} className={`w-[450px] `} validate={{
                        required: 'Lastname is required'
                    }}></InputForms>
                    {/* email */}
                    <InputForms label={'Email address'} register={register} errors={errors} placeholder={'Email address'} id={'email'} className={`w-[450px] `} type='email' validate={{
                        required: 'Email is required'
                    }} ></InputForms>
                    {/* mobile */}
                    <InputForms label={'Phone number'} register={register} errors={errors} placeholder={'Phone number'} id={'mobile'} className={`w-[450px] `} type='number' validate={{
                        required: 'Phone number is required'
                    }} ></InputForms>
                    {/* avatar  */}
                    <span className='text-base font-semibold '>Avatar</span>
                    <label htmlFor="avatar" className='p-2 rounded-md border border-gray-300 w-[220px] flex flex-col gap-y-3 items-center'>
                        <img src={avatar || current?.avatar} alt="avatar" className='w-[100px] h-[100px] rounded-lg object-cover' />
                        <span className='text-base font-bold text-white p-2 bg-blue-500 rounded-md cursor-pointer'>Change Avatar</span>
                    </label>
                    <input type="file" id='avatar' {...register('avatar')} hidden />
                    {/* desc */}
                    <InputForms label={'Description'} register={register} errors={errors} placeholder={'Description'} id={'description'} className={`w-[450px] `} type='text' validate={{
                        required: 'Description is required'
                    }} ></InputForms>
                </div>
                <div className='mt-6'>
                    <Button style={'bg-main'} type={'submit'}>Update personal</Button>
                </div>
            </form>
        </div>
    );
};

export default Personal;
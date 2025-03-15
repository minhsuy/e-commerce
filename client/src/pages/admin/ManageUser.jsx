import React, { useCallback, useEffect, useState } from 'react';
import { apiDeleteUser, apiGetAllUsers, apiUpdateUser } from '../../apis/user'
import { icons } from '../../utils/icons';
import moment from 'moment'
import InputField from '../../components/Inputs/InputField';
import useDebounce from '../../hooks/useDebounce';
import { useForm } from 'react-hook-form';
import Select from '../../components/Inputs/Select';
import InputForms from '../../components/Inputs/InputForms';
import Button from '../../components/Button/Button';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
const ManageUser = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const { FaEdit, MdDelete } = icons
    const [users, setUsers] = useState(null)
    const [queries, setQueries] = useState({
        q: ''
    })
    const [editElement, setEditElement] = useState(null)
    const fetchAllUser = async (params) => {
        const response = await apiGetAllUsers({ ...params })
        if (response.success) setUsers(response)
    }
    const queriesDebounce = useDebounce(queries.q, 800)
    useEffect(() => {
        if (queriesDebounce !== '') fetchAllUser({ email: queriesDebounce })
        else {
            fetchAllUser()
        }
    }, [queriesDebounce])
    const handleUpdate = async (data) => {
        const response = await apiUpdateUser(data, editElement?._id)
        if (response.success) toast.success('Update user successfully !')
        else {
            toast.error(response.message)
        }
        setEditElement(null)
        fetchAllUser()
    }
    const handleDeleteUser = async (uid) => {
        console.log(uid)
        Swal.fire({ title: 'Are u sure ?', text: 'Delete user', icon: 'warning', showCancelButton: true }).then(async (result) => {
            if (result.isConfirmed) {
                const response = await apiDeleteUser(uid)
                if (response.success) {
                    toast.success('Delete user successfully !')
                    fetchAllUser()
                }
                else {
                    toast.error('Delete user failed !')
                }
            }
        })
    }
    return (
        <div className='w-full'>
            <h1 className='h-[75px] flex justify-between items-center'>
                <span className='text-xl font-semibold'>Manage user</span>
            </h1>
            <div className='w-full py-4'>
                <div className='flex justify-end py-4'>
                    <InputField placeholder={'Search by email'} name={'q'} value={queries.q} setValue={setQueries}></InputField>
                </div>
                <form action="" onSubmit={handleSubmit(handleUpdate)}>
                    {editElement && <div className='flex items-center justify-end mb-4 p-3 pr-6'>
                        <Button style={'w-[120px] bg-main'} type={'submit'}>Update</Button></div>}
                    <table className='table-auto mb-6 text-left w-full'>
                        <thead className='font-semibold bg-gray-700 text-[13px] border border-blue-300  text-white rounded-md'>
                            <tr>
                                <th className='px-4 py-2'>#</th>
                                <th className='px-4 py-2'>Email address</th>
                                <th className='px-4 py-2'>Firstname</th>
                                <th className='px-4 py-2'>Latsname</th>
                                <th className='px-4 py-2'>Role</th>
                                <th className='px-4 py-2'>Phone number</th>
                                <th className='px-4 py-2'>Status</th>
                                <th className='px-4 py-2'>Create At</th>
                                <th className='px-4 py-2'>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users?.data?.map((item, index) => (
                                <tr className='border border-gray-500' key={item._id}>
                                    <td className='py-2 px-4'>{index + 1}</td>
                                    {/* email */}
                                    <td className='py-2 px-4'> {editElement?._id === item?._id ? <InputForms validate={{
                                        required: 'Email is required', pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: "invalid email address"
                                        }
                                    }} placeholder={'Email'} id={'email'} value={editElement?.email} errors={errors} register={register}></InputForms> : <span>{item?.email} </span>}</td>
                                    {/* firstname */}
                                    <td className='py-2 px-4'> {editElement?._id === item?._id ? <InputForms validate={{ required: 'Firstname is required' }} register={register} placeholder={'Firstname'} id={'firstname'} value={editElement?.firstname} errors={errors}></InputForms> : <span>{item?.firstname} </span>}</td>
                                    {/* lastname */}
                                    <td className='py-2 px-4'> {editElement?._id === item?._id ? <InputForms register={register} validate={{ required: 'Lastname is required' }} placeholder={'Lastname'} id={'lastname'} value={editElement?.lastname} errors={errors}></InputForms> : <span>{item?.lastname} </span>}</td>
                                    <td className='py-2 px-4'>{editElement?._id === item?._id ? <Select></Select> : <span>{item?.role === '0' ? 'Admin' : 'User'}</span>}</td>

                                    {/* mobile */}

                                    <td className='py-2 px-4'> {editElement?._id === item?._id ? <InputForms register={register} validate={{
                                        required: 'Mobile is required',
                                        pattern: {
                                            value: /^[62|0]+\d{9}/gi,
                                            message: "invalid mobile number"
                                        }
                                    }} placeholder={'Mobile'} id={'mobile'} value={editElement?.mobile} errors={errors}></InputForms> : <span>{item?.mobile} </span>}</td>
                                    <td className='py-2 px-4'>{editElement?._id === item?._id ? <Select></Select> : <span>{item?.isBlocked ? 'Block' : 'Active'}</span>}</td>
                                    <td className=''>{moment(item?.createdAt).format("DD/MM/YYYY HH:mm:ss")}</td>


                                    <td className='flex gap-x-3 items-center cursor-pointer py-2'>

                                        {editElement?._id === item._id ? <span className='text-main hover:underline' onClick={() => setEditElement(null)}>Back</span> : <span className='text-main hover:underline' onClick={() => setEditElement(item)}>Edit</span>}
                                        <span className='text-main hover:underline' onClick={() => handleDeleteUser(item?._id)} >Delete</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </form>

            </div>

        </div>
    );
};

export default ManageUser;
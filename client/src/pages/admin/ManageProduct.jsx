import React, { useCallback, useEffect, useState } from 'react';
import InputForms from '../../components/Inputs/InputForms';
import { useForm } from 'react-hook-form';
import { apiDeleteProduct, apiGetProducts, apiUpdateProduct } from '../../apis/product';
import moment from 'moment';
import Pagination from '../../components/Pagination/Pagination';
import { useSearchParams, useParams, useNavigate, useLocation, createSearchParams } from 'react-router-dom';
import useDebounce from '../../hooks/useDebounce';
import { icons } from '../../utils/icons';
import UpdateProduct from './UpdateProduct';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import CustomizeVariants from '../../components/Products/CustomizeVariants';
const { CiTrash,
    CiEdit, FcAddDatabase } = icons
const ManageProduct = () => {
    const [editProduct, setEditProduct] = useState(null)
    const navigate = useNavigate()
    const location = useLocation()
    const [searchParams, setSearchParams] = useSearchParams()
    const [products, setProducts] = useState(null)
    const [counts, setCounts] = useState(null)
    const [value, setValue] = useState('')
    const { register, handleSubmit, reset, formState: { errors } } = useForm()
    const handleSearchProduct = (data) => {
        console.log(data)
    }
    const [customizeVariant, setCustomizeVariant] = useState(null)
    const [update, setUpdate] = useState(false)
    const render = useCallback(() => {
        setUpdate(!update)
    }, [update])

    const queryDebounce = useDebounce(value, 700)
    const fetchProduct = async (params) => {
        const response = await apiGetProducts(params);
        if (response.success) {
            setProducts(response.data)
            setCounts(response.counts)
        }
    }
    const handleDeleteProduct = (id) => {
        Swal.fire({ title: 'Are u sure ?', text: 'Delete this product', icon: 'warning', showCancelButton: true }).then(async (result) => {
            if (result.isConfirmed) {
                const response = await apiDeleteProduct(id)
                const params = Object.fromEntries([...searchParams])
                if (response.success) {
                    toast.success('Delete user successfully !')
                    render()
                    params.page = 1
                }
                else {
                    toast.error('Delete product failed !')
                }
            }
        })
    }
    useEffect(() => {
        const params = Object.fromEntries([...searchParams])
        if (queryDebounce !== '') {
            params.page = 1
            fetchProduct({ ...params, title: queryDebounce })
        }
        else fetchProduct(params)
    }, [searchParams, queryDebounce, update])
    return (
        <div className='w-full flex flex-col gap-4 relative'>
            {editProduct && <div className='absolute inset-0 min-h-screen bg-white z-50'>
                <UpdateProduct editProduct={editProduct} render={render} setEditProduct={setEditProduct}></UpdateProduct>
            </div>}
            {customizeVariant && <div className='absolute inset-0 min-h-screen bg-white z-50'>
                <CustomizeVariants render={render} customizeVariant={customizeVariant} setCustomizeVariant={setCustomizeVariant} ></CustomizeVariants>
            </div>}
            <h1 className='h-[75px] flex justify-between items-center' >
                <span className='text-2xl font-bold'>Manage products</span>
            </h1 >
            <div>
                <form onSubmit={handleSubmit(handleSearchProduct)}>
                    <div className='w-full flex justify-end pr-8'>
                        <input type="text" className='px-3 py-2 rounded-md outline-none border border-gray-300 w-[300px]' placeholder='Search product by title ...' onChange={(e) => setValue(e.target.value)} />
                    </div>
                </form>
            </div>
            <table className='table-auto text-main'>
                <thead >
                    <tr className='bg-main text-white rounded-md '>
                        <th>#</th>
                        <th>Thumb</th>
                        <th>Title</th>
                        <th>Brand</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Sold</th>
                        <th>Color</th>
                        <th>Ratings</th>
                        <th>Varriants</th>
                        <th>Created At</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {products?.map((item, index) => (
                        <tr key={item?._id} className='text-sm text-slate-900 font-semibold'>
                            <td className='font-bold text-green-500'>{index + 1}</td>
                            <td>
                                <img src={item?.thumb} alt="thumbnail" className='w-[40px] h-[40px] object-cover' />
                            </td>
                            <td className='py-2 px-4 text-center '>{item?.title}</td>
                            <td className='py-2 px-4 text-center'>{item?.brand}</td>
                            <td className='py-2 px-4 text-center'>{item?.category}</td>
                            <td className='py-2 px-4 text-center'>{item?.price}</td>
                            <td className='py-2 px-4 text-center'>{item?.quantity}</td>
                            <td className='py-2 px-4 text-center'>{item?.sold}</td>
                            <td className='py-2 px-4 text-center'>{item?.color}</td>
                            <td className='py-2 px-4 text-center'>{item?.totalRatings}</td>
                            <td className='py-2 px-4 text-center'>{item?.varriants?.length || 0}</td>
                            <td className='py-2 px-4 text-center'>{moment(item?.createdAt).format("DD/MM/YYYY HH:mm:ss")}</td>
                            <td className='flex gap-x-3 items-center cursor-pointer py-2'>
                                <span className='hover:underline text-red-500  text-2xl' onClick={() => handleDeleteProduct(item?._id)} ><CiTrash></CiTrash></span>
                                <span className='hover:underline text-blue-500 text-2xl ' onClick={() => setEditProduct(item)}><CiEdit></CiEdit></span>
                                <span className='hover:underline text-blue-500 text-2xl ' onClick={() => setCustomizeVariant(item)}><FcAddDatabase></FcAddDatabase></span>
                            </td>
                        </tr >
                    ))}
                </tbody >
            </table>
            <div className='w-full flex justify-end my-8'>
                <Pagination totalCount={counts} isShowProductCount={false}></Pagination>
            </div>
        </div>
    );
};

export default ManageProduct;
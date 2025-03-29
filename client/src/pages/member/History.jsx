import React, { useEffect, useState } from 'react';
import { apiGetOrder } from '../../apis/user';
import { useSelector } from 'react-redux';
import Pagination from '../../components/Pagination/Pagination';
import moment from 'moment';
import { formatMoney } from '../../utils/helper';

const History = () => {
    const [order, setOrder] = useState(null)
    const [counts, setCounts] = useState(null)
    const [value, setValue] = useState(null)
    const { current } = useSelector((state) => state.user)
    const fetchProduct = async (params) => {
        const response = await apiGetOrder(params);
        if (response.success) {
            setOrder(response.data)
            setCounts(response.counts)
        }
    }
    useEffect(() => {
        fetchProduct()
    }, [])

    return (
        <div className='w-main flex flex-col gap-4 relative'>
            <h1 className='h-[75px] flex justify-between items-center'>
                <span className='text-2xl font-bold'>Buy History</span>
            </h1>
            <table className='table-auto text-main'>
                <thead >
                    <tr className='bg-main text-white rounded-md '>
                        <th>#</th>
                        <th>Product</th>
                        <th>Status</th>
                        <th>Created At</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {order?.map((item, index) => (
                        <tr key={item?._id} className='text-sm text-slate-900 font-semibold border border-gray-300 p-2'>
                            <td className='font-bold text-green-500'>{index + 1}</td>
                            <td className='py-2 px-4 text-center'>
                                <div className='flex flex-col gap-y-4 border' >
                                    {item.products.map((item) => (
                                        <div className='flex gap-x-2 items-center' key={item._id}>
                                            <img src={item.thumbnail} alt="" className='w-[40px] h-[40px] object-cover' />
                                            <span>{item.title}</span>
                                        </div>
                                    ))}
                                </div>

                            </td>
                            <td className={`py-2 px-4 text-center ${item?.status === 'SUCCESS' ? 'text-green-500' : 'text-red-500'}`}>{item?.status}</td>
                            <td className='py-2 px-4 text-center'>{moment(item?.createdAt).format("DD/MM/YYYY HH:mm:ss")}</td>
                            <td className='py-2 px-4 text-center'>{formatMoney(item?.total * 23500)} VNĐ</td>
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

export default History;
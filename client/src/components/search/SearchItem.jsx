import React, { memo, useCallback, useEffect, useState } from 'react';
import PropTypes from "prop-types";
import { colors } from '../../utils/constant';
import { createSearchParams, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { apiGetProducts } from '../../apis/product';

import { formatMoney } from '../../utils/helper';
import { toast } from 'react-toastify'
import useDebounce from '../../hooks/useDebounce';
import { icons } from '../../utils/icons';
const SearchItem = ({ name, activeClick, changeActiveFilter, type = 'checkbox', category }) => {
    const { IoIosArrowDown } = icons
    const navigate = useNavigate()
    const [selected, setSelected] = useState([])
    const [price, setPrice] = useState({
        from: 0,
        to: 0
    })
    const [bestPrice, setBestPrice] = useState(null)
    const [searchParams, setSearchParams] = useSearchParams()
    const handleSelect = (e) => {
        const alreadyChecked = selected.find((item) => item === e.target.value);
        if (alreadyChecked) setSelected(prev => prev.filter((item) => item !== e.target.value))
        else setSelected(prev => [...prev, e.target.value])
    }

    const fetchHighestPriceProudct = async () => {
        const response = await apiGetProducts({ sort: '-price', limit: 1 })
        if (response.success) {
            setBestPrice(response.data)
        }
    }
    useEffect(() => {
        if (selected?.length > 0) {
            const params = [];
            for (let item of searchParams.entries()) {
                params.push(item);
            }
            let queries = {}
            for (let [key, value] of params) {
                queries = { ...queries, [key]: value }
            }
            queries.color = selected.join(',')
            queries.page = 1
            if (selected && selected.length > 0) navigate({
                pathname: `/${category}`,
                search: createSearchParams(
                    queries
                ).toString()
            })
            else {
                navigate(`/${category}`)
            }
        }
    }, [selected])
    useEffect(() => {
        if ((price.from && price.to) && (price.from > price.to)) toast.warning("From price cannot greater than to price !")
    }, [price])
    useEffect(() => {
        if (type === 'input') fetchHighestPriceProudct()
    }, [type])


    const debouncePriceFrom = useDebounce(price.from, 700)
    const debouncePriceTo = useDebounce(price.to, 700)

    useEffect(() => {
        const params = [];
        for (let item of searchParams.entries()) {
            params.push(item);
        }
        let queries = {}
        for (let [key, value] of params) {
            queries = { ...queries, [key]: value }
        }

        if (Number(price.from) > 0) queries.from = price.from
        if (Number(price.to) > 0) queries.to = price.to
        queries.page = 1
        navigate({
            pathname: `/${category}`,
            search: createSearchParams(queries).toString()
        })
    }, [category, navigate, debouncePriceFrom, debouncePriceTo])
    return (
        <div className='px-4 py-3 border text-xs border-gray-500 hover:border-gray-900 flex justify-between items-center relative gap-x-6 cursor-pointer ' onClick={() => changeActiveFilter(name)} >
            <span>{name}</span>
            <IoIosArrowDown></IoIosArrowDown>
            {activeClick === name && <div className='z-10 absolute  top-[calc(100%+1px)] left-0 w-fit p-4 min-w-[150px] bg-white'>
                {type === 'checkbox' && <div >
                    <div className='p-4 flex items-center justify-between gap-8' onClick={(e) => e.stopPropagation()}>
                        <span className='whitespace-nowrap'>{`${selected?.length} selected`}</span>
                        <span className='underline hover:text-main cursor-pointer' onClick={() => setSelected([])}>Reset</span>
                    </div>
                    <div onClick={(e) => e.stopPropagation()} className='flex flex-col gap-3'>
                        {colors?.map((item, index) => (
                            <div key={index} className='flex items-center gap-4' >
                                <input type="checkbox" className='w-4 h-4 text-blue-600 bg-gray-200 rounded border-gray-300 focus:ring-blue-500'
                                    onChange={handleSelect} value={item} id={item} checked={selected.some(selectedItem => selectedItem === item)}
                                />
                                <label className='capitalize text-gray-700' htmlFor={item}>{item}</label>
                            </div>
                        ))}
                    </div>

                </div>}
                {type === 'input' && <div>
                    <div onClick={(e) => e.stopPropagation()}>
                        <div className='p-4 flex items-center justify-between gap-8' >
                            <span className='whitespace-nowrap'>{`Giá cao nhất là ${bestPrice && formatMoney(bestPrice[0]?.price)} VNĐ`}</span>
                            <span className='underline hover:text-main cursor-pointer' onClick={() => {
                                setPrice({ from: 0, to: 0 })
                                changeActiveFilter(null)
                            }}>Reset</span>
                        </div>
                        <div className='flex items-center p-2 gap-2'>
                            <div className='flex items-center gap-2'>
                                <label htmlFor="from">From</label>
                                <input value={price.from} onChange={(e) => setPrice(prev => ({ ...prev, from: e.target.value }))} type="number" id='from' className='px-4 py-2 border border-gray-400' />
                            </div>
                            <div className='flex items-center gap-2'>
                                <label htmlFor="to">To</label>
                                <input value={price.to} onChange={(e) => setPrice(prev => ({ ...prev, to: e.target.value }))} type="number" id='to' className='px-4 py-2 border border-gray-400' />
                            </div>

                        </div>
                    </div>
                </div>}
            </div>}
        </div>

    );
};
SearchItem.propTypes = {
    name: PropTypes.string,
    activeClick: PropTypes.string,
    changeActiveFilter: PropTypes.func,
    type: PropTypes.any,
    category: PropTypes.string,

}
export default memo(SearchItem);


import React, { useCallback, useEffect, useState } from 'react';
import { useParams, useSearchParams, useNavigate, createSearchParams } from 'react-router-dom'
import Breadcrumb from '../../components/Breadcrumb';
import { apiGetProducts } from '../../apis/product';
import Masonry from 'react-masonry-css'
import Product from '../../components/Product';
import SearchItem from '../../components/SearchItem';
import InputSelect from '../../components/InputSelect';
import { sorts } from '../../utils/constant';
import Pagination from '../../components/Pagination';
const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1
};
const Products = () => {
    const navigate = useNavigate()
    const { category } = useParams()
    const [products, setProducts] = useState(null)
    const [activeClick, setActiveClick] = useState(null)
    const [sort, setSort] = useState('')
    const changeValue = useCallback((value) => {
        setSort(value)
    }, [sort])
    const [searchParams, setSearchParams] = useSearchParams();

    const fetchProductByCategory = async (queries) => {
        const response = await apiGetProducts(queries)
        if (response && response?.success) setProducts(response)
    }

    useEffect(() => {
        const params = [];
        for (let item of searchParams.entries()) {
            params.push(item);
        }

        let queries = {};
        for (let [key, value] of params) {
            queries = { ...queries, [key]: value };
        }
        // filter for price
        let priceQuery = {}
        if (queries && queries.from > 0) {
            priceQuery = { price: { gte: queries.from } }
        }
        if (queries && queries.to > 0) {
            priceQuery = { price: { lte: queries.to } }
        }
        if (queries && queries.to > 0 && queries.from > 0) {
            priceQuery = {
                price: { gte: queries.from, lte: queries.to }
            }
        };
        delete queries.from,
            delete queries.to
        const q = { ...priceQuery, ...queries };
        if (category === ':category') fetchProductByCategory({ ...q });
        else {
            fetchProductByCategory({ category, ...q })
        }
        window.scroll(0, 0)

    }, [category, searchParams])
    const changeActiveFilter = useCallback((name) => {
        if (name === activeClick) setActiveClick(null)
        else setActiveClick(name)
    }, [activeClick])
    useEffect(() => {
        if (sort) navigate({
            pathname: `/${category}`,
            search: createSearchParams({
                sort
            }).toString()
        })
    }, [sort])

    return (
        <div>
            <div className='h-[81px] bg-gray-100'>
                <h3 className='font-semibold text-base'>{category?.toUpperCase()}</h3>
                <Breadcrumb category={category}></Breadcrumb>
            </div>
            <div className='p-4 flex justify-between items-center mt-6'>
                <div className='w-4/5 flex-auto flex flex-col   gap-y-4'>
                    <span className='font-semibold text-base'>Filter by</span>
                    <div className='flex gap-x-4'>
                        <SearchItem category={category} activeClick={activeClick} changeActiveFilter={changeActiveFilter} name='Price' type='input'></SearchItem>
                        <SearchItem category={category} activeClick={activeClick} changeActiveFilter={changeActiveFilter} name='Color'></SearchItem>
                    </div>
                </div>
                <div className='w-1/5 flex flex-col gap-y-4 '>
                    <span className='font-semibold text-base'>Sort by</span>
                    <div >
                        <InputSelect changeValue={changeValue} value={sort} options={sorts}></InputSelect>
                    </div>
                </div>
            </div>
            <div className='mt-8'>
                <Masonry
                    breakpointCols={breakpointColumnsObj}
                    className="my-masonry-grid"
                    columnClassName="my-masonry-grid_column">
                    {products?.data?.map((item) => (
                        <Product
                            productData={item}
                            pid={item.id}
                            key={item._id}
                            normal={true}
                        />
                    ))}
                </Masonry>
            </div>
            {products?.data?.length > 0 &&
                <div className=' my-4 flex justify-end'>
                    <Pagination totalCount={products?.counts}
                        productNumber={products?.data?.length}
                    ></Pagination>
                </div>
            }
        </div >
    );
};

export default Products;
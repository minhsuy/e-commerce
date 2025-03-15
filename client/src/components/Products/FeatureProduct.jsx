import React, { memo, useEffect, useState } from 'react';
import { apiGetProducts } from '../../apis/product';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';

const FeatureProduct = () => {
    const [products, setProducts] = useState(null)
    const fetchProduct = async () => {
        const response = await apiGetProducts({ limit: 9 });
        if (response.success) {
            setProducts(response.data)
        }
    }
    useEffect(() => {
        fetchProduct()
    }, [])
    return (
        <div className='w-full'>
            <h3 className='font-semibold text-xl py-[15px] border-b-2 border-main'>FEATURE PRODUCTS</h3>
            <div className='flex flex-wrap mt-5 mx-[-10px] border border-gray-200 rounded-sm gap-y-2'>
                {products && products.map((item) => (

                    <ProductCard key={item._id} image={item.thumb}
                        title={item.title}
                        category={item.category}
                        totalRatings={item.totalRatings}
                        price={item.price}
                        id={item._id}
                    ></ProductCard>
                ))}
            </div>
            <div className='mt-10 flex justify-between'>
                <img src="https://digital-world-2.myshopify.com/cdn/shop/files/banner1-bottom-home2_b96bc752-67d4-45a5-ac32-49dc691b1958_600x.jpg?v=1613166661" alt="feature" className='rounded-sm w-[49%] ' />
                <div className='flex flex-col justify-between h-auto w-[24%]'>
                    <img src="https://digital-world-2.myshopify.com/cdn/shop/files/banner2-bottom-home2_400x.jpg?v=1613166661" alt="feature" className='rounded-sm ' />
                    <img src="https://digital-world-2.myshopify.com/cdn/shop/files/banner3-bottom-home2_400x.jpg?v=1613166661" alt="feature" className='rounded-sm ' />
                </div>
                <img src="https://digital-world-2.myshopify.com/cdn/shop/files/banner4-bottom-home2_92e12df0-500c-4897-882a-7d061bb417fd_400x.jpg?v=1613166661" alt="feature" className='rounded-sm w-[24%] ' />
            </div>
        </div>
    );
};

export default memo(FeatureProduct);
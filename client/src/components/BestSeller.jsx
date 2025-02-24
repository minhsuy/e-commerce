import React, { useEffect, useState } from 'react';
import { apiGetProducts } from '../apis/product';
import Slider from "react-slick";
import Product from './Product';
import CustomSlider from './CustomSlider';
import { useDispatch, useSelector } from 'react-redux';
import { getNewProducts } from '../store/products/asyncAction'
const tabs = [
    {
        id: 1,
        name: "Best Sellers"
    },
    {
        id: 2,
        name: "New Arrivals"
    },
    {
        id: 3,
        name: "Tablets"
    },

]
const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1
};

const BestSeller = () => {
    const dispatch = useDispatch()

    const [bestSeller, setBestSeller] = useState(null)
    const [newProduct, setNewProduct] = useState(null)
    const [tablet, setTablet] = useState(null)
    const [activedTab, setActivedTab] = useState(1)
    const [products, setProducts] = useState(null)
    const { newProducts } = useSelector((state) => state.products)

    const fetchProduct = async () => {
        const response = await Promise.all([apiGetProducts({ sort: "-sold" }), apiGetProducts({ category: 'Tablet' })])
        if (response && response[0].success) {
            setBestSeller(response[0].data); setProducts(response[0].data)
        }
        if (response && response[1].success) {
            setTablet(response[1].data)
        }
    }
    useEffect(() => {
        fetchProduct()
        dispatch(getNewProducts())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    useEffect(() => {
        if (activedTab === 1) {
            setProducts(bestSeller)
        }
        else if (activedTab === 2) {
            setProducts(newProducts)
        }
        else setProducts(tablet)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activedTab])
    return (
        <div>
            <div className='flex text-[18px] gap-8 pb-4 border-b-2 border-main mt-4'>
                {tabs && tabs.map((item) => (
                    <span key={item.id} onClick={() => setActivedTab(item.id)} className={`border-r   cursor-pointer  ${activedTab === item.id ? 'text-main font-semibold' : "text-gray-500"}`} >{item.name}</span>

                ))}

            </div>
            <div className='mt-4 mx-[-10px]'>
                <CustomSlider products={products} activedTab={activedTab}></CustomSlider>
            </div>
            <div className='w-full flex gap-4 mt-4'>
                <img src="https://digital-world-2.myshopify.com/cdn/shop/files/banner2-home2_2000x_crop_center.png?v=1613166657" alt="banner" className='flex-1 object-contain rounded-sm' />
                <img src="https://digital-world-2.myshopify.com/cdn/shop/files/banner1-home2_2000x_crop_center.png?v=1613166657" alt="banner" className='flex-1 object-contain rounded-sm' />
            </div>
        </div>
    );
};

export default BestSeller;
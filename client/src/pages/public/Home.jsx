import React, { memo, useEffect, useState } from 'react';
import Banner from '../../components/Banner';
import { apiGetProducts } from '../../apis/product';
import BestSeller from '../../components/BestSeller';
import DealDaily from '../../components/DealDaily';
import FeatureProduct from '../../components/FeatureProduct';
import Slider from "react-slick";
import Product from '../../components/Product'
import CustomSlider from '../../components/CustomSlider';
import { useDispatch, useSelector } from 'react-redux';
import { icons } from '../../utils/icons';
import Sidebar from '../../components/Sidebar';
const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1
};
const Home = () => {
    const { IoIosArrowForward } = icons
    const activeTab = 3
    const { newProducts } = useSelector((state) => state.products)
    const { categories } = useSelector((state) => state.app)
    return (
        <>
            <div className='w-main flex'>
                <div className='flex flex-col gap-5 w-[25%] flex-auto'>
                    <Sidebar></Sidebar>
                    {/* <DealDaily></DealDaily> */}
                </div>
                <div className='flex flex-col gap-5 pl-5 w-[75%] flex-auto'>
                    <Banner></Banner>
                    <BestSeller></BestSeller>
                </div>
            </div>
            <div className='my-8'>
                <FeatureProduct></FeatureProduct>
            </div>
            <div className='my-8 w-full'>
                <h3 className='font-semibold text-xl py-[15px] border-b-2 border-main'>NEW ARRIVALS</h3>
                <div className=' mt-4 mx-[-10px]  pt-4 content-center'>
                    <CustomSlider products={newProducts}></CustomSlider>
                </div>
            </div>
            <div className='my-8 w-full'>
                <h3 className='font-semibold text-xl py-[15px] border-b-2 border-main'>HOT COLLECTIONS</h3>
                <div className='flex flex-wrap gap-4 mt-4'>
                    {categories && categories.filter(el => el.brand.length > 0).map((el) => (
                        <div key={el._id} className='w-[396px]'>
                            <div className='border flex p-4 gap-4 min-h-[190px]'>
                                <img src={el?.image} alt="hot collection" className='w-[144px] h-[129px] object-cover' />
                                <div className='flex-1 ml-6 text-gray-700'>
                                    <h4 className='text-[16px] font-bold uppercase'>{el?.title}</h4>
                                    <ul className='text-sm'>
                                        {el?.brand.map((item) => (
                                            <span key={item} className='flex gap-2 items-center text-gray-500'>
                                                <IoIosArrowForward size={14}></IoIosArrowForward>
                                                <li key={item}>{item}</li>

                                            </span>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div>
                <h3 className='font-semibold text-xl py-[15px] border-b-2 border-main'>BLOG POSTS</h3>

            </div>

        </>
    );
};

export default memo(Home);
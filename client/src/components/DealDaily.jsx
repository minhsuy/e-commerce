import React, { useEffect, useState, memo } from 'react';
import { icons } from '../utils/icons';
import { apiGetProducts } from '../apis/product';
import { formatMoney } from "../utils/helper";
import { Link } from 'react-router-dom'
import { renderStarFromNumber } from '../utils/renderToStar'
import Countdown from './Countdown';
const DealDaily = () => {
    const [dailyDeal, setDailyDeal] = useState(null);
    const [hour, setHour] = useState(0);
    const [minute, setMinute] = useState(0);
    const [second, setSecond] = useState(0);
    const [expired, setExpired] = useState(false);

    const fetchDailyDeal = async () => {
        const response = await apiGetProducts({
            limit: 7,
        })
        if (response.success) {
            setDailyDeal(response.data[Math.round(Math.random() * 6)])
            const h = 24 - new Date().getHours()
            const m = 60 - new Date().getMinutes()
            const s = 60 - new Date().getSeconds()
            setHour(h)
            setMinute(m)
            setSecond(s)
        }
        else {
            setHour(0)
            setMinute(59)
            setSecond(59)
        }
    }
    useEffect(() => {
        fetchDailyDeal()
    }, [expired])
    useEffect(() => {
        const idInterval = setInterval(() => {
            if (second > 0) {
                setSecond(prev => prev - 1)
            }
            else if (minute > 0) {
                setMinute(prev => prev - 1)
                setSecond(59)
            }
            else if (hour > 0) {
                setHour(prev => prev - 1)
                setMinute(59)
                setSecond(59)
            }
            else {
                setExpired(!expired)
                clearInterval(idInterval)
            }
        }, 1000);
        return () => clearInterval(idInterval)
    }, [hour, minute, second, expired])

    const { FaStar, LuMenu } = icons
    return (
        <div className='border w-full flex-auto p-2'>
            <div className='flex items-center gap-x-4'>
                <span >
                    <FaStar className='text-main'></FaStar>
                </span>
                <span className='font-bold text-[17px] text-center text-gray-800'>DAILY DEALS</span>
            </div>
            {dailyDeal && <Link to={`/${dailyDeal?.category?.toLowerCase()}/${dailyDeal?._id}/${dailyDeal.title}`}>
                <div className='w-full flex flex-col items-center pt-8 cursor-pointer' key={dailyDeal?._id}>
                    <img src={dailyDeal?.thumb} key={dailyDeal?._id} alt={dailyDeal?.title || "Product"} className="w-full object-contain" />
                    <div className='flex items-center justify-center flex-col gap-y-2 relative top-[-20px] mt-8'>
                        <span key={dailyDeal?._id} className="line-clamp-1 text-center">{dailyDeal?.title}</span>
                        <span key={dailyDeal?._id} className="flex">{renderStarFromNumber(dailyDeal?.totalRatings, 18)?.map((el, index) => (
                            <span key={index}>{el}</span>
                        ))} </span>
                        <span key={dailyDeal?._id}>{`${dailyDeal?.price && formatMoney(dailyDeal?.price)} VNĐ`}</span></div>
                </div>
            </Link>}
            <div>
                <div className='flex justify-center items-center gap-x-2 mb-7'>
                    <Countdown unit='Hours' number={hour} ></Countdown>
                    <Countdown unit='Minutes' number={minute}></Countdown>
                    <Countdown unit='Seconds' number={second}></Countdown>
                </div>
                <button type='button' className='w-full flex gap-x-2 items-center justify-center bg-main hover:bg-slate-700 text-white font-medium rounded-sm text-center py-3'>
                    <LuMenu></LuMenu>
                    <span >OPTIONS</span>
                </button>
            </div>
        </div>
    );
};

export default memo(DealDaily);
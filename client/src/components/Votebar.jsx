import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types'
import { icons } from '../utils/icons';
const { FaStar } = icons
const Votebar = ({ number, ratingCount, ratingTotal }) => {
    const percentRef = useRef(null);
    useEffect(() => {
        const percentBar = Math.round((ratingCount / ratingTotal) * 100) | 0
        percentRef.current.style.cssText = `width : ${percentBar}%`
    }, [ratingTotal, ratingCount])
    return (
        <div className='flex items-center gap-x-3 text-sm text-gray-500'>
            <div className='flex flex-1 items-center justify-center gap-x-1 text-sm'>
                <span>{number}</span>
                <FaStar color='yellow'></FaStar>
            </div>
            <div className='flex-7'>
                <div className='w-full h-[6px] rounded-lg bg-gray-300 relative'>
                    <div className='inset-0 absolute bg-main rounded-lg' ref={percentRef}></div>
                </div>
            </div>
            <div className='flex-3'>
                {`${ratingCount || 0} reviewers`}
            </div>
        </div>
    );
};
Votebar.propTypes = {
    number: PropTypes.number,
    ratingCount: PropTypes.number,
    ratingTotal: PropTypes.number,
}
export default Votebar;
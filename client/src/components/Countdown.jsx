import React from 'react';
import { memo } from 'react';
import PropTypes from "prop-types";

const Countdown = ({ unit = 'Hours', number = 0 }) => {
    return (
        <div className='w-[33%] flex flex-auto items-center justify-center h-[60px] text-center border border-gray-200 rounded-md bg-gray-200'>
            <div className='flex flex-col '>
                <span className='font-bold'>{number}</span>
                <span className='text-slate-800'>{unit}</span>
            </div>
        </div>
    );
};

Countdown.propTypes = {

    unit: PropTypes.string,
    number: PropTypes.number,
};
export default memo(Countdown);
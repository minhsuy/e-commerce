import React, { memo } from 'react';
import PropTypes from "prop-types";
const SelectQuantity = ({ quantity = 1, handleChangeQuantity }) => {
    return (
        <div className='flex items-center'>
            <span onClick={() => handleChangeQuantity('minus')} className='text-2xl p-2 border-r border-black cursor-pointer'>-</span>
            <span className='px-3 text-base font-medium '>{quantity}</span>
            <span onClick={() => handleChangeQuantity('plus')} className='text-2xl p-2 border-l border-black cursor-pointer '>+</span>
        </div>
    );
};

SelectQuantity.propTypes = {
    quantity: PropTypes.number,
    handleQuantity: PropTypes.func,
    handleChangeQuantity: PropTypes.func,
}
export default memo(SelectQuantity);



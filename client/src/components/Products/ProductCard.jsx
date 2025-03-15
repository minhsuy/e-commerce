import React from 'react';
import PropTypes from 'prop-types'
import { formatMoney } from '../../utils/helper'
import {
    renderStarFromNumber
} from '../../utils/renderToStar'
import { Link } from 'react-router-dom';
const ProductCard = ({ price, totalRatings, title, image, id, category }) => {
    return (
        <Link to={`/${category?.toLowerCase()}/${id}/${title}`} className='w-1/3 flex-auto  px-[10px]'>
            <div className='flex w-full border border-gray-200 rounded-md'>
                <img src={image} alt="products" className='w-[120px] object-contain p-4 cursor-pointer' />
                <div className="flex flex-col items-start gap-2 mt-[15px] text-sm ">
                    <span className="line-clamp-1 cursor-pointer hover:text-main capitalize">{title?.toLowerCase()}</span>
                    <span className='font-thin'>{`${formatMoney(price)} VNĐ`}</span>
                    <span className="flex">{renderStarFromNumber(totalRatings)?.map((item, index) => (
                        <span key={index}>{item}</span>
                    ))}</span>
                </div>
            </div>
        </Link>
    );
};
ProductCard.propTypes = {
    price: PropTypes.number,
    totalRatings: PropTypes.number,
    title: PropTypes.string,
    category: PropTypes.string,
    image: PropTypes.string,
    id: PropTypes.number,

}
export default ProductCard;
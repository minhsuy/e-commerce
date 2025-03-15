import React from 'react';
import PropTypes from 'prop-types'
import avatar from '../../assets/avatar.avif'
import moment from 'moment'
import { renderStarFromNumber } from '../../utils/renderToStar';
const Comment = ({ image = avatar, name = 'Anonymous', comment, updatedAt, star }) => {
    return (
        <div className='w-[400px] flex p-2 rounded-lg border border-gray-300 hover:border-gray-400 '>
            <div className='p-4 flex-none'>
                <img src={image} alt="avt" className='w-[40px] h-[40px] object-cover rounded-full' />
            </div>
            <div className='flex flex-col flex-auto justify-start'>
                <div className='flex items-center gap-x-5'>
                    <h3 className='font-semibold'>{name}</h3>
                    <span>{moment(updatedAt).format("DD/MM/YYYY HH:mm:ss")}</span>
                </div>
                <div className='flex flex-col gap-2 pl-4'>
                    <span className='flex gap-x-3'>
                        <span className='font-semibold'>Đánh giá : </span>
                        <span className='flex items-center gap-x-1'>{renderStarFromNumber(star)?.map((item, index) => (
                            <span key={index}>{item}</span>
                        ))}</span>
                    </span>
                    <span>
                        <span className='font-semibold'>Comment : </span>
                        <span className='font-semibold'>{comment}</span>
                    </span>
                </div>
            </div>
        </div>
    );
};

Comment.propTypes = {
    image: PropTypes.string,
    name: PropTypes.string,
    updatedAt: PropTypes.string,
    comment: PropTypes.string,
    star: PropTypes.number,
}
export default Comment; 
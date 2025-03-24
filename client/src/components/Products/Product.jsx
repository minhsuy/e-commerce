import React, { memo, useState } from "react";
import PropTypes from "prop-types";
import { formatMoney } from "../../utils/helper";
import label from '../../assets/new.png';
import trending from '../../assets/trending.png';
import { renderStarFromNumber } from "../../utils/renderToStar";
import SelectOption from "../search/SelectOption";
import { icons } from "../../utils/icons";
import { Link } from 'react-router-dom'
import path from '../../utils/path'
import withBaseComponent from "../../hocs/withBaseComponent";
const Product = ({ productData, tag, isCheck, normal, navigate }) => {
    const { LuMenu, FaEye, FaHeart } = icons
    const [isShowOption, setIsShowOption] = useState(false)
    const handleChooseOption = (e, action) => {
        e.stopPropagation();
        console.log(action)
    }
    return (
        <div className="w-full text-base  px-[10px]">
            <div onClick={() => navigate(`/${productData?.category?.toLowerCase()}/${productData?._id}/${productData.title}`)} className="border border-gray-300 rounded-md p-[15px] cursor-pointer flex flex-col items-center"
                onMouseEnter={e => {
                    e.stopPropagation()
                    setIsShowOption(true)
                }}
                onMouseLeave={e => {
                    e.stopPropagation()
                    setIsShowOption(false)
                }}
            >
                <div className="w-full relative">
                    {isShowOption && <div
                        className="absolute bottom-[-10px] left-0 right-0  flex justify-center gap-x-2 animate-slide-top">
                        <div onClick={() => navigate(`/${productData?.category?.toLowerCase()}/${productData?._id}/${productData.title}`)} >
                            <SelectOption icon={<LuMenu></LuMenu>}></SelectOption>
                        </div>

                        <span onClick={(e) => handleChooseOption(e, 'quick_view')}>
                            <SelectOption icon={<FaEye></FaEye>}></SelectOption>
                        </span>
                        <span onClick={(e) => handleChooseOption(e, 'wishlist')}>
                            <SelectOption icon={<FaHeart></FaHeart>}></SelectOption>
                        </span>
                    </div>}
                    <img src={productData?.thumb} alt={productData?.title || "Product"} className="w-[243px] h-[243px] object-cover" />
                    {(isCheck || normal) ? "" : (
                        <img
                            src={tag ? label : trending}
                            alt=""
                            className="absolute w-[75px] top-[-10px] object-cover"
                        />
                    )}
                </div>
                <div className="flex flex-col items-center gap-2 mt-[15px]">
                    <span className="flex">{renderStarFromNumber(productData?.totalRatings)?.map((item, index) => (
                        <span key={index}>{item}</span>
                    ))}</span>
                    <span className="line-clamp-1">{productData.title}</span>
                    <span>{`${formatMoney(productData?.price)} VNĐ`}</span>
                </div>
            </div>
        </div >
    );
};

Product.propTypes = {
    productData: PropTypes.shape({
        images: PropTypes.arrayOf(PropTypes.string),
        title: PropTypes.string,
        thumb: PropTypes.string,
        price: PropTypes.number,
        tag: PropTypes.string,
        totalRatings: PropTypes.number,
        _id: PropTypes.number,
        category: PropTypes.string

    }).isRequired,
    tag: PropTypes.string,
    isCheck: PropTypes.string,
    normal: PropTypes.string,
    navigate: PropTypes.any,
};

export default withBaseComponent(memo(Product));

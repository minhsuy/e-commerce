import React, { memo } from 'react';
import Slider from 'react-slick';
import PropTypes from 'prop-types';
import Product from '../Products/Product';

const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1
};

const CustomSlider = ({ products, activedTab, normal }) => {
    return (
        <>
            {products && <Slider {...settings}>
                {products && products.map((item) => (
                    <Product
                        productData={item}
                        pid={item.id}
                        tag={activedTab === 1}
                        isCheck={activedTab === 3}
                        key={item._id}
                        normal={normal}
                    />
                ))}
            </Slider>}
        </>
    );
};

CustomSlider.propTypes = {
    products: PropTypes.arrayOf(PropTypes.shape({
        images: PropTypes.arrayOf(PropTypes.string),
        title: PropTypes.string,
        thumb: PropTypes.string,
        price: PropTypes.number,
        tag: PropTypes.string,

        totalRatings: PropTypes.number,
    })).isRequired,
    activedTab: PropTypes.number.isRequired,
    isCheck: PropTypes.number,
    normal: PropTypes.bool,
};

export default memo(CustomSlider);

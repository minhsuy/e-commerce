import React from 'react';
import Slider from 'react-slick';

const Banner = () => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    return (
        <div className='w-full'>
            <Slider {...settings}  >
                <img src="https://plus.unsplash.com/premium_photo-1684785617105-2ebfbd278671?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="banner" className='h-[400px] w-full object-cover rounded-lg' />
                <img src="https://plus.unsplash.com/premium_photo-1684785618727-378a3a5e91c5?q=80&w=1684&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="banner" className='h-[400px] w-full object-cover rounded-lg' />
                <img src="https://plus.unsplash.com/premium_photo-1684785617500-fb22234eeedd?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="banner" className='h-[400px] w-full object-cover rounded-lg' />
            </Slider>

        </div>
    );
};

export default Banner;
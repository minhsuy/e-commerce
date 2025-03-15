import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiGetProduct, apiGetProducts } from '../../apis/product'
import Slider from 'react-slick';
import ReactImageMagnify from 'react-image-magnify';
import { formatMoney, formatPrice } from '../../utils/helper';
import { renderStarFromNumber } from '../../utils/renderToStar';
import { icons } from '../../utils/icons';
import { extraInfomation } from '../../utils/extraInfomation';
import Button from '../../components/Button/Button';
import Breadcrumb from '../../components/common/Breadcrumb';
import CustomSlider from '../../components/common/CustomSlider';
import SelectQuantity from '../../components/common/SelectQuantity';
import ProductExtraInfoItem from '../../components/Products/ProductExtraInfoItem';
import ProductInfomation from '../../components/Products/ProductInfomation';


const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1
};

const DetailProduct = () => {
    const { pid, title, category } = useParams()
    const [product, setProduct] = useState(null)
    const [productCategory, setProductCategory] = useState(null)
    const [img, setImg] = useState(null)
    const [quantity, setQuantity] = useState(1)
    const [update, setUpdate] = useState(false)

    const rerender = useCallback(() => {
        setUpdate(!update)
    }, [update])
    const fetchProduct = async () => {
        const res = await Promise.all([apiGetProduct(pid), apiGetProducts({ category: category.charAt(0).toUpperCase() + category.slice(1) })])
        if (res && res[0].success) setProduct(res[0].message)
        if (res && res[1].success) setProductCategory(res[1].data)
    }
    useEffect(() => {
        if (pid) {
            fetchProduct()
            setImg(null)
        }
        window.scrollTo(0, 0)
    }, [pid, title, update])
    const handleSetImage = useCallback((item) => {
        setImg(item)
    }, [img])
    const handleChangeQuantity = useCallback((status) => {
        if (status === 'minus') {
            if (quantity <= 1) {
                setQuantity(1)
            }
            else {
                setQuantity(prev => prev - 1)
            }
        }
        else setQuantity(prev => prev + 1)
    }, [quantity])

    return (
        <div className='w-full'>
            <div className='h-[81px] bg-gray-100'>
                <h3 className='font-semibold text-base'>{title}</h3>
                <Breadcrumb title={title} category={category}></Breadcrumb>
            </div>
            <div className='mt-4 flex'>
                <div className=' flex flex-col gap-y-4 w-2/5'>
                    <div className='w-[458px] h-[458px] object-cover border border-gray-200 rounded-md '>
                        <ReactImageMagnify {...{
                            smallImage: {
                                alt: 'Wristwatch by Ted Baker London',
                                isFluidWidth: true,
                                src: img || product?.images[0]
                            },
                            largeImage: {
                                src: img || product?.images[0],
                                width: 1200,
                                height: 1200
                            }
                        }} />
                    </div>
                    <div className='w-[458px]'>
                        <Slider {...settings}>
                            {product?.images?.map((item, index) => (
                                <div key={index} className='px-2'>
                                    <img src={item} onClick={() => handleSetImage(item)} alt="" className='w-[143px] h-[143px] p-2 object-contain border border-gray-200 rounded-lg cursor-pointer ' />
                                </div>
                            ))}
                        </Slider>
                    </div>
                </div>
                <div className='w-2/5 flex flex-col gap-4'>
                    <div className='flex items-center justify-between'>
                        <div className='flex   items-center justify-center'>
                            <h2 className='text-2xl font-semibold'>{`${formatMoney(formatPrice(product?.price))} VNĐ`}
                            </h2>
                            <span className='text-base text-main font-medium italic ml-20'>{`Kho : ${product?.quantity}`}</span>
                        </div>
                    </div>
                    <div className='flex gap-x-1 mt-2 items-center'>
                        {renderStarFromNumber(product?.totalRatings)?.map((item, index) => (
                            <span key={index}>{item}</span>
                        ))}
                        <span className='italic ml-2 text-main text-base font-medium'>({`Đã bán : ${product?.sold}`})</span>
                    </div>
                    <ul className='list-disc pl-4'>
                        {product?.description?.map((item, index) => (

                            <li key={index} className='leading-8'>{item}</li>
                        ))}
                    </ul>
                    <div className='flex flex-col gap-y-8'>
                        <div className='flex items-center gap-x-3 '>
                            <span className='text-lg font-medium'>Quantity : </span>
                            <SelectQuantity quantity={quantity} handleChangeQuantity={handleChangeQuantity}></SelectQuantity>
                        </div>
                        <Button type={'button'} style={'w-full bg-main text-white'} >Add to cart</Button>
                    </div>
                </div>
                <div className='w-1/5'>
                    {extraInfomation && extraInfomation.map((item,) => (
                        <ProductExtraInfoItem key={item.id} item={item}></ProductExtraInfoItem>
                    ))}
                </div>

            </div>
            <div className='mt-8'>
                <ProductInfomation pid={pid} totalRatings={product?.totalRatings} product={product} rerender={rerender} productName={product?.title} ratings={product?.ratings}></ProductInfomation>
            </div>
            <div className='w-full mb-5 mt-10'>
                <h3 className='font-semibold text-xl  border-b-2 border-main'>ORTHER CUSTOMER ALSO BUY</h3>
                <div className='mt-4 mx-[-10px]  pt-4 content-center'>
                    <CustomSlider normal={true} products={productCategory}></CustomSlider>
                </div>
            </div>

        </div>
    );
};

export default DetailProduct;
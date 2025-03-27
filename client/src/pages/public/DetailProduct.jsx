import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation, createSearchParams, useSearchParams } from 'react-router-dom';
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
import DOMPurify from 'dompurify';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import path from '../../utils/path';
import { apiUpdateCart } from '../../apis/user';
import { toast } from 'react-toastify';
import { getCurrent } from '../../store/user/asyncAction';

const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1
};

const DetailProduct = () => {
    const { current } = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const { pid, title, category } = useParams()
    const [product, setProduct] = useState(null)
    const [productCategory, setProductCategory] = useState(null)
    const [img, setImg] = useState(null)
    const [quantity, setQuantity] = useState(1)
    const [update, setUpdate] = useState(false)
    const [varriants, setVarriants] = useState(null)
    const [currentProduct, setCurrentProduct] = useState({
        title: '',
        price: 0,
        thumb: '',
        images: [],
        color: ''
    })
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
    useEffect(() => {
        if (varriants !== null) setCurrentProduct({
            title: product?.varriants?.find((item) => item.sku === varriants)?.title,
            price: product?.varriants?.find((item) => item.sku === varriants)?.price,
            thumb: product?.varriants?.find((item) => item.sku === varriants)?.thumb,
            images: product?.varriants?.find((item) => item.sku === varriants)?.images,
            color: product?.varriants?.find((item) => item.sku === varriants)?.color,
        })
        else setCurrentProduct({
            title: '',
            price: 0,
            thumb: '',
            images: [],
            color: ''
        })
    }, [varriants])
    const handleSetImage = useCallback((item) => {
        setImg(item)
    }, [img])
    const handleQuantity = (number) => {
        if (+number > 1) setQuantity(number)
    }
    const handleChangeQuantity = (status) => {
        if (status === 'minus') {
            if (quantity <= 1) {
                setQuantity(1)
            }
            else {
                setQuantity(prev => prev - 1)
            }
        }
        else setQuantity(prev => prev + 1)
    }
    const handleAddProductToCart = async () => {
        if (current === null) {
            Swal.fire({ title: 'Đăng nhập  ? ', text: "Phải đăng nhập để thực hiện chức năng này ? ", icon: 'warning' }).then((result) => {
                if (result.isConfirmed) {
                    navigate({
                        pathname: `/${path.LOGIN}`,
                        search: createSearchParams({ redirect: location.pathname }).toString()
                    })
                }
            })
            return
        }
        const response = await apiUpdateCart({ pid, color: currentProduct?.color || (product?.color === 'N/A' ? 'BLACK' : product?.color), quantity, price: currentProduct?.price || product?.price, thumbnail: currentProduct?.thumb || product?.thumb, title: currentProduct?.title || product?.title, category })
        if (response.success) {
            toast.success(response?.message)
            dispatch(getCurrent())
            setQuantity(1)
        }
        else toast.error('Add product to cart failed !')
    }
    return (
        <div className='w-full'>
            <div className='h-[81px] bg-gray-100'>
                <h3 className='font-semibold text-base'>{currentProduct?.title || product?.title}</h3>
                <Breadcrumb title={currentProduct?.title || title} category={category}></Breadcrumb>
            </div>
            <div className='mt-4 flex'>
                <div className=' flex flex-col gap-y-4 w-2/5'>
                    <div className='w-[458px] h-[458px] object-cover border border-gray-200 rounded-md '>
                        <ReactImageMagnify {...{
                            smallImage: {
                                alt: 'Wristwatch by Ted Baker London',
                                isFluidWidth: true,
                                src: img || (currentProduct?.thumb || product?.images[0])
                            },
                            largeImage: {
                                src: img || (currentProduct?.thumb || product?.images[0]),
                                width: 1200,
                                height: 1200
                            }
                        }} />
                    </div>
                    <div className='w-[458px]'>
                        <Slider {...settings}>
                            {currentProduct?.thumb === '' && product?.images?.map((item, index) => (
                                <div key={index} className='px-2'>
                                    <img src={item} onClick={() => handleSetImage(item)} alt="" className='w-[143px] h-[143px] p-2 object-contain border border-gray-200 rounded-lg cursor-pointer ' />
                                </div>
                            ))}
                            {currentProduct?.thumb !== '' && currentProduct?.images?.map((item, index) => (
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

                            <h2 className='text-2xl font-semibold'>
                                {formatMoney(formatPrice(+currentProduct?.price || product?.price))} VNĐ
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
                        {product?.description?.length > 1 && product?.description?.map((item, index) => (
                            <li key={index} className='leading-8'>{item}</li>
                        ))}
                        {product?.description?.length === 1 &&
                            <div className='text-sm' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(product?.description[0]) }}></div>
                        }
                        {/* varriants */}
                        <div className='my-4 flex items-center gap-4'>
                            <span>Color</span>
                            <span>:</span>
                            <div className='flex flex-wrap gap-4 items-center w-full cursor-pointer'>
                                <div className={`flex items-center gap-x-2 ${!varriants && 'bg-blue-500 rounded-lg text-white p-2'}`} onClick={() => {
                                    setVarriants(null)
                                    setImg('')
                                }} >
                                    <img src={product?.thumb} alt="thumb" className='w-[40px] h-[40px] object-cover rounded-lg' />
                                    <span className='flex flex-col gap-1'>
                                        <span className='font-semibold'>{product?.color?.toUpperCase()}</span>
                                        <span className='font-semibold'>{formatMoney(formatPrice(product?.price))} VNĐ</span>
                                    </span>
                                </div>
                                {product?.varriants?.map((item) => (
                                    <div className={`flex items-center gap-x-2 cursor-pointer ${item?.sku === varriants ? 'bg-blue-500 rounded-lg text-white p-2' : ''}`} key={item?.color} onClick={() => {
                                        setVarriants(item?.sku)
                                        setImg('')
                                    }
                                    }>
                                        <img src={item?.thumb} alt="thumb" className='w-[40px] h-[40px] object-cover rounded-lg' />
                                        <span className='flex flex-col gap-1'>
                                            <span className='font-semibold'>{item?.color?.toUpperCase()}</span>
                                            <span className='font-semibold'>{formatMoney(formatPrice(item?.price))} VNĐ</span>
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </ul>
                    <div className='flex flex-col gap-y-8'>
                        <div className='flex items-center gap-x-3 '>
                            <span className='text-lg font-medium'>Quantity : </span>
                            <SelectQuantity quantity={quantity} handleChangeQuantity={handleChangeQuantity}></SelectQuantity>
                        </div>
                        <Button type={'button'} style={'w-full bg-main text-white'} handleOnClick={handleAddProductToCart} >Add to cart</Button>
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
import React, { memo, useCallback, useEffect, useState } from 'react';
import { productInfoTabs } from '../../utils/constant';
import PropTypes from 'prop-types'
import { renderStarFromNumber } from '../../utils/renderToStar';
import { apiRatings } from '../../apis/product';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../Button/Button';
import { useNavigate } from 'react-router-dom';
import { showModal } from '../../store/app/appSlice'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'
import Votebar from '../Vote/Votebar';
import VoteOption from '../Vote/VoteOption';
import Comment from '../Vote/Comment';
const ProductInfomation = ({ totalRatings, ratings, productName, pid, rerender, product }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { isLoggedIn } = useSelector((state) => state.user)
    const [active, setActive] = useState(1);
    const [payload, setPayload] = useState({
        comment: '',
        score: 0
    })
    const handleSetActiveTab = useCallback((id) => {
        setActive(id)
    }, [active])
    const handleSubmitVoteOption = async ({ comment, score }) => {
        if (!comment || !score) {
            toast.warn('Hãy điền đầy đủ cảm nhận trước khi gửi đánh giá !')
            return
        }
        const response = await apiRatings({ pid, star: score, comment, updatedAt: Date.now() })
        if (response.success) {
            Swal.fire({ title: 'Congratulation !', text: 'Đánh giá sản phẩm thành công !', icon: 'success' }).then((result) => {
                if (result.isConfirmed) dispatch(showModal({ isShowModal: false, modalChildren: null }))
            })
        }
        rerender()
    }

    const handleVoteNow = () => {
        if (isLoggedIn) dispatch(showModal({ isShowModal: true, modalChildren: <VoteOption handleSubmitVoteOption={handleSubmitVoteOption} productName={productName} ></VoteOption> }))
        else Swal.fire({ title: 'Đăng nhập ngay ?', text: 'Đánh giá sản phẩm cần đăng nhập !', icon: 'warning' }).then((result) => {
            if (result.isConfirmed) {
                dispatch(showModal({ isShowModal: false, modalChildren: null }))
                navigate('/login')
            }
        })
    }


    return (
        <div className='relative'>
            <div className='flex items-center gap-x-12'>
                {productInfoTabs && productInfoTabs.map((item) => <span key={item.id} onClick={() => handleSetActiveTab(item.id)} className={`cursor-pointer font-normal bg-gray-200 px-4 py-2 rounded-md ${active === item.id ? 'text-white bg-main bg-opacity-90' : ''}`}>{item.name}</span>)}
            </div>
            <div className='w-full h-auto border mt-2 p-4'>
                <p>{productInfoTabs && productInfoTabs?.find((item) => item.id === active)?.content}</p>
                <div>
                    <p className='mt-5 mb-5 font-semibold text-xl text-main'>Đánh giá sản phẩm</p>

                    <div className='flex p-4'>
                        <div className='flex-4 border flex items-center justify-center flex-col gap-y-3'>
                            <span className='semibold text-3xl'>{`${(totalRatings)}/5`}</span>
                            <span className='flex items-center gap-x-1'>{renderStarFromNumber(totalRatings)?.map((item, index) => (
                                <span key={index}>{item}</span>
                            ))}</span>
                            <span className='text-sm'>{`${ratings?.length} ngươì đánh giá và bình luận!`}</span>
                        </div>
                        <div className='flex-6 flex flex-col border p-4'>
                            {Array.from(Array(5).keys()).reverse().map((el, index) => (
                                <Votebar key={index} number={el + 1} ratingTotal={ratings?.length}
                                    ratingCount={ratings?.filter((item) => item.star === el + 1)?.length}></Votebar>
                            ))}
                        </div>

                    </div>
                    <div className='p-4 flex items-center justify-center text-sm flex-col gap-y-2'>
                        <span >Đánh giá sản phẩm ?</span>
                        <Button handleOnClick={handleVoteNow} style={`bg-main z-10`}>Vote now !</Button>
                    </div>

                </div>
                <div className='flex flex-col gap-y-6 mt-5' >
                    <span className='text-xl text-main font-semibold'>Bình luận</span>
                    {ratings && ratings?.map((item) => (
                        <Comment key={item.postedBy} star={item.star} updatedAt={item.updatedAt} comment={item.comment} name={`${item?.postedBy?.firstname} ${item?.postedBy?.lastname}`} image={item?.postedBy?.avatar} ></Comment>
                    ))}
                </div>
            </div>
        </div >
    );
};
ProductInfomation.propTypes = {
    totalCount: PropTypes.number,
    ratings: PropTypes.array,
    pid: PropTypes.number,
    productName: PropTypes.string,
    totalRatings: PropTypes.any,
    rerender: PropTypes.any,
    product: PropTypes.any,

}
export default memo(ProductInfomation);
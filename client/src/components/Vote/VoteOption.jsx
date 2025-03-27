import React, { memo, useEffect, useRef, useState } from 'react';
import logo from '../../assets/logo.png'
import PropTypes from 'prop-types'
import { voteOptions } from '../../utils/constant';
import { icons } from '../../utils/icons';
import Button from '../Button/Button';
import { showModal } from '../../store/app/appSlice'
import { useDispatch } from 'react-redux';
const { FaStar, IoClose } = icons
const VoteOption = ({ productName, handleSubmitVoteOption }) => {
    const dispatch = useDispatch()
    const [chosenScore, setChosenScore] = useState(null)
    const [comment, setCommnent] = useState('')
    const handleChosenScore = (id) => {
        if (chosenScore === id) setChosenScore(null)
        else setChosenScore(id)
    }
    const voteRef = useRef();
    useEffect(() => {
        voteRef.current.scrollIntoView({ block: 'center', behavior: "smooth" })
    }, [])
    return (
        <div onClick={(e) => e.stopPropagation()} ref={voteRef} className='w-[700px] h-[400px] rounded-md relative bg-white flex flex-col gap-y-4 border  justify-center items-center z-[10000]'>
            <img src={logo} alt="logo" className='w-[300px] object-contain' />
            <span className='absolute right-0 top-0 p-1 rounded-lg bg-slate-200 text-main cursor-pointer hover:text-white hover:bg-main' onClick={() => dispatch(showModal({ isShowModal: false, modalChildren: null }))}>
                <IoClose size={30}></IoClose>
            </span>
            <h2 className='text-center text-lg font-medium'>{`Đánh giá sản phẩm : ${productName}`}</h2>
            <textarea className='w-3/4 p-4 py-4 rounded-md resize-none border border-gray-300 outline-none focus:border focus:border-gray-500' placeholder='Xin mời bạn nhận xét , góp ý về sản phẩm !' onChange={(e) => setCommnent(e.target.value)} ></textarea>
            <div className='w-full flex flex-col gap-4'>
                <p className='text-base font-medium text-main'>Bạn cảm thấy sản phẩm này thế nào ?</p>
                <div className='flex justify-center gap-4 items-center'>
                    {voteOptions && voteOptions?.map((item) => (
                        <div className='w-[100px] h-[60px] bg-gray-200 rounded-lg flex flex-col gap-y-1 items-center justify-center cursor-pointer hover:bg-gray-300' key={item.id} onClick={() => handleChosenScore(item.id)}>
                            <span className='text-gray-900'>{item.text}</span>
                            {chosenScore >= item.id ? <FaStar className='text-yellow-500 '></FaStar> : <FaStar className='text-gray-500 '></FaStar>}
                        </div>
                    ))}
                </div>
            </div>
            <Button handleOnClick={() => handleSubmitVoteOption({ score: chosenScore, comment })} style={`bg-main w-[250px] mt-2`}>Gửi đánh giá</Button>

        </div>
    );
};
VoteOption.propTypes = {
    productName: PropTypes.string,
    handleSubmitVoteOption: PropTypes.func,
}
export default memo(VoteOption);
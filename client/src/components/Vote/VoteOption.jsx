import React, { memo, useEffect, useRef, useState } from 'react';
import logo from '../../assets/logo.png'
import PropTypes from 'prop-types'
import { voteOptions } from '../../utils/constant';
import { icons } from '../../utils/icons';
import Button from '../Button/Button';
const { FaStar } = icons
const VoteOption = ({ productName, handleSubmitVoteOption }) => {
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
        <div onClick={(e) => e.stopPropagation()} ref={voteRef} className='w-[700px] h-[400px] rounded-md bg-white flex flex-col gap-y-4 p-4 justify-center items-center'>
            <img src={logo} alt="logo" className='w-[300px] object-contain' />
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
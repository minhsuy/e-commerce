import { icons } from './icons'

const { CiStar, FaStar } = icons

export const renderStarFromNumber = (number, size = 15) => {
    if (!Number(number)) return
    const stars = []
    for (let i = 0; i < number; i++) {
        stars.push(<FaStar size={size} className='text-yellow-400'></FaStar>)
    }
    const countStar = 5 - stars.length
    if (countStar !== 0) {
        for (let i = 0; i < countStar; i++) {
            stars.push(<CiStar size={size} className='bg-slate-200'></CiStar>)
        }
    }
    return stars;
}
import React, { useEffect } from 'react';
import usePagination from '../hooks/usePagination';
import PropTypes from 'prop-types'
import PagItem from './PagItem';
import { useSearchParams } from 'react-router-dom';
const Pagination = ({ totalCount, productNumber }) => {
    const pagination = usePagination(totalCount, 2)
    const [params] = useSearchParams()

    const range = () => {
        const currentPage = +params.get('page')
        const start = 10 * (currentPage - 1)
        const end = Math.min(10 * currentPage, totalCount)
        return `${start} - ${end}`
    }
    return (
        <div className='w-main flex items-center justify-between'>
            <div>
                {(!+params.get('page') || +params.get('page') === 1) && `1-10 of ${totalCount} product`}
                {(+params.get('page') && +params.get('page') !== 1) && `${range()} of ${totalCount} product`}
            </div>
            <div className='flex items-center gap-x-2'>
                {pagination?.map((item) => (
                    <PagItem key={item}>{item}</PagItem>
                ))}
            </div>
        </div>
    );
};
Pagination.propTypes = {
    totalCount: PropTypes.number,
    currentPage: PropTypes.number,
    productNumber: PropTypes.any,
}
export default Pagination;


import React, { useMemo } from 'react';
import { generateRange } from '../utils/helper';
const usePagination = (totalProductCount, currentPage, siblingCount = 1) => {

    const paginationCount = useMemo(() => {
        const paginationCount = Math.ceil(totalProductCount / 10)
        const totalPaginationItem = siblingCount + 5
        if (paginationCount <= totalPaginationItem) return generateRange(1, paginationCount)
        const isShowLeft = currentPage - siblingCount > 2
        const isShowRight = currentPage + siblingCount < paginationCount - 1
        if (isShowLeft && !isShowRight) {
            const rightStart = paginationCount - 4
            const rightRange = generateRange(rightStart, paginationCount)
            return [1, '...', ...rightRange]
        }
        if (!isShowLeft && isShowRight) {
            const leftRange = generateRange(1, 5)
            return [...leftRange, '...', paginationCount]
        }
        const siblingLeft = Math.max(currentPage - siblingCount, 1)
        const siblingRight = Math.min(currentPage + siblingCount, paginationCount)
        if (isShowLeft && isShowRight) {
            const middleRange = generateRange(siblingLeft, siblingRight)
            return [1, '...', ...middleRange, '...', paginationCount]
        }
    }, [totalProductCount, currentPage, siblingCount])
    return paginationCount
};

export default usePagination;
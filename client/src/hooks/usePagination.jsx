import React, { useMemo } from 'react';
import { generateRange } from '../utils/helper';

const usePagination = (totalProductCount, currentPage, siblingCount = 1) => {
    return useMemo(() => {
        const paginationCount = Math.ceil(totalProductCount / 10);

        // Nếu tổng số trang nhỏ hơn hoặc bằng siblingCount + 5, hiển thị tất cả các trang
        if (paginationCount <= siblingCount + 5) {
            return generateRange(1, paginationCount);
        }

        // Kiểm tra các điều kiện để hiển thị dấu "..."
        const isShowLeft = currentPage - siblingCount > 2;
        const isShowRight = currentPage + siblingCount < paginationCount - 1;

        if (!isShowLeft && isShowRight) {
            return [...generateRange(1, paginationCount)];
        }

        if (isShowLeft && !isShowRight) {
            return [1, '...', ...generateRange(paginationCount - 4, paginationCount)];
        }

        if (isShowLeft && isShowRight) {
            return [1, '...', ...generateRange(currentPage - siblingCount, currentPage + siblingCount), '...', paginationCount];
        }

        // Trường hợp còn lại, hiển thị tất cả các trang
        return generateRange(1, paginationCount);
    }, [totalProductCount, currentPage, siblingCount]);
};

export default usePagination;

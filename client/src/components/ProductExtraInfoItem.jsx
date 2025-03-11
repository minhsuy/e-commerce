import React, { memo } from 'react';
import PropTypes from 'prop-types';
const ProductExtraInfoItem = ({ item }) => {
    const { id, title, sub, icons } = item
    return (
        <div>
            <div className="flex items-center gap-2 p-4 mb-[10px]">
                <span className="text-lg p-2 bg-gray-300 rounded-full">{icons}</span>
                <div className="flex flex-col text-sm">
                    <span className="font-semibold">{title}</span>
                    <span>{sub}</span>
                </div>
            </div>
        </div>
    );
};

ProductExtraInfoItem.propTypes = {
    item: PropTypes.object
};
export default memo(ProductExtraInfoItem);
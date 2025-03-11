import React, { memo } from 'react';
import PropTypes from 'prop-types'
const InputSelect = ({ value, changeValue, options }) => {
    return (
        <select className='px-4 py-1 outline-none' value={value} onChange={(e) => changeValue(e.target.value)}>
            <option value="">Random</option>
            {options && options?.map((item) => (
                <option key={item.id} value={item.value}>{item.text}</option>
            ))}
        </select>
    );
};
InputSelect.propTypes = {
    value: PropTypes.string,
    changeValue: PropTypes.func,
    options: PropTypes.array,
}


export default memo(InputSelect);



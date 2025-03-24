import React, { memo } from 'react';
import PropTypes from 'prop-types'
const Select = ({ label, option = [], register, errors, id, validate, className, value, onChange }) => {
    return (
        <div className='flex flex-col gap-2'>
            {label && <label className='font-semibold' htmlFor={id}>{label}</label>}

            <select id={id} className={` px-4 py-2 rounded-md  focus:border focus:border-main outline-none  border border-gray-300 ${className}`} onChange={onChange} value={value} {...(register ? register(id, validate || {}) : {})}>
                {option && option?.map((item) => (
                    <option value={item.code} key={item.code}>{item.value}</option>
                ))}
            </select>
            {errors && errors[id] && <span className='text-main'>{errors[id]?.message}</span>}
        </div >
    );
};
Select.propTypes = {
    label: PropTypes.string,
    disabled: PropTypes.bool,
    register: PropTypes.func,
    errors: PropTypes.object,
    id: PropTypes.string.isRequired,
    validate: PropTypes.object,
    type: PropTypes.string,
    placeholder: PropTypes.string,
    name: PropTypes.string,
    className: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    option: PropTypes.array
}
export default memo(Select);
import React, { memo } from 'react';
import PropTypes from 'prop-types';

const InputForms = ({ label, disabled, register, errors, id, validate, type = 'text', placeholder, className, value, onChange }) => {
    return (
        <div className='flex flex-col h-[78px] gap-y-2'>
            {label && <label htmlFor={id}>{label}</label>}
            <input
                type={type}
                id={id}
                {...(register ? register(id, validate || {}) : {})}
                disabled={disabled}
                onChange={onChange}
                placeholder={placeholder}
                defaultValue={value}
                className={`${className} px-4 py-2 rounded-md w-full focus:border focus:border-main outline-none border-gray-300`}
            />
            {errors?.[id] && <span className='text-main text-xs'>{errors[id]?.message}</span>}
        </div>
    );
};

InputForms.propTypes = {
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
    onChange: PropTypes.func
};

export default memo(InputForms);

import React from 'react';
import PropTypes from 'prop-types';
import { useController } from 'react-hook-form';

const InputField = ({ placeholder, name, type, value, setValue, invalidFields, setInvalidFields, style }) => {

    return (
        <div>
            <input
                className={`px-4 py-2 rounded-md w-full focus:border focus:border-main outline-none `}
                type={type || 'text'}
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={(e) => setValue(prev => ({ ...prev, [name]: e.target.value }))}
                onFocus={() => setInvalidFields && setInvalidFields([])}
            />
            {invalidFields && invalidFields.map((item, index) => item.name === name && <span key={index} className='text-red-600'>{item.message}</span>)}
        </div>
    );
};

InputField.propTypes = {
    placeholder: PropTypes.string,
    name: PropTypes.string.isRequired,
    type: PropTypes.string,
    invalidFields: PropTypes.any.isRequired,
    setValue: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
    setInvalidFields: PropTypes.any.isRequired,
    style: PropTypes.any,

};

export default InputField;

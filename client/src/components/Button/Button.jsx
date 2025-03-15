import React from 'react';
import PropTypes from 'prop-types'
const Button = ({ type, style, children, handleOnClick }) => {
    return (
        <button type={type || 'button'} className={`inline-flex items-center justify-center px-4 py-2 font-sans font-semibold tracking-wide  text-white rounded-md ${style}`} onClick={() => { handleOnClick && handleOnClick() }}>
            {children}
        </button>
    );
};
Button.propTypes = {
    type: PropTypes.string,
    style: PropTypes.string,
    name: PropTypes.string,
    handleOnClick: PropTypes.func,
    children: PropTypes.node
}
export default Button;
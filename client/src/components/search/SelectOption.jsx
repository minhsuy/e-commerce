import React from 'react';
import PropTypes from "prop-types";

const SelectOption = ({ icon }) => {

    return (
        <div className='w-10 h-10 bg-slate-100 rounded-full border shadow-md flex items-center justify-center hover:bg-white hover:text-main hover:border-white'>
            {icon}
        </div>
    );
};

export default SelectOption;

SelectOption.propTypes = {

    icon: PropTypes.node,
};

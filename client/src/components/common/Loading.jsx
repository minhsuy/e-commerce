import React, { memo } from 'react';
import { HashLoader } from 'react-spinners'
const Loading = () => {
    return (

        <div className="loading">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </div>

    );
};

export default memo(Loading);
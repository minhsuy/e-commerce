import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types'
import { useSearchParams, createSearchParams, useNavigate, useParams, useLocation } from 'react-router-dom';
const PagItem = ({ children }) => {
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams();
    const currentPage = +(searchParams.get('page') || 1);
    const isActive = currentPage === +children;
    const location = useLocation();
    const handleSetPage = () => {
        const params = [];
        for (let item of searchParams.entries()) {
            params.push(item);
        }
        let queries = {}
        queries.page = +children
        navigate({
            pathname: location.pathname,
            search: createSearchParams(queries).toString()
        })
    }

    return (
        <div className={`px-3 py-1 border border-gray-300 hover:bg-gray-300 rounded-md cursor-pointer ${+searchParams.get('page') === +children && 'text-white bg-main'} ${!searchParams.get('page') && children === 1 && 'text-white bg-main'} `} onClick={handleSetPage}>
            {children}
        </div>
    );
};
PagItem.propTypes = {
    children: PropTypes.node
}
export default PagItem;
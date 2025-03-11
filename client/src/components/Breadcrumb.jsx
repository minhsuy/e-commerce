import React from 'react';
import useBreadcrumbs from "use-react-router-breadcrumbs";
import { Link, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { icons } from '../utils/icons'



const Breadcrumb = ({ title, category }) => {
    const { IoIosArrowForward } = icons

    const routes = [
        { path: "/:category", breadcrumb: category },
        { path: "/", breadcrumb: "Home" },
        { path: "/:category/:pid/:title", breadcrumb: title },

    ];
    const breadcrumbs = useBreadcrumbs(routes);
    return (
        <div className='text-sm flex items-center mt-3'>
            {breadcrumbs.filter(el => !el?.match?.route === false).map(({
                match,
                breadcrumb
            }, index, self) => (
                <span key={match.pathname}>
                    <Link to={match.pathname} className='flex items-center gap-x-2 hover:text-main' >
                        <span className='capitalize'> {breadcrumb}</span>
                        {index === self.length - 1 ? "" : <span> <IoIosArrowForward></IoIosArrowForward></span>}
                    </Link>
                </span>
            ))}
        </div>
    );
};
Breadcrumb.propTypes = {
    title: PropTypes.string,
    category: PropTypes.string,
};

export default Breadcrumb;
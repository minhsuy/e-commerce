import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom'
const withBaseComponent = (Component) => {
    const WrappedComponent = (props) => {
        const navigate = useNavigate()
        const dispatch = useDispatch()
        const location = useLocation()
        return <Component {...props} navigate={navigate} dispatch={dispatch} location={location} />
    }
    WrappedComponent.displayName = `withBaseComponent(${Component.displayName || Component.name || 'Component'})`;

    return WrappedComponent;
};

export default withBaseComponent;
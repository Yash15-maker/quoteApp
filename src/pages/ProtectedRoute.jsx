import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import LoginPage from './LoginPage';

const ProtectedRoute = ({ children }) => {
    const navigate = useNavigate();
    const token = localStorage.getItem('tokenLogin');

    useEffect(() => {
        if (!token) {
            navigate('/');
        }
    }, [token, navigate]);

    return token ? children : <LoginPage />;
};

ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ProtectedRoute;

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const useAuth = (role) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAuthorized, setIsAuthorized] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const storedUsername = localStorage.getItem('username');
        const storedRole = localStorage.getItem('role');

        if (storedToken && storedUsername && storedRole) {
            setIsAuthenticated(true);
            setIsAuthorized(storedRole === role);
        } else {
            navigate('/login');
        }
    }, [role, navigate]);

    return { isAuthenticated, isAuthorized };
};

export default useAuth;

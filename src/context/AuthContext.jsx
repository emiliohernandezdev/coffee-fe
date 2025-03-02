import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('coffeeToken');
        if(token){
            setIsAuthenticated(true);
        }
    }, []);

    const login = (token) => {
        localStorage.setItem('coffeeToken', token);
        setIsAuthenticated(true);
    };

    const logout = () => {
        localStorage.removeItem('coffeeToken');
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );

}
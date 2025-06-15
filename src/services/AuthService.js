import { useNavigate } from 'react-router-dom';
import api from './ApiConfig';

export const AuthService = {
    getCategories: async () => {
        const response = await api.get(`/category/all`);
        return response.data;
    },

    login: async (email, password) => {
        const response = await api.post(`/auth/login`, {
            email,
            password
        });
        return response.data;
    },

    getProfile: async() => {
        const response = await api.get(`/auth/me`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('coffeeToken')}`
            }
        });
        return response.data;
    },

    getPermissions: async() => {
        const response = await api.get(`/auth/me/permissions`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('coffeeToken')}`
            }
        });
        return response.data;
    },


    forgotPassword: async(email) => {
        const response = await api.post(`/auth/forgot-password`, {
            email
        });
        return response.data;
    },

    redirect: async (role) => {
        const navigate = useNavigate();

        switch(role.name){
            case "admin":
                navigate("/admin/dashboard");
                break;
            case "user":
                navigate("/");
                break;
            default:
                navigate("/login");
        }
    }
};
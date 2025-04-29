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

    forgotPassword: async(email) => {
        const response = await api.post(`/auth/forgot-password`, {
            email
        });
        return response.data;
    }
};
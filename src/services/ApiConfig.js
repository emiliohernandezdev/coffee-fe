import axios from 'axios';

export const apiConfig = {
    baseURL: 'http://192.168.0.2:4000/api/v1/',
    socketUrl: 'http://192.168.0.2:4000',
    imagesEndpoint: 'http://192.168.0.2:4000/',
};

const api = axios.create({
    baseURL: apiConfig.baseURL,
});

export const setupInterceptors = (setLoading) => {
    api.interceptors.request.use((config) => {
        setLoading(true);
        return config;
    }, (error) => {
        setLoading(false);
        return Promise.reject(error);
    });

    api.interceptors.response.use((response) => {
        setLoading(false);
        return response;
    }, (error) => {
        console.log(error)
        setLoading(false);
        const message = error?.response?.data?.message || 'Ocurrió un error inesperado.';
        const status = error?.response?.status || 500;
        return Promise.reject({ message, status });
    });
};

export default api;
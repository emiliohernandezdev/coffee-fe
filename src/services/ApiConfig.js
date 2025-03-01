import axios from 'axios';

const apiConfig = {
    baseURL: 'http://192.168.0.11:4000/api/v1/', 
};

const api = axios.create({
    baseURL: apiConfig.baseURL,
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        const message = error?.response?.data?.message || 'Ocurrió un error inesperado.';
        const status = error?.response?.status || 500;

        return Promise.reject({ message, status });
    }
);

export default api;

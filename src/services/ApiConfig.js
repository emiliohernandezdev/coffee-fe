import axios from 'axios';

const apiConfig = {
    baseURL: 'http://localhost:4000/api/v1/', // Cambia a tu URL de backend
};

// Crear instancia de axios
const api = axios.create({
    baseURL: apiConfig.baseURL,
});

// Interceptor para manejar respuestas
api.interceptors.response.use(
    (response) => response, // Si todo es OK, devolver la respuesta
    (error) => {
        // Aquí se manejan los errores globalmente
        const message = error?.response?.data?.message || 'Ocurrió un error inesperado.';
        const status = error?.response?.status || 500;

        // Aquí puedes hacer algo más, como mostrar un alert, loguear el error, etc.
        // Por ejemplo, lanzamos el error para que sea capturado en cualquier parte que haga uso de axios
        return Promise.reject({ message, status });
    }
);

export default api;

import axios from 'axios';
import api from './ApiConfig';

const ProductsService = {
    getAvailableProducts: async () => {
        const response = await api.get("/products");
        return response.data;
    },

    getProductImage: async (id) => {
        const response = await api.get(`/products/${id}/image`, {
            responseType: 'blob'
        });
        const url = URL.createObjectURL(response.data);

        return await url;
    },

    addProduct: async (product) => {
        const response = await api.post("/products/add", product);
        return response.data;
    },

    getProductById: async (id) => {
        const response = await api.get(`/products/${id}`);
        return response.data;
    },

    uploadImages: async (id, images) => {
        const formData = new FormData();
        images.forEach((image) => {
            formData.append('files', image);
        });

        const response = await api.post(`/products/${id}/images`, formData);
        return response.data;
    },

    updateTable: async (id, updates) => {
        var body = { ...updates, id: id };
        const response = await axios.put(`${API_URL}/update`, body);
        return response.data;
    },

    deleteTable: async (id) => {
        await axios.delete(`${API_URL}/${id}`);
    }
};

export default ProductsService;

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

    addProduct: async (e, name, description, price, available, categories, extras, images) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        formData.append("price", parseFloat(price)); // Asegurar número
        formData.append("available", JSON.stringify(available)); // Convertir a JSON booleano

        // Enviar categorías como JSON
        formData.append("categories", JSON.stringify(categories));

        // Enviar opciones y extras como JSON
        // formData.append("options", JSON.stringify(options));
        formData.append("extras", JSON.stringify(extras));

        formData.append("files", images);

        const response = await api.post("/products/add", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
        });
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

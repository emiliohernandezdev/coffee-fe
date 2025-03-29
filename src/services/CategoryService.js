import api from './ApiConfig';


const CategoryService = {
    getCategories: async () => {
        const response = await api.get(`/category/all`);
        return response.data;
    },

    addCategory: async (name, description) => {
        const response = await api.post(`/category/add`, {
            name: name,
            description: description
        });
        return response.data;
    },
};

export default CategoryService;

import api from './ApiConfig';


const CategoryService = {
    getCategories: async () => {
        const response = await api.get(`/category/all`);
        return response.data;
    },

    addCategory: async (name, description) => {
        try{
            const response = await api.post(`/category/add`, {
                name: name,
                description: description
            });
            return response.data;
        }catch(err){
            
        }
    },
};

export default CategoryService;

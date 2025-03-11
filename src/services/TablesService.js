import api from './ApiConfig';

const TablesService = {
    getAllTables: async () => {
        const response = await api.get("/tables");
        return response.data["result"];
    },
    
    addTable: async (table) => {
        const response = await api.post("/add", table);
        return response.data["result"];
    },

    updateTable: async (id, updates) => {

        var body = {...updates, id: id};
        const response = await api.put(`/update`, body);
        return response.data["result"];
    },

    deleteTable: async (id) => {
        await api.delete(`/${id}`);
    }
};

export default TablesService;

import axios from 'axios';

const API_URL = 'http://localhost:4000/api/v1/tables';

const TablesService = {
    getAllTables: async () => {
        const response = await axios.get(API_URL);
        return response.data["result"];
    },
    
    addTable: async (table) => {
        const response = await axios.post(API_URL + "/add", table);
        return response.data;
    },

    updateTable: async (id, updates) => {

        var body = {...updates, id: id};
        const response = await axios.put(`${API_URL}/update`, body);
        return response.data;
    },

    deleteTable: async (id) => {
        await axios.delete(`${API_URL}/${id}`);
    }
};

export default TablesService;

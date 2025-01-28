import api from "./ApiConfig";

const AuthService = {
    login: async (email, password) => {
        try{
            const response = await api.post(`/auth/login`, {
                email,
                password
            });

            return response.data;
        }catch(error){
            throw error;
        }
    }
}

export default AuthService;
// Servicio para enviar la orden al backend

import axios from "axios";
import api from "./ApiConfig";

export const OrderService = {
    createOrder: async (orderData) => {
        const response = await api.post(`/order/create`, orderData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('coffeeToken')}`
            }
        });
        return response.data;
    },
};

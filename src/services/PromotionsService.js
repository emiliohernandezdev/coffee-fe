import api from './ApiConfig';

const PromotionsService = {
  getPromotions: async () => {
    const response = await api.get('/promotions');
    return response.data;
  },

  createPromotion: async (promotionData) => {
    const formData = new FormData();
    formData.append('title', promotionData.title);
    formData.append('description', promotionData.description);
    formData.append('price', promotionData.price);
    formData.append('products', JSON.stringify(promotionData.products));
    formData.append('image', promotionData.image);

    const response = await api.post('/promotions', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  deletePromotion: async (id) => {
    const response = await api.delete(`/promotions/${id}`);
    return response.data;
  },

  updatePromotion: async (id, promotionData) => {
    const formData = new FormData();
    formData.append('title', promotionData.title);
    formData.append('description', promotionData.description);
    formData.append('price', promotionData.price);
    formData.append('products', JSON.stringify(promotionData.products));
    if (promotionData.image) {
      formData.append('image', promotionData.image);
    }

    const response = await api.put(`/promotions/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }
};

export default PromotionsService;
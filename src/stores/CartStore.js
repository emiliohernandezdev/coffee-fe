import { create } from 'zustand';

export const useCartStore = create((set) => ({
  cart: JSON.parse(localStorage.getItem('cart')) || [],
  addToCart: (item) =>
    set((state) => {
      const exists = state.cart.find((i) => i._id === item._id);
      let newCart;
      if (exists) {
        newCart = state.cart.map((i) =>
          i._id === item._id ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        newCart = [...state.cart, { ...item, quantity: 1 }];
      }
      localStorage.setItem('cart', JSON.stringify(newCart));
      return { cart: newCart };
    }),
  removeFromCart: (id) =>
    set((state) => {
      const newCart = state.cart.filter((i) => i._id !== id);
      localStorage.setItem('cart', JSON.stringify(newCart));
      return { cart: newCart };
    }),
  clearCart: () => {
    localStorage.removeItem('cart');
    set({ cart: [] });
  },
  updateQuantity: (id, quantity) =>
    set((state) => {
      const newCart = state.cart.map((i) =>
        i._id === id ? { ...i, quantity } : i
      );
      localStorage.setItem('cart', JSON.stringify(newCart));
      return { cart: newCart };
    }),
}));
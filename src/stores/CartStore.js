import { create } from 'zustand';

const areOptionsEqual = (opts1, opts2) => {
  if (opts1.length !== opts2.length) return false;
  return opts1.every((opt, index) => {
    return opt._id === opts2[index]._id && 
           opt.name === opts2[index].name && 
           opt.values === opts2[index].values;
  });
};

export const useCartStore = create((set) => ({
  cart: JSON.parse(localStorage.getItem('cart')) || [],
  addToCart: (item, selectedOptions = []) =>
    set((state) => {
      // Buscar si existe un ítem con el mismo ID y las mismas opciones
      const exists = state.cart.find((i) => 
        i._id === item._id && 
        areOptionsEqual(i.selectedOptions || [], selectedOptions)
      );
      
      let newCart;
      if (exists) {
        newCart = state.cart.map((i) =>
          i._id === item._id && areOptionsEqual(i.selectedOptions || [], selectedOptions)
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      } else {
        newCart = [...state.cart, { 
          ...item, 
          quantity: 1,
          selectedOptions: selectedOptions,
          // Agregar un ID único para este ítem en el carrito (combinando productId + opciones)
          cartItemId: `${item._id}-${JSON.stringify(selectedOptions)}`
        }];
      }
      localStorage.setItem('cart', JSON.stringify(newCart));
      return { cart: newCart };
    }),
  removeFromCart: (cartItemId) =>
    set((state) => {
      const newCart = state.cart.filter((i) => i.cartItemId !== cartItemId);
      localStorage.setItem('cart', JSON.stringify(newCart));
      return { cart: newCart };
    }),
  clearCart: () => {
    localStorage.removeItem('cart');
    set({ cart: [] });
  },
  updateQuantity: (cartItemId, quantity) =>
    set((state) => {
      const newCart = state.cart.map((i) =>
        i.cartItemId === cartItemId ? { ...i, quantity } : i
      );
      localStorage.setItem('cart', JSON.stringify(newCart));
      return { cart: newCart };
    }),
}));
import { CartProduct, SummaryInformation } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";
interface State {
  cart: CartProduct[];
  getTotalItems: () => number;
  addProductToCart: (product: CartProduct) => void;
  updateProductQuantity: (product: CartProduct, quantity: number) => void;
  deleteProduct: (product: CartProduct) => void;
  getSummaryInformation: () => SummaryInformation;
  clearCart: () => void;
}

export const useCartStore = create<State>()(
  persist(
    (set, get) => ({
      clearCart: () => {
        set({ cart: [] });
      },
      getSummaryInformation: () => {
        const { cart } = get();
        const productsQuantity = cart.reduce(
          (totalItems, item) => totalItems + item.quantity,
          0,
        );
        const subtotal = cart.reduce(
          (subTotal, item) => item.quantity * item.price + subTotal,
          0,
        );
        const taxes = subtotal * 0.15;
        const total = subtotal + taxes;

        return {
          productsQuantity,
          subtotal,
          taxes,
          total,
        };
      },
      getTotalItems: () => {
        const { cart } = get();
        return cart.reduce((total, item) => total + item.quantity, 0);
      },
      cart: [],
      addProductToCart: (product: CartProduct) => {
        const { cart } = get();
        const productInCart = cart.some(
          (item) => item.id === product.id && item.size === product.size,
        );

        if (!productInCart) {
          set({ cart: [...cart, product] });
          return;
        }

        const updatedCartProducts = cart.map((item) => {
          if (item.id === product.id && item.size === product.size) {
            return { ...item, quantity: item.quantity + product.quantity };
          }
          return item;
        });

        set({ cart: updatedCartProducts });
      },
      updateProductQuantity: (product, quantity) => {
        const { cart } = get();
        const updatedCartProducts = cart.map((item) => {
          if (item.id === product.id && item.size === product.size) {
            return { ...item, quantity };
          }
          return item;
        });

        set({ cart: updatedCartProducts });
      },

      deleteProduct: (product) => {
        const { cart } = get();
        const updatedCartProducts = cart.filter(
          (item) => item.id !== product.id || item.size !== product.size,
        );

        set({ cart: updatedCartProducts });
      },
    }),
    {
      name: "shopping-cart",
    },
  ),
);

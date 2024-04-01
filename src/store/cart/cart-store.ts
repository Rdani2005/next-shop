import { CartProduct } from "@/interfaces";

interface State {
  cart: CartProduct[];
  addProductToCart: (product: CartProduct) => void;
}

export const useCartStore = create<State>()((set, get) => ({
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
      if (item.id === product.size && item.size === product.size) {
        return;
      }
    });
  },
}));

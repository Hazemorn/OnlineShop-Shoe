import type { CartItem } from "../store/slices/cartSlicer";

export const calcTotalPrice = (items: CartItem[]) => {
    return items.reduce((sum, obj) => obj.price * obj.count + sum, 0);
  };
import type { CartItem } from "../store/slices/cartSlicer";

export const calcTotalCount = (items: CartItem[]) => {
    return items.reduce((sum, obj) => obj.count + sum, 0);
  };
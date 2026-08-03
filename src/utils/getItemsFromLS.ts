import { calcTotalCount } from "./calcTotalCount";
import { calcTotalPrice } from "./calcTotalPrice";

export const getItemsFromLS = () => {
    const data = localStorage.getItem('cart');
    const items = data ? JSON.parse(data): [];
    const totalPrice = calcTotalPrice(items);
    const totalCount = calcTotalCount(items);
 
    return {
        items,
        totalPrice,
        totalCount,
    }
  
}
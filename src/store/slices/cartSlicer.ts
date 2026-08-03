import { createSlice } from "@reduxjs/toolkit";
import { getItemsFromLS } from "../../utils/getItemsFromLS";
import { calcTotalPrice } from "../../utils/calcTotalPrice";
import { calcTotalCount } from "../../utils/calcTotalCount";

export interface CartItem {
  id: number;
  title: string;
  price: number;
  size: number;
  rate: number;
  sex: string;
  color: string;
  imageUrl: string;
  count: number;
}

export interface InitState {
  totalPrice: number;
  items: CartItem[];
  totalCount: number;
}

const {items, totalCount, totalPrice} = getItemsFromLS();

const initCart: InitState = {
  totalPrice: totalPrice,
  items: items,
  totalCount: totalCount,
};


export const cartSlice = createSlice({
  name: "cart",
  initialState: initCart,
  reducers: {
    addItem(state, action) {
      const findItem = state.items.find(
        (obj) =>
          obj.id === action.payload.id && obj.size === action.payload.size
      );
      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: action.payload.count,
        });
      }
      state.totalCount = calcTotalCount(state.items);
      state.totalPrice = calcTotalPrice(state.items);
    },
    minusItem(state, action) {
        const findItem = state.items.find(
          obj => obj.id === action.payload.id && obj.size === action.payload.size
      );
      if (findItem) {
            if (findItem.count > 1) {
                findItem.count--;
            }
        }
    state.totalPrice = calcTotalPrice(state.items);
    state.totalCount = calcTotalCount(state.items);
    },
    removeItem(state, action) {
      state.items = state.items.filter(
        (obj) =>
          !(obj.id === action.payload.id && obj.size === action.payload.size)
      );
      state.totalPrice = calcTotalPrice(state.items);
      state.totalCount = calcTotalCount(state.items);
      localStorage.setItem('cart', JSON.stringify(state.items));
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
      state.totalCount = 0;
      localStorage.setItem('cart', JSON.stringify([]));
    },
  },
});

export const { addItem, minusItem, removeItem, clearItems } = cartSlice.actions;

export default cartSlice.reducer;

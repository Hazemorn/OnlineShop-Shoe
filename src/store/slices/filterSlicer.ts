import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Item } from "../types/types";

interface FilterResponse {
  status: number;
  message: string;
}

interface FetchSuccessPayload {
  items: Item[];
  status: number;
  message: string;
  hasActiveFilters: boolean;
  //totalCount: number;
}

interface FetchErrorPayload {
  status: number;
  message: string;
}

interface InitData {
  items: Item[];
  page: number;
  sort: string;
  searchValue: string; 
  size: string | null;
  setSort: string | null;
  rate: number | null;
  color: string | null;
  sex: number;
  isLoading: boolean;
  hasActiveFilters: boolean;
  fromHome: boolean;
  //totalCount: number;
  response: FilterResponse;
};

const initFilter: InitData = {
  items: [],
  page: 1,
  sort: "",
  searchValue: "",
  size: null,
  setSort: "",
  rate: null,
  color: null,
  sex: 1,
  isLoading: false, 
  hasActiveFilters: false,
  fromHome: false,
  //totalCount: 0,
  response: {
    status: 0,
    message: "",
  },
};

export const filterSlice = createSlice({
  name: "filter",
  initialState: initFilter,
  reducers: {
    fetchFilter(state) {
      state.isLoading = true;
    },
    setHomeRate (state, action: PayloadAction<boolean>) {
      state.fromHome = action.payload;
      state.page = 1;
    },
    setSort(state, action: PayloadAction<string | null>) {
        state.sort = action.payload;
        state.page = 1;
    },
    setSize(state, action: PayloadAction<string | null>) {
      state.size = action.payload;
      state.page = 1;
    },
    setColor(state, action: PayloadAction<string | null>) {
      state.color = action.payload;
      state.page = 1;
    },
    setSex(state, action: PayloadAction<number>) {
      state.sex = action.payload;
      state.page = 1;
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    setSearchValue(state, action: PayloadAction<string>) {
        state.searchValue = action.payload;
        state.page = 1; 
    },
    fetchFilterSuccess(state, action: PayloadAction<FetchSuccessPayload>) {
      state.isLoading = false;
      state.items = action.payload.items;
      state.hasActiveFilters = action.payload.hasActiveFilters;
      state.response = {
        status: action.payload.status,
        message: action.payload.message,
      };
    },
    fetchFilterError(state, action: PayloadAction<FetchErrorPayload>) {
      state.isLoading = false;
      state.response = {
        status: action.payload.status,
        message: action.payload.message,
      };
    },
  },
});

export const {
  fetchFilter,
  fetchFilterSuccess,
  fetchFilterError,
  setHomeRate,
  setSize,
  setColor,
  setSex,
  setPage,
  setSort,
  setSearchValue,
} = filterSlice.actions;

export default filterSlice.reducer;

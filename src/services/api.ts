import axios from "axios";
import type { AxiosResponse } from "axios";
import type { Item } from "../store/types/types";

const apiURL = import.meta.env.VITE_API_URL;
export const limit = 8;

interface FilteredProductsResponse {
  res: AxiosResponse<Item[]>;
  hasActiveFilters: boolean;
}

interface FetchFilterParams {
    page: number;
    sort?: string;
    searchValue?: string;
    size?: string | null;
    color?: string | null;
    sex?: number;
    fromHome?: boolean;
    //rate?: number | null;
}
  
export default class FilterService {
  static async getFilteredProducts({
    page,
    sort,
    searchValue,
    size,
    color,
    sex,
    fromHome,
    //rate,
  }: FetchFilterParams): Promise<FilteredProductsResponse> {
    const sortQuery = sort ? `&sortBy=price&order=${sort}` : "";
    const searchQuery = searchValue ? `&search=${searchValue}` : "";
    const sizeQuery = size ? `&search=${size}` : "";
    const colorQuery = color ? `&color=${color}` : "";
    const sexQuery = sex && sex !== 1 ? `&sex=${sex}` : ""; //'both'
    //const rateQuery = rate ? `&rate=${rate}`: "";
    const homeQuery = fromHome ? `?page=1&limit=4&sortBy=rate&order=desc`:  "";

    const hasActiveFilters = Boolean(sort || searchValue || size || fromHome || color || (sex && sex !== 1));//'both'
    const paginationQuery = hasActiveFilters ? "" : `?page=${page}&limit=${limit}`;
    
    const queryParams = [paginationQuery, sortQuery, searchQuery, sizeQuery, colorQuery, sexQuery, homeQuery]
    .filter(Boolean)
    .join("");
    const separator = queryParams.startsWith("&") ? "?" : "";
    const cleanParams = queryParams.startsWith("&") ? queryParams.slice(1) : queryParams;

    const url = `${apiURL}${separator}${cleanParams}`;
    const res = await axios.get(url);
    return {
      res,
      hasActiveFilters
    };
  }
}


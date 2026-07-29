import type { AppDispatch } from "../store";
import FilterService from "../../services/api";
import { filterSlice } from '../slices/filterSlicer'

interface FetchFilterParams {
    page: number,
    sort?: string,
    searchValue?: string,
    size?: string,
    color?: string,
    sex?: number,
    fromHome?: boolean,
    rate?: number,
}

export const fetchCurrentFilter =
  (
    params: FetchFilterParams
    // page: number,
    // sort?: string,
    // searchValue?: string,
    // size?: string,
    // color?: string,
    // sex?: number,
    // fromHome?: boolean,
    // rate?: number,
  ) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(filterSlice.actions.fetchFilter());
      const { res, hasActiveFilters } = await FilterService.getFilteredProducts(params);//({ page, sort, searchValue, size, color, sex, fromHome});
      
      dispatch(filterSlice.actions.fetchFilterSuccess({
        items: res.data,
        status: res.status,
        message: res.statusText || "OK",
        hasActiveFilters: hasActiveFilters, 
      }));

  } catch (err: any) {
      if (err.response) {
          const res = err.response;

          if (res.status === 404) {
              dispatch(filterSlice.actions.fetchFilterSuccess({
                items: [],
                status: 404,
                message: "Not Found",
                hasActiveFilters: true,
              }));
          } else {
              dispatch(filterSlice.actions.fetchFilterError({
                status: res.status,
                message: res.statusText || "Server Error"
              }));
          }
      } else {
          alert('Unexpected error, please try again');
          console.log(err);
          dispatch(filterSlice.actions.fetchFilterError({
            status: 500,
            message: err.message || "Network Error"
          }));
      }
  }
  };

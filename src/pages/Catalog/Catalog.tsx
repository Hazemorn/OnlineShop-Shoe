import React from 'react';
import s from "./Сatalog.module.scss";
import { useState, useEffect } from "react";

import Skeleton from "../../components/Skeleton/Skeleton";

const GetInTouch = React.lazy(() => import("../../components/GetInTouch"));
const Sector = React.lazy(() => import("../../components/Sector"));
const CardItem = React.lazy(() => import("../../components/CardItem/CardItem"));

import { OPTIONS } from "../../services/contentData";

import {
  setSort,
  setPage,
  setSearchValue,
} from "../../store/slices/filterSlicer";

import PaginationApp from "../../components/PaginationApp";
import SearchField from "../../components/SearchField";
const Filter = React.lazy(() => import("../../components/Filter"));

import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { fetchCurrentFilter } from "../../store/thunks/fetchFilter";
import { limit } from "../../services/api";

const Catalog = React.memo(() => {
  const dispatch = useAppDispatch();
  const {
    sort,
    isLoading,
    items,
    page,
    size,
    color,
    sex,
    searchValue,
    hasActiveFilters,
    response,
  } = useAppSelector((state) => state.filterReducer);

  const [dropDown, setDropDown] = useState<boolean>(false);

  const isClientPagination = items.length > 8;
  const displayedItems = isClientPagination
    ? items.slice((page - 1) * 8, page * 8)
    : items;

  useEffect(() => {
    dispatch(fetchCurrentFilter({page, sort, searchValue, size, color, sex}));
  }, [page, sort, searchValue, size, color, sex, dispatch]);

  return (
    <div className={s.catalog}>
      <div className={s.catalog__wrapper}>
        <Filter />
        <div className={s.catalog__goods}>
          <div className={s.catalog__sorting}>
            <SearchField
              onSearch={(value) => dispatch(setSearchValue(value))}
            />
            <p onClick={() => setDropDown((prev) => !prev)}>Sorting by...</p>
            {dropDown && (
              <ul>
                {OPTIONS.map((o) => (
                  <li key={o.id} onClick={() => dispatch(setSort(o.value))}>
                    - {o.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <Sector
            body={
              <div className={s.content}>
                {isLoading ? (
                  [...new Array(8)].map((_, index) => <Skeleton key={index} />)
                ) : response.status === 404 ? (
                  <div className={s.content__no_result}>
                    <h2>No result</h2>
                  </div>
                ) : (
                  displayedItems.map((item) => (
                    <CardItem key={item.id} {...item} />
                  ))
                )}
              </div>
            }
          />
          <PaginationApp
            currentPage={page}
            onChangePage={(p) => dispatch(setPage(p))}
            pageCount={2} //!
            disable={hasActiveFilters ? items.length <= limit : false}
          />
        </div>
      </div>
      <GetInTouch />
    </div>
  );
});

export default Catalog;

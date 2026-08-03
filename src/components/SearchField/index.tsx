import React from 'react';
import s from "./SearchField.module.scss";
import { useState, useRef } from "react"; //useCallback
import magnifierImg from "../../assets/icons/magnifier.svg";
//import debounce from 'lodash.debounce';


interface SearchFieldProps {
  onSearch: (value: string) => void;
}

const SearchField = React.memo(({ onSearch }: SearchFieldProps) => {

  const [inputValue, setInputValue] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

//  const updateInputValue = useCallback(
//   debounce((trimmedValue) => {
//     onSearch(trimmedValue);
//   }, 1000),[])

//  const onChangeInput = (event) => {
//   event.preventDefault();
//   const value = event.target.value;
//   setInputValue(value);
//   updateInputValue(event.target.value);
//   const trimmedValue = inputValue.trim();
//   if (trimmedValue.length === 0) {
//     onSearch("");
//     return;
//   }
//  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmedValue = inputValue.trim();

    if (trimmedValue.length === 0) {
      onSearch("");
      return;
    }
    onSearch(trimmedValue);
  };

  return (
    <form   onSubmit={handleSubmit} className={s.search}> 
      <input
        type="search"
        ref={inputRef}
        placeholder="Search"
        value={inputValue}
        onChange={(e) => {
          //onChangeInput(e)
          const value = e.target.value;
          setInputValue(value);
          if (value === "") {
            onSearch("");
          }
        }}
        maxLength={70}
      />
      <button type="submit">
        <img src={magnifierImg} alt={magnifierImg} loading="lazy" />
      </button>
    </form>
  );
});

export default SearchField;

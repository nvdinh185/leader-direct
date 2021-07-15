import React, { useState } from "react";
import { SearchIcon, ClearIcon, SearchWrapper, Input, ClearButton } from "./SearchInput.style";
import ClearSvg from "./07-icon.svg";
import SearchSvg from "./10-icon.svg";

export default function SearchInput({ onChange = console.log, onFocus, onBlur, ...props }) {
  const [searchData, setSearchData] = useState("");
  const handleSearch = (event) => {
    setSearchData(event.target.value);
    onChange(event.target.value);
  };

  return (
    <SearchWrapper>
      <SearchIcon src={SearchSvg} {...props} />
      <Input
        type="search"
        placeholder="Tìm Kiếm ..."
        value={searchData}
        onChange={handleSearch}
        onFocus={onFocus}
        onBlur={onBlur}
        {...props}
      />
      {searchData && (
        <ClearButton onClick={() => setSearchData("")}>
          <ClearIcon src={ClearSvg} />
        </ClearButton>
      )}
    </SearchWrapper>
  );
}

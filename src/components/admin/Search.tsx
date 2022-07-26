import React from "react";
import { BiCaretDown } from "react-icons/bi";
import { FiSearch } from "react-icons/fi";
import * as SearchStyle from "../../styles/Search.styled";
import { useSetRecoilState } from "recoil";
import { searchQuery } from "../../store/atom";
import { useResetRecoilState } from 'recoil';

const SEARCH_QUERY = {
  지원날짜: `&submitdate_like=`,
  지원자명: "&name_like=",
  성별: "&gender_like=",
  생년월일: "&birthday_like=",
  이용수단: "&transportation_like=",
  거주지: "&region_like=",
};

const Search = () => {
  const resetSearchQuery = useResetRecoilState(searchQuery);
  const [open, setOpen] = React.useState<boolean>(false);
  const inputEl = React.useRef<HTMLInputElement>(null);
  const filter = React.useRef<string>("");
  const query = React.useRef<string>("");

  const setSearchQuery = useSetRecoilState<string>(searchQuery);
  const [value, setValue] = React.useState<string>("");

  const handleChange = (event: any): void => {
    setValue(event.target.value);
  };

  const handleSearch = () => {
    query.current = query.current.concat(value);
    setSearchQuery(query.current);
    setValue("");
  };

  return (
    <SearchStyle.SearchContainer>
      <SearchStyle.SearchDropdown>
        <SearchStyle.SelectedDropdown>
          <p>{filter.current}</p>
        </SearchStyle.SelectedDropdown>
        {open &&
          Object.keys(SEARCH_QUERY).map((text, index) => {
            return (
              <SearchStyle.UnSelectedDropdown
                key={index}
                onClick={() => {
                  filter.current = text;
                  query.current = Object.values(SEARCH_QUERY)[index];
                  setOpen(!open);
                  inputEl.current?.focus();
                }}
              >
                <p>{text}</p>
              </SearchStyle.UnSelectedDropdown>
            );
          })}
      </SearchStyle.SearchDropdown>
      <SearchStyle.DropdownButton onClick={() => {
        setOpen(!open);
        resetSearchQuery();
      }}>
        <BiCaretDown style={{ color: `var(--color-main-shade)` }} size={15} />
      </SearchStyle.DropdownButton>
      <SearchStyle.SearchInput
        type="text"
        onChange={handleChange}
        value={value}
        ref={inputEl}
        onFocus={resetSearchQuery}
      />
      <SearchStyle.SearchButton onClick={handleSearch}>
        <FiSearch size={16} />
      </SearchStyle.SearchButton>
    </SearchStyle.SearchContainer>
  );
};

export default Search;

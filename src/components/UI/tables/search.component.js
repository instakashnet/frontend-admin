import { Close, SearchOutlined } from "@material-ui/icons";
import React, { useState } from "react";
import { Button, Input, Spinner } from "reactstrap";

export const Search = ({ onSearch, setSearch, isLoading }) => {
  const [value, setValue] = useState("");

  const onResetSearch = () => {
    if (setSearch) setSearch(null);
    setValue("");
    onSearch();
  };

  const onSearchSubmit = () => {
    onSearch(value);
    if (setSearch) setSearch(value);
  };

  return (
    <div className="flex items-center w-full md:w-2/5 lg:w-1/4 mb-4">
      <div className="relative w-full">
        <Input
          placeholder="Escribe que buscarás"
          className="text-white"
          style={{ borderColor: "#778" }}
          value={value}
          disabled={isLoading}
          onChange={(e) => setValue(e.target.value)}
        />
        <button type="button" className="absolute right-2 top-1.5" onClick={onResetSearch}>
          <Close fontSize="small" />
        </button>
      </div>
      <Button type="button" onClick={onSearchSubmit} disabled={!value || isLoading} className="btn-secondary0 flex items-center ml-2 w-16" style={{ padding: "7px 10px" }}>
        {isLoading ? <Spinner size="sm" /> : <SearchOutlined fontSize="small" />}
      </Button>
    </div>
  );
};

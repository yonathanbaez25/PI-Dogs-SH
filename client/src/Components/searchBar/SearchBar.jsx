import React from "react";
import Style from "./SearchBar.module.css";

export default function SearchBar({ handleChange, handleSubmit }) {
  return (
    <div className={Style.searchContainer}>
      <form onChange={handleChange}>
        <input type="search" placeholder="Busqueda" />
        <button type="submit" onClick={handleSubmit}>
          Search
        </button>
      </form>
    </div>
  );
}

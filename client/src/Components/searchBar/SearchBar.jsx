import React from "react";
import Style from "./SearchBar.module.css";

import searchLogo from "../../img/searchIcon.png";

export default function SearchBar({ handleChange, handleSubmit }) {
  return (
    <div className={Style.searchContainer}>
      <form onChange={handleChange}>
        <input type="search" placeholder="Search" className={Style.input} />
        <button className={Style.btn} type="submit" onClick={handleSubmit}>
          <img src={searchLogo} alt="search" />
        </button>
      </form>
    </div>
  );
}

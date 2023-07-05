import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  filteredByCreate,
  filteredByOrder,
  filteredByTemperaments,
  filteredByWeight,
  getDogs,
  getDogsByRaza,
  getTemperaments,
} from "../../redux/actions";

import Cards from "../cards/Cards";
import SearchBar from "../searchBar/SearchBar";
import { Pagination } from "../pagination/Pagination";

import Style from "./Home.module.css";
import { Link } from "react-router-dom";

export default function Home() {
  const dispatch = useDispatch();

  const { allDog } = useSelector((state) => state);

  /* Filtro sobre la Base de Datos */
  const [search, setSearch] = useState("");

  const handleChange = (event) => {
    const { value } = event.target;
    event.preventDefault();
    setSearch(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(getDogsByRaza(search));
  };

  /* Paginado */
  const [currentPage, setCurrentPage] = useState(1);
  const dogsCardsPerPage = 8;
  const numberOfLastDog = currentPage * dogsCardsPerPage;
  const numberOfFirstDog = numberOfLastDog - dogsCardsPerPage;
  const currentDogs = allDog.slice(numberOfFirstDog, numberOfLastDog);
  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const paginadoPrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const paginadoNext = () => {
    let lastPage = Math.ceil(allDog.length / dogsCardsPerPage);
    if (currentPage < lastPage) setCurrentPage(currentPage + 1);
  };

  useEffect(() => {
    dispatch(getDogs());
    dispatch(getTemperaments());
    dispatch(filteredByTemperaments());
  }, [dispatch]);

  //Temperament Filter
  const { temperaments } = useSelector((state) => state);
  const [temperament, setTemperaments] = useState("all");

  const handleSelectTemperament = (event) => {
    const { value } = event.target;
    event.preventDefault();
    dispatch(filteredByTemperaments(value));
    setTemperaments(value);
    setCurrentPage(1);
  };

  const handleClick = (event) => {
    event.preventDefault();
    dispatch(getDogs());
    setFilterOrder("az");
    setFilterWeight("normal");
    setFilterCreate("all");
    setTemperaments("all");
    setCurrentPage(1);
  };

  //Create Filter
  const [filterCreate, setFilterCreate] = useState("");
  const handleSortCreate = (event) => {
    const { value } = event.target;
    event.preventDefault();
    dispatch(filteredByCreate(value));
    setFilterCreate(value);
    setCurrentPage(1);
  };

  //Weight Filter

  const [filterWeight, setFilterWeight] = useState("");
  const handleSortWeight = (event) => {
    const { value } = event.target;
    event.preventDefault();
    if (value === "normal") {
      dispatch(getDogs());
    }
    dispatch(filteredByWeight(value));
    setFilterWeight(value);
    setCurrentPage(1);
    setFilterOrder("");
  };

  //Order Filter
  const [filterOrder, setFilterOrder] = useState("");
  const handleSortOrder = (event) => {
    const { value } = event.target;
    event.preventDefault();
    dispatch(filteredByOrder(value));
    setFilterOrder(value);
    setCurrentPage(1);
    setFilterWeight("");
  };

  return (
    <div className={Style.homeContainer}>
      <div className={Style.cardFilterContainer}>
        <div className={Style.filters}>
          <span> Filter by temperament </span>
          <select value={temperament} onChange={handleSelectTemperament}>
            <option value="all"> All </option>
            {temperaments.map((temp) => (
              <option onClick={handleClick}>{temp.name}</option>
            ))}
          </select>
          <br />
          <span> Sort by weight </span>
          <select value={filterWeight} onChange={handleSortWeight}>
            <option value="normal"> ----- </option>
            <option value="asc"> Lightest </option>
            <option value="desc"> Heaviest</option>
          </select>
          <br />
          <span> Sort by breed </span>
          <select value={filterCreate} onChange={handleSortCreate}>
            <option value="all"> All </option>
            <option value="api"> Api </option>
            <option value="created"> Created </option>
          </select>
          <br />
          <span> Sort by name </span>
          <select value={filterOrder} onChange={handleSortOrder}>
            <option value="az"> A - Z </option>
            <option value="za"> Z - A</option>
          </select>
          <br />
          <div className={Style.buttonCreate}>
            <Link to="/form" style={{ textDecoration: "none", color: "black" }}>
              Create a new breed
            </Link>
          </div>
        </div>
        <h1 className={Style.homeTitle}>Home Page</h1>
        <SearchBar handleChange={handleChange} handleSubmit={handleSubmit} />

        <Cards allDogs={currentDogs} />
        <Pagination
          dogsCardsPerPage={dogsCardsPerPage}
          allDogs={allDog.length}
          paginado={paginado}
          paginadoPrev={paginadoPrev}
          paginadoNext={paginadoNext}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
}

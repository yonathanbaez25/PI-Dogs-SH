import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDogs, getDogsByRaza } from "../../redux/actions";

import Cards from "../cards/Cards";
import SearchBar from "../searchBar/SearchBar";

import Style from "./Home.module.css";

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

  /* Filtro sobre el estado */

  // const [filtered, setFiltered] = useState(allDog);
  // const [search, setSearch] = useState("");

  // const handleChange = (event) => {
  //   const { value } = event.target;
  //   event.preventDefault();
  //   setSearch(value);
  // };

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   const filtered = allDog.filter((dog) => dog.name.includes(search));
  //   setFiltered(filtered);
  // };

  useEffect(() => {
    dispatch(getDogs());
  }, [dispatch]);

  return (
    <div className={Style.homeContainer}>
      <h1 className={Style.homeTitle}>Home Page</h1>
      <SearchBar handleChange={handleChange} handleSubmit={handleSubmit} />
      <Cards allDogs={allDog} />
    </div>
  );
}

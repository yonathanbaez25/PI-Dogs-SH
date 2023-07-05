import React from "react";
import Style from "./Card.module.css";
import { Link } from "react-router-dom";

export default function Card(props) {
  const {
    name,
    image,
    temperament,
    temperaments,
    weight,
    minWeight,
    maxWeight,
    id,
  } = props;
  return (
    <div className={Style.cardContainer}>
      <Link to={`/detail/${id}`}>
        <img className={Style.imgDog} src={image} alt="dog" />
        <h2 className={Style.title}>{name}</h2>
        <p className={Style.temperamentText}>{temperament || temperaments}</p>
        <h4>
          {weight} {minWeight} - {maxWeight} KG
        </h4>
      </Link>
    </div>
  );
}

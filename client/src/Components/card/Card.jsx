import React from "react";
import Style from "./Card.module.css";
import { Link } from "react-router-dom";

export default function Card(props) {
  const { name, image, temperament, peso, id } = props;
  console.log(name);
  return (
    <div className={Style.cardContainer}>
      <Link to={`/detail/${id}`}>
        <img className={Style.imgDog} src={image} alt="dog" />
        <h2 className={Style.title}>{name}</h2>
        <p className={Style.temperamentText}>{temperament}</p>
        <h4>{peso}KG</h4>
      </Link>
    </div>
  );
}

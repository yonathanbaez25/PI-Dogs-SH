import React from "react";
import style from "./Cards.module.css";
import Card from "../card/Card";

export default function Cards({ allDogs }) {
  //console.log(allDogs);
  return (
    <div className={style.cardContainer}>
      {allDogs?.map((dog) => (
        <Card
          key={dog.id}
          id={dog.id}
          name={dog.name}
          image={dog.image?.url || dog.image}
          temperament={dog.temperament}
          peso={dog.weight?.metric}
        />
      ))}
    </div>
  );
}

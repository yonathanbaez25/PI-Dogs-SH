import React from "react";
import style from "./Cards.module.css";
import Card from "../card/Card";

export default function Cards({ allDogs }) {
  return (
    <div className={style.cardContainer}>
      {allDogs?.map((dog) => (
        <Card
          key={dog.id}
          id={dog.id}
          name={dog.name}
          image={dog.image?.url || dog.image}
          temperament={dog.temperament}
          temperaments={dog.temperamentss
            ?.map((temperament) => temperament)
            .join(", ")}
          weight={dog.weight?.metric}
          minWeight={dog.minWeight}
          maxWeight={dog.maxWeight}
        />
      ))}
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getDogsById } from "../../redux/actions";
import Style from "./Detail.module.css";

export default function Detail(props) {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [dog, setDog] = useState({});

  useEffect(() => {
    dispatch(getDogsById(id)).then((res) => {
      setDog(res.payload);
    });
  }, [dispatch, id]);
  console.log(dog);

  return (
    <div className={Style.mainContainer}>
      <h1 className={Style.detailTitle}>Detail</h1>
      <div className={Style.container}>
        <div className={Style.imgContainer}>
          <img
            className={Style.imgDog}
            src={dog.image?.url || dog.image}
            alt="dog"
          />
        </div>
      </div>
      <div className={Style.textWrapper}>
        <h2 className={Style.h2Decoration}>{dog.name}</h2>
      </div>
      <div className={Style.textWrapper}>
        <div className={Style.textItems}>
          <h4>Heigth: </h4>
          <p>
            {dog.height?.metric} {dog.minHeight} - {dog.maxHeight} CM
          </p>
        </div>
        <div className={Style.textItems}>
          <h4>Weigth: </h4>
          <p>
            {dog.weight?.metric} {dog.minWeight} - {dog.maxWeight} KG
          </p>
        </div>
        <div className={Style.textItems}>
          <h4>Life Span: </h4>
          <p> {dog.life_span}</p>
        </div>
        <div className={Style.textItems}>
          <h4> Temperaments: </h4>
          <p className={Style.temperamentText}>
            {Array.isArray(dog.temperament)
              ? dog.temperament.map((temperament) => temperament).join(", ")
              : dog.temperament}
          </p>
        </div>
      </div>
    </div>
  );
}

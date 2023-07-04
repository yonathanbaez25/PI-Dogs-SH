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

  return (
    <div className={Style.cardContainer}>
      <h1>Detail</h1>
      <img className={Style.imgDog} src={dog.image?.url} alt="dog" />
      <h2 className={Style.title}>{dog.name}</h2>
      <p className={Style.temperamentText}>{dog.temperament}</p>
      <h4>{dog.peso}KG</h4>
    </div>
  );
}

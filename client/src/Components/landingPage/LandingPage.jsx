import backGroundImg from "../../img/perroLanding2.jpeg";
import React from "react";
import style from "./LandingPage.module.css";
import { Link } from "react-router-dom";

export default function LandingPage(props) {
  return (
    <div className={style.main}>
      <div className={style.overlay}></div>
      <img src={backGroundImg} alt="" />
      <div className={style.content}>
        <h1>Landing Page</h1>
        <Link to={"/home"}>
          <button className={style.buttonSubmit}>Go! Home</button>
        </Link>
      </div>
    </div>
  );
}

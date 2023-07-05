import React from "react";
import style from "./LandingPage.module.css";
import { Link } from "react-router-dom";

export default function LandingPage(props) {
  return (
    <div className={style.main}>
      <div className={style.content}>
        <h1 className={style.title}>Welcome</h1>
        <h4 className={style.subTitle}>PI Dogs Henry</h4>
        <Link to={"/home"}>
          <button className={style.buttonSubmit}>Go! Home</button>
        </Link>
      </div>
    </div>
  );
}

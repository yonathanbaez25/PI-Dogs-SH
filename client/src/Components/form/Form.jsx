import React from "react";
import CreateDog from "../createDog/CreateDog";
import iconoAtras from "../../img/icono-atras-2.png";
import { Link } from "react-router-dom";

import Style from "./Form.module.css";

export default function Form(props) {
  return (
    <div>
      <div className={Style.back}>
        <Link to="/home">
          <img
            src={iconoAtras}
            alt="Back"
            height="50px"
            width="50px"
            style={{ marginLeft: "50px" }}
          />
        </Link>
        <p className={Style.return}>Return</p>
      </div>
      <div>
        <CreateDog />
      </div>
    </div>
  );
}

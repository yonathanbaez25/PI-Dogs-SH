import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTemperaments, postDog } from "../../redux/actions";

import Style from "./CreateDog.module.css";

const validate = (input) => {
  let error = {};

  if (!input.name) {
    error.name = "Nombre es requerido";
  }

  if (!input.image) {
    error.image = "Imagen es requerido";
  }

  if (Number(input.minHeight) <= 0 || Number(input.minHeight) >= 100) {
    error.minHeight = "Minimun height must be in a number from 0 - 100";
  }

  if (Number(input.maxHeight) <= 0 || Number(input.maxHeight) > 100) {
    error.maxHeight = "Maximun height must be in a number from 0 - 100";
  }

  if (Number(input.minWeight) <= 0 || Number(input.minWeight >= 100)) {
    error.minWeight = "Minimum heigh must be in a number from 0 - 100";
  }

  if (Number(input.maxWeight) <= 0 || Number(input.maxWeight > 100)) {
    error.maxWeight = "Maximun weight must be in a number from 0 - 150";
  }

  if (!input.life_span) {
    error.life_span = "Life span is required";
  } else if (input.life_span > 20 || input.life_span < 1) {
    error.life_span = "life span must be in a number from 1 - 20";
  }
  if (!input.temperament.length) {
    error.temperaments = "Select at least 1 temperament";
  }

  return error;
};

export default function CreateDog(props) {
  const dispatch = useDispatch();
  const { temperaments } = useSelector((state) => state);
  const [error, setError] = useState("");
  const [input, setInput] = useState({
    name: "",
    image: "",
    minHeight: "",
    maxHeight: "",
    maxWeight: "",
    minWeight: "",
    life_span: "",
    temperament: [],
  });

  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    event.preventDefault();

    setInput({
      ...input,
      [name]: value,
    });
    setError(
      validate({
        ...input,
        [name]: value,
      })
    );
  };

  const handleSelect = (event) => {
    if (
      input.temperament.find(
        (temperament) => temperament.id === event.target.value.split(",")[0]
      )
    ) {
      console.log({ input });
      alert("Already in the list");
    } else {
      setInput({
        ...input,
        temperament: [
          ...input.temperament,
          {
            id: event.target.value.split(",")[0],
            name: event.target.value.split(",")[1],
          },
        ],
      });
    }
  };

  const handleDelete = (event) => {
    setInput({
      ...input,
      temperament: input.temperament.filter((element) => element !== event),
    });
  };

  const handleSubmit = (event) => {
    const {
      name,
      image,
      minHeight,
      maxHeight,
      minWeight,
      maxWeight,
      life_span,
      temperament,
    } = input;
    if (
      name &&
      image &&
      minHeight &&
      maxHeight &&
      minWeight &&
      maxWeight &&
      life_span &&
      temperament
    ) {
      event.preventDefault();
      dispatch(
        postDog({
          name,
          image,
          minHeight,
          maxHeight,
          minWeight,
          maxWeight,
          life_span,
          temperaments: temperament.map((t) => Number(t.id)),
        })
      );
      alert(`El perro ${name} se ha creado correctamente`);
      setInput({
        name: "",
        life_span: "",
        minWeight: "",
        maxWeight: "",
        minHeight: "",
        maxHeight: "",
        image: "",
        temperament: [],
      });
    } else {
      alert("Wrong information");
      event.preventDefault();
    }
  };

  return (
    <div className={Style.container}>
      <h1 className={Style.title}>Create your own breed</h1>
      <form className={Style.form} onSubmit={handleSubmit}>
        <div className={Style.titles}>
          <label>Name</label>
          <label>Image</label>
          <label>Height</label>
          <label>Weight</label>
          <label>Life Span</label>
          <label>Temperaments</label>
        </div>

        <div className={Style.input}>
          <div style={{ width: "300px" }}>
            <input
              style={{ width: "300px" }}
              name="name"
              value={input.name}
              placeholder="Nombre"
              onChange={handleChange}
            />
          </div>
          <br />
          <div style={{ width: "300px" }}>
            <input
              style={{ width: "300px" }}
              name="image"
              value={input.image}
              placeholder="Imagen"
              onChange={handleChange}
            />
          </div>
          <br />
          <div className={Style.heightDiv}>
            <input
              type="number"
              name="maxHeight"
              value={input.maxHeight}
              placeholder="Altura maxima"
              onChange={handleChange}
            />

            <input
              type="number"
              name="minHeight"
              value={input.minHeight}
              placeholder="Altura minima"
              onChange={handleChange}
              style={{ marginLeft: "10px" }}
            />
          </div>
          <br />
          <div className={Style.weightDiv}>
            <input
              type="number"
              name="maxWeight"
              value={input.maxWeight}
              placeholder="Peso maximo"
              onChange={handleChange}
            />

            <input
              type="number"
              name="minWeight"
              value={input.minWeight}
              placeholder="Peso minimo"
              onChange={handleChange}
              style={{ marginLeft: "10px" }}
            />
          </div>
          <br />
          <div style={{ width: "300px" }}>
            <input
              style={{ width: "300px" }}
              type="number"
              name="life_span"
              value={input.life_span}
              placeholder="Años de vida"
              onChange={handleChange}
            />
          </div>
          <br />
          <div>
            <select name="temperament" onChange={handleSelect}>
              {temperaments?.map((element, index) => (
                <option value={`${element.id},${element.name}`} key={index}>
                  {element.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </form>
      <div>
        {input.temperament.map((element, index) => (
          <button
            key={index}
            type="reset"
            onClick={() => handleDelete(element)}
            className={Style.buttonTemperament}
          >
            {element.name} X
          </button>
        ))}
        {error.temperament && <p className="error">{error.temperament}</p>}
      </div>
      <div className={Style.submit}>
        <button
          className={Style.buttonSubmit}
          type="submit"
          onClick={handleSubmit}
        >
          Create Breed
        </button>
      </div>
      <br />
      <div>
        <span>{error.name}</span>
        <span>{error.image}</span>
        <span>{error.maxHeight}</span>
        <span>{error.minHeight}</span>
        <span>{error.maxWeight}</span>
        <span>{error.minWeight}</span>
        <span>{error.life_span}</span>
        <span>{error.temperament}</span>
      </div>
    </div>
  );
}

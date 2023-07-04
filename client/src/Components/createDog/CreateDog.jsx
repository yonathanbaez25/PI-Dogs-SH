import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTemperaments, postDog } from "../../redux/actions";

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
  if (!input.temperaments.length) {
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
    temperaments: [],
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

  const handleSubmit = (event) => {
    const {
      name,
      image,
      minHeight,
      maxHeight,
      minWeight,
      maxWeight,
      life_span,
      temperaments,
    } = input;
    if (
      name &&
      image &&
      minHeight &&
      maxHeight &&
      minWeight &&
      maxWeight &&
      life_span &&
      temperaments
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
          temperaments: temperaments.map((temperament) =>
            Number(temperament.id)
          ),
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
      alert("incomplete or wrong information");
      event.preventDefault();
    }
  };

  return (
    <div>
      <h1>Create Dog</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre</label>
          <input
            name="name"
            value={input.name}
            placeholder="Nombre"
            onChange={handleChange}
          />
          <span>{error.name}</span>
        </div>
        <div>
          <label>Imagen</label>
          <input
            name="image"
            value={input.image}
            placeholder="Imagen"
            onChange={handleChange}
          />
          <span>{error.image}</span>
        </div>
        <div>
          <label>Altura</label>
          <input
            type="number"
            name="maxHeight"
            value={input.maxHeight}
            placeholder="Altura maxima"
            onChange={handleChange}
          />
          <span>{error.maxHeight}</span>
          <input
            type="number"
            name="minHeight"
            value={input.minHeight}
            placeholder="Altura minima"
            onChange={handleChange}
          />
          <span>{error.minHeight}</span>
        </div>
        <div>
          <label>Peso</label>
          <input
            type="number"
            name="maxWeight"
            value={input.maxWeight}
            placeholder="Peso maximo"
            onChange={handleChange}
          />
          <span>{error.maxWeight}</span>
          <input
            type="number"
            name="minWeight"
            value={input.minWeight}
            placeholder="Peso minimo"
            onChange={handleChange}
          />
          <span>{error.minWeight}</span>
        </div>
        <div>
          <label>Años de vida</label>
          <input
            type="number"
            name="life_span"
            value={input.life_span}
            placeholder="Años de vida"
            onChange={handleChange}
          />
          <span>{error.life_span}</span>
        </div>
        <div>
          <label>Temperaments</label>
          <select name="temperaments" onChange={handleChange}>
            {temperaments?.map((element, index) => (
              <option value={`${element.id},${element.name}`} key={index}>
                {element.name}
              </option>
            ))}
          </select>
          <span>{error.temperaments}</span>
        </div>
        <div>
          <button type="submit" onClick={handleSubmit}>
            Crear Perro
          </button>
        </div>
      </form>
    </div>
  );
}

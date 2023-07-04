import {
  ADD_DOG,
  GET_DOG_BY_ID,
  GET_DOG_BY_RAZA,
  GET_TEMPERAMENTS,
  POST_DOG,
} from "../types/index.js";
import axios from "axios";

const URL = "http://localhost:3001/";

export const getDogs = () => {
  return async function (dispatch) {
    try {
      const { data } = await axios.get(`${URL}dogs`);
      return dispatch({
        type: ADD_DOG,
        payload: data,
      });
    } catch (error) {
      window.alert(error);
    }
  };
};

export const getDogsByRaza = (name) => {
  return async function (dispatch) {
    try {
      const { data } = await axios.get(`${URL}dogs/?name=${name}`);
      return dispatch({
        type: GET_DOG_BY_RAZA,
        payload: data,
      });
    } catch (error) {
      window.alert(error);
    }
  };
};

export const getDogsById = (id) => {
  return async function (dispatch) {
    try {
      const { data } = await axios.get(`${URL}dogs/${id}`);
      return dispatch({
        type: GET_DOG_BY_ID,
        payload: data,
      });
    } catch (error) {
      window.alert(error);
    }
  };
};

export const getTemperaments = () => {
  return async function (dispatch) {
    try {
      const { data } = await axios.get(`${URL}temperaments`);
      return dispatch({
        type: GET_TEMPERAMENTS,
        payload: data,
      });
    } catch (error) {
      window.alert(error);
    }
  };
};

export const postDog = (dog) => {
  return async function (dispatch) {
    try {
      const { data } = await axios.post(`${URL}dogs`, dog);
      return dispatch({
        type: POST_DOG,
        payload: data,
      });
    } catch (error) {
      window.alert(error);
    }
  };
};

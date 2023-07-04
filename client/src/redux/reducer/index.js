import {
  ADD_DOG,
  GET_DOG_BY_ID,
  GET_DOG_BY_RAZA,
  GET_TEMPERAMENTS,
} from "../types";

const initialState = {
  allDog: [],
  temperaments: [],
  filterUser: [],
  myFavorites: [],
  dog: [],
};

const reducer = (state = initialState, actions) => {
  const { type, payload } = actions;

  switch (type) {
    case ADD_DOG:
      return {
        ...state,
        allDog: payload,
        filterUser: payload,
      };
    case GET_DOG_BY_RAZA:
      return {
        ...state,
        allDog: payload,
      };
    case GET_DOG_BY_ID:
      return {
        ...state,
        dog: payload,
      };
    case GET_TEMPERAMENTS:
      return {
        ...state,
        temperaments: payload,
      };
    default: {
      return {
        ...state,
      };
    }
  }
};

export default reducer;

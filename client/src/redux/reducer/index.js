import {
  ADD_DOG,
  CREATE,
  FILTER_TEMPERAMENTS,
  FILTER_WEIGHT,
  GET_DOG_BY_ID,
  GET_DOG_BY_RAZA,
  GET_TEMPERAMENTS,
  ORDER,
} from "../types";

const initialState = {
  allDog: [],
  temperaments: [],
  myFavorites: [],
  dog: [],
  filterDogs: [],
};

const reducer = (state = initialState, actions) => {
  const { type, payload } = actions;

  switch (type) {
    case ADD_DOG:
      return {
        ...state,
        allDog: payload,
        filterDogs: payload,
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
    case FILTER_TEMPERAMENTS:
      const filterDogs =
        payload === "all"
          ? state.filterDogs
          : state.filterDogs.filter(
              (dog) =>
                dog.temperament?.includes(payload) ||
                dog.temperamentss?.includes(payload)
            );
      return {
        ...state,
        allDog: filterDogs,
      };
    case CREATE:
      const filterCreate =
        payload === "created"
          ? state.filterDogs.filter((dog) => dog.dataBaseDog)
          : payload === "api"
          ? state.filterDogs.filter((dog) => !dog.dataBaseDog)
          : payload === "all" && state.filterDogs;
      return {
        ...state,
        allDog: filterCreate,
      };
    case FILTER_WEIGHT:
      const filterByWeight =
        payload === "desc"
          ? state.allDog.sort((a, b) => {
              return b.maxWeight - a.maxWeight;
            })
          : state.allDog.sort((a, b) => {
              return a.maxWeight - b.maxWeight;
            });
      return {
        ...state,
        allDog: filterByWeight,
      };
    case ORDER:
      const filterByName =
        payload === "az"
          ? state.allDog.sort((a, b) => {
              if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
              if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
              return 0;
            })
          : state.allDog.sort((a, b) => {
              if (a.name.toLowerCase() > b.name.toLowerCase()) return -1;
              if (a.name.toLowerCase() < b.name.toLowerCase()) return 1;
              return 0;
            });
      return {
        ...state,
        allDog: filterByName,
      };
    default: {
      return {
        ...state,
      };
    }
  }
};

export default reducer;

import { ADD_TO_FAV } from "../actions";

const initialState = {
  myProfile: {},
  listPG: [],
  PersonaggioCorrente: {},
};

const MainReducer = (state = initialState, action) => {
  switch (action?.type) {
    case "ADD_MY_PROFILE":
      return { ...state, myProfile: action.payload };
    case "ADD_PG_LIST":
      return { ...state, listPG: action.payload };
    case "SET_PG":
      return { ...state, PersonaggioCorrente: action.payload };
    default:
      return state;
  }
};

export default MainReducer;
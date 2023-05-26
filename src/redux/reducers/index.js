const initialState = {
  myProfile: {},
  listPG: [],
  PersonaggioCorrente: {},
  aggiornamento: false,
};

const MainReducer = (state = initialState, action) => {
  switch (action?.type) {
    case "ADD_MY_PROFILE":
      return { ...state, myProfile: action.payload };
    case "ADD_PG_LIST":
      return { ...state, listPG: action.payload };
    case "SET_PG":
      return { ...state, PersonaggioCorrente: action.payload };
    case "AGGIORNAMENTO":
      return { ...state, aggiornamento: action.payload };
    default:
      return state;
  }
};

export default MainReducer;

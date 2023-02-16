import {
  // CREATE_VG_ERROR,
  // CREATE_VG_SUCCESS,
  // GET_ALL_VG_ERROR,
  // GET_GENRES_ERROR,
  GET_GENRES,
  GET_VG_DETAILS,
  GET_VG_NAME,
  GET_ALL_VG,
} from "./actions";

const initialState = {
  videoGames: [],
  allVideoGames: [],
  genres: [],
  detail: null,
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_VG:
      return {
        ...state,
        videoGames: action.payload,
        allVideoGames: action.payload,
      };

    case GET_VG_NAME:
      return {
        ...state,
        videoGames: action.payload,
        allVideoGames: action.payload,
      };

    case GET_VG_DETAILS:
      return {
        ...state,
        detail: action.payload,
      };
    case GET_GENRES:
      return {
        ...state,
        genres: action.payload,
      };
    default:
      return state;
  }
}


export default rootReducer;
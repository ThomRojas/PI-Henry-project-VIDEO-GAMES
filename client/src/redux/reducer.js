import {
  // CREATE_VG_ERROR,
  // CREATE_VG_SUCCESS,
  // GET_ALL_VG_ERROR,
  // GET_GENRES_ERROR,
  GET_GENRES,
  GET_VG_DETAILS,
  GET_VG_NAME,
  GET_ALL_VG,
  CLEAN_DETAIL,
  FILTER_APIBD,
  FILTER_GAMES_BY_GENRES,
  ORDER_BY_RAITING,
  ORDER_BY_ASC_DES,
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
    case CLEAN_DETAIL:
      return {
        ...state,
        detail: state.payload,
      };
    case FILTER_APIBD:
      let filterCreated = state.allVideoGames;
      if (action.payload === "Created") {
        filterCreated = filterCreated.filter(
          (game) => game.createdByDB === true
        );
      }
      if (action.payload === "API") {
        filterCreated = filterCreated.filter((el) => !el.createdByDB);
      }
      return {
        ...state,
        videoGames: filterCreated,
      };
    case FILTER_GAMES_BY_GENRES:
      let gamesGenresFilter = state.allVideoGames;

      if (action.payload !== "All") {
        gamesGenresFilter = gamesGenresFilter.filter((game) =>
          game.genres.includes(action.payload)
        );
      }
      return {
        ...state,
        videogames: gamesGenresFilter,
      };
    case ORDER_BY_ASC_DES:
      let obrderByAscDesc = state.videoGames;
      action.payload === "ascendente"
        ? obrderByAscDesc.sort(function (a, b) {
            if (a.name > b.name) {
              return 1;
            }
            if (b.name > a.name) {
              return -1;
            }
            return 0;
          })
        : obrderByAscDesc.sort(function (a, b) {
            if (a.name > b.name) {
              return -1;
            }
            if (b.name > a.name) {
              return 1;
            }
            return 0;
          });
      return {
        ...state,
        videoGames: obrderByAscDesc,
      };

    case ORDER_BY_RAITING:
      let filterOrderByRaiting = state.videoGames;
      if (action.payload === "raitingmayor") {
        filterOrderByRaiting = filterOrderByRaiting.sort(function (a, b) {
          if (a.rating > b.rating) {
            return 1;
          }
          if (b.rating > a.rating) {
            return -1;
          }
          return 0;
        });
      }
      if (action.payload === "raitingmenor") {
        filterOrderByRaiting = filterOrderByRaiting.sort(function (a, b) {
          if (a.rating > b.rating) {
            return -1;
          }
          if (b.rating > a.rating) {
            return 1;
          }
          return 0;
        });
      }

      return {
        ...state,
        videoGames: filterOrderByRaiting,
      };
    default:
      return state;
  }
}

export default rootReducer;

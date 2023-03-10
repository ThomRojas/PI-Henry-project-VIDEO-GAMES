import axios from "axios";

export const GET_ALL_VG = "GET_ALL_VG";
export const GET_VG_NAME = "GET_VG_NAME";
export const GET_VG_DETAILS = "GET_VG_DETAILS";
export const GET_VG_DETAILS_ERROR = "GET_VG_DETAILS_ERROR"
export const GET_GENRES = "GET_GENRES";
export const GET_GENRES_ERROR = "GET_GENRES_ERROR";
export const GET_ALL_VG_ERROR = "GET_ALL_VG_ERROR";
export const CREATE_VG_SUCCESS = "CREATE_VG_SUCCESS";
export const CREATE_VG_ERROR = "CREATE_VG_ERROR";
export const CLEAN_DETAIL = "CLEAN_DETAIL";
export const FILTER_GAMES_BY_GENRES = "FILTER_GAMES_BY_GENRES";
export const FILTER_DBGAMES_BY_GENRE = "FILTER_DBGAMES_BY_GENRE";
export const FILTER_APIBD = "FILTER_APIBD";
export const ORDER_BY_ASC_DES = "ORDER_BY_ASC_DES";
export const ORDER_BY_RAITING = "ORDER_BY_RAITING";

export const getVG = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get("http://localhost:3001/videogames");

      if (!response.data || !Array.isArray(response.data)) {
        throw new Error("the returned information was invalid");
      }

      return dispatch({
        type: GET_ALL_VG,
        payload: response.data,
      });
    } catch (error) {
      console.log("there was an error trying to get the information", error);
      return dispatch({
        type: GET_ALL_VG_ERROR,
        payload: error.message,
      });
    }
  };
};

export const getVGName = (name) => {
  return async (dispatch) => {
    try {
      if (!name || typeof name !== "string") {
        throw new Error("The search name is not valid.");
      }

      const response = await axios.get(
        `http://localhost:3001/videogames?name=${name}`
      );

      if (!response.data || !Array.isArray(response.data)) {
        throw new Error("the returned information was invalid");
      }

      return dispatch({
        type: GET_VG_NAME,
        payload: response.data,
      });
    } catch (error) {
      console.log("there was an error trying to eget the information", error);
      return dispatch({
        type: GET_ALL_VG_ERROR,
        payload: "search not complete, please try again latter.",
      });
    }
  };
};

export const getVGDetails = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`http://localhost:3001/videogames/${id}`);
      
      if (response.status === 404) {
        throw new Error("Video game not found");
      }
      
      if (typeof response.data === "string" && response.data === "Error") {
        throw new Error("Error retrieving video game details");
      }
      
      dispatch({
        type: GET_VG_DETAILS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: "GET_VIDEOGAME_DETAILS_ERROR",
        payload: error.message,
      });
    }
  };
};

export const createVideogame = (payload) => {
  return async (dispatch) => {
    try {
      if (!payload || typeof payload !== "object") {
        throw new Error("Invalid information");
      }

      const response = await axios.post(
        `http://localhost:3001/videogames`,
        payload
      );

      if (!response.data) {
        throw new Error("invalid information returned");
      }

      dispatch({
        type: CREATE_VG_SUCCESS,
        payload: response.data,
      });

      return response.data;
    } catch (error) {
      console.log("There was an error trying to create a VideoGame", error);
      dispatch({
        type: CREATE_VG_ERROR,
        payload: "The VideoGame wasnt created, please try latter.",
      });
    }
  };
};

export const getGenres = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`http://localhost:3001/genres`);

      if (!response.data) {
        throw new Error("Invalid information returned");
      }

      return dispatch({
        type: GET_GENRES,
        payload: response.data,
      });
    } catch (error) {
      console.log("There was an error trying to get genres", error);
      dispatch({
        type: GET_GENRES_ERROR,

        payload: "Impossible to get genres, please try latter.",
      });
    }
  };
};

export const cleanState = () => {
  return async (dispatch) => {
    return dispatch({
      type: "CLEAN_DETAIL",
      payload: {},
    });
  };
};

export const filterApiBd = (payload) => {
  return {
    type: FILTER_APIBD,
    payload,
  };
};

export const filterGamesByGenres = (payload) => {
  return {
    type: FILTER_GAMES_BY_GENRES,
    payload,
  };
};

export const orderAscDes = (payload) => {
  return {
    type: ORDER_BY_ASC_DES,
    payload,
  };
};

export const orderByRaiting = (payload) => {
  return {
    type: ORDER_BY_RAITING,
    payload,
  };
};

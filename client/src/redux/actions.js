import axios from "axios";

export const GET_ALL_VG = "GET_ALL_VG";
export const GET_VG_NAME = "GET_VG_NAME";
export const GET_VG_DETAILS = "GET_VG_DETAILS";
export const GET_GENRES = "GET_GENRES";
export const GET_GENRES_ERROR = "GET_GENRES_ERROR";
export const GET_ALL_VG_ERROR = "GET_ALL_VG_ERROR";
export const CREATE_VG_SUCCESS = "CREATE_VG_SUCCESS";
export const CREATE_VG_ERROR = "CREATE_VG_ERROR";

export const getVG = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get("/videogames");

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

      const response = await axios.get(`/videogames?name=${name}`);

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
      if (!id || typeof id !== "number") {
        throw new Error("Wrong ID");
      }

      const response = await axios.get(`/videogames/${id}`);

      if (!response.data) {
        throw new Error("Invalid information returned");
      }

      return dispatch({
        type: GET_VG_DETAILS,
        payload: response.data,
      });
    } catch (error) {
      console.log("There was an error trying to get VideoGame detail", error);
      return dispatch({
        type: GET_ALL_VG_ERROR,
        payload: "Detail search not complete, please try again latter",
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

      const response = await axios.post(`/videogames`, payload);

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
      const response = await axios.get(`/genres`);

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
        payload: "Impossible to get genres, please try latter."
      });
    }
  };
};

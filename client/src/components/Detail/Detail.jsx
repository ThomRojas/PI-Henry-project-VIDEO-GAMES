import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { getVGDetails, cleanState } from "../../redux/actions";
import "./Detail.module.css";

export default function Detail() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  
  const detail = useSelector((state) => state.detail);
  console.log(detail)

  

  useEffect(() => {
    const parsedId = parseInt(id);
    if (isNaN(parsedId)) {
      // handle invalid id, e.g. show an error message
    } else {
      dispatch(getVGDetails(parsedId));
    }
    return function clean() {
      dispatch(cleanState());
    }
  }, [dispatch, id]);
  
  function handleBack(event) {
    event.preventDefault();
    history.goBack();
  }

  if (!detail) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div className="body">
      <div className="Caja">
        <img className="imagen" src={detail.image} alt="imagen" />
        <div>
          <p>Genres: {detail.genres}</p>
          <p>Released: {detail.released} </p>
          <p>Rating: {detail.rating}</p>
          <p>PLATFORMS: {detail.platform?.join(" - ")}</p>
        </div>
        <br />
        <div className="titulos">
          <h1>
            {detail.name} - Details
          </h1>
        </div>
        <div className="description">{detail.description}</div>
        <button className="btn" onClick={handleBack}>
          Go Back
        </button>
      </div>
    </div>
  );
}
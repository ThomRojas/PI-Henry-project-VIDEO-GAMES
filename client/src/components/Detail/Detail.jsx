import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { getVGDetails, cleanState } from "../../redux/actions";
import styles from "./Detail.module.css";

export default function Detail() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  
  console.log(id, "id")
  

  useEffect(() => {
    dispatch(getVGDetails(id));
    return function clean() {
        dispatch(cleanState())
    }
}, [dispatch, id])

const detail = useSelector((state) => state.detail);

  
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
    <div className={styles.body}>
      <div className={styles.Caja}>
        <img className={styles.imagen} src={detail.image} alt="imagen" />
        <div>
          <p>Genres: {detail.genres}</p>
          <p>Released: {detail.released} </p>
          <p>Rating: {detail.rating}</p>
          <p>PLATFORMS: {detail.platform?.join(" - ")}</p>
        </div>
        <br />
        <div className={styles.titulos}>
          <h1>
            {detail.name} - Details
          </h1>
        </div>
        <div className={styles.description}>{detail.description}</div>
        <button className={styles.btn} onClick={handleBack}>
          Go Back
        </button>
      </div>
    </div>
  );
}
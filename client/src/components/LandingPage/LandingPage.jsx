import React from "react";
import { Link } from "react-router-dom";
import styles from "./LandingPage.module.css";
const image = "https://i.postimg.cc/T1dW7sG1/Video-Games.png"
export default function Loading() {
  return (
    <div>
      <div className={styles.landingPage}>
        <img src={image} alt="Descripción de la imagen"></img>
      </div>
      <div>
        <Link to="/home">
          <button className={styles.gamerButton}>START </button>
        </Link>
      </div>
    </div>
  );
}

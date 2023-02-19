import React from "react";
import { Link } from "react-router-dom";
import styles from "./LandingPage.module.css";
const image = "https://i.postimg.cc/wMpKmZNf/2.png";
const logo = "https://i.postimg.cc/DyqXKX51/Logo-oficial.png";

export default function Loading() {
  return (
    <div className={styles.landingPageContainer} >
      <div className={styles.headerContainer}>
        <img
          src={logo}
          alt="Descripción de la imagen"
          className={styles.logoImg}
        ></img>
      </div>
      <div className={styles.landingPage}>
        <img
          src={image}
          alt="Descripción de la imagen"
          className={styles.img}
        ></img>
      </div>
      <div>
        <Link to="/home">
          <a href="#" className={styles.btnNeon}>
            <span id="span1"></span>
            <span id="span2"></span>
            <span id="span3"></span>
            <span id="span4"></span>
            INGRESAR
          </a>
        </Link>
      </div>
    </div>
  );
}

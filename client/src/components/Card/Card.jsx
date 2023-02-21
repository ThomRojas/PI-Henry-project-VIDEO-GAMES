import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styles from "./Card.module.css"

export default function Card({ game }) {
  const { id, image, name, genres, rating } = game;

  return (
    <div className={styles.Cards}>
      <Link to={`/detail/${id}`} className={styles.Card}>
        <img key={id} src={image} alt={name} className={styles.img} />
        <h2>{name}</h2>
        <h4>Genres: {genres}</h4>
        <h4>Rating: {rating}</h4>
      </Link>
    </div>
  );
}

Card.propTypes = {
  game: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    genres: PropTypes.string.isRequired,
    rating: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  }).isRequired,
};
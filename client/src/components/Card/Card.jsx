import React from "react";
import PropTypes from "prop-types";

export default function Card({ game }) {
  const { id, image, name, genres, rating } = game;
  <Card game={{ id: parseInt(game.id),rating: parseFloat(game.rating), ...game }} />


  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <a href={`/detail/${id}`} style={{ textDecoration: "none" }}>
        <img key={game.id} src={image} alt={name} style={{ width: "350px" }} />
        <h2>{name}</h2>
        <h4>Genres: {genres}</h4>
        <h4>Rating: {rating}</h4>
      </a>
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
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Paginate from "../Paginate/Paginate";
import SearchBar from "../SearchBar/SearchBar";
import Card from "../Card/Card";
import {
  getVG,
  getGenres,
  filterGamesByGenres,
  filterApiBd,
  orderAscDes,
  orderByRaiting,
} from "../../redux/actions";
import "./Home.module.css";

export default function Home() {
  const dispatch = useDispatch();
  const allVideoGames = useSelector((state) => state.videoGames);
  const filteredGenres = useSelector((state) => state.genres);

  const [order, setOrder] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const videoGamesPerPage = 15;
  const indexOfLastVideoGames = currentPage * videoGamesPerPage;
  const indexOfFirstVideoGames = indexOfLastVideoGames - videoGamesPerPage;
  const currentVideoGames = allVideoGames.slice(
    indexOfFirstVideoGames,
    indexOfLastVideoGames
  );

  const paginated = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getVG());
    dispatch(getGenres());
  }, [dispatch]);

  function handleClickRefresh(e) {
    e.preventDefault();
    dispatch(getVG());
    dispatch(filterGamesByGenres("All"));
    setCurrentPage(1);
  }

  function handleGamesByGenres(e) {
    dispatch(filteredGenres(e.target.value));
    setCurrentPage(1);
  }

  function handlefilterApiBd(event) {
    dispatch(filterApiBd(event.target.value));
    setCurrentPage(1);
  }

  function handleorderAscDes(event) {
    if (event.target.value === "All") {
      dispatch(getVG());
    }

    event.preventDefault();
    dispatch(orderAscDes(event.target.value));
    setCurrentPage(1);
    setOrder(`sorted ${event.target.value}`);
  }

  function handleOrderByRaiting(event) {
    if (event.target.value === "All") {
      dispatch(getVG());
    }
    event.preventDefault();
    dispatch(orderByRaiting(event.target.value));
    setCurrentPage(1);
    setOrder(`Ordenado ${event.target.value}`);
  }

  if (!currentVideoGames.length) {
    return <div>Loading</div>;
  }
  return (
    <div className="home">
      <div className="navbar">
        <Link to="/" className="navbarlink">
          <h1 className="title">VIDEOGAMES</h1>
        </Link>
        <SearchBar></SearchBar>
        <Link className="navbarlink" to="/createvideogame">
          <h2>Create a new VideoGame</h2>
        </Link>
      </div>

      <div>
        <div className="filtros">
          <button
            className="btnhome"
            onClick={(e) => {
              handleClickRefresh(e);
            }}
          >
            Refresh
          </button>
          <div>
            <h4>Genres</h4>
            {/* Aca Va el listado de los Generos */}
            <select
              className="select"
              onChange={(event) => handleGamesByGenres(event)}
              multiple={false}
            >
              <option name="All">All</option>
              {filteredGenres.map((genre) => (
                <option key={genre.id} value={genre.name}>
                  {genre.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <h4>API or CREATED</h4>

            {/* Aca Va el listado Creados por BD o por Nosotros */}
            <select
              className="select"
              onChange={(event) => handlefilterApiBd(event)}
              multiple={false}
            >
              <option value="All">All</option>
              <option value="API">Api</option>
              <option value="Created">BD</option>
            </select>
          </div>

          <div>
            <h4>Alphabetical</h4>

            <select
              className="select"
              onChange={(event) => handleorderAscDes(event)}
              multiple={false}
            >
              <option value="All">All</option>
              <option value="ascendente">A - Z</option>
              <option value="descendente">Z - A</option>
            </select>
          </div>

          <div>
            <h4>Rating</h4>
            <select
              className="select"
              onChange={(event) => handleOrderByRaiting(event)}
              
            >
              <option value="All">All</option>
              <option value="raitingmenor">Mayor a Menor</option>
              <option value="raitingmayor">Menor a Mayor</option>
            </select>
          </div>
        </div>
        <br />
        <Paginate
          videogamesPerPage={videoGamesPerPage}
          allVideogames={allVideoGames.length}
          paginated={paginated}
          currentPages={currentPage}
        />

        <div className="cajaCards">
          {currentVideoGames === "404" ? (
            <h1>Not Found Videogames whith this name.</h1>
          ) : (
            currentVideoGames?.map((game) => {
              return <Card key={game.id} game={game} />;
            })
          )}
        </div>
        <Paginate
          videogamesPerPage={videoGamesPerPage}
          allVideogames={allVideoGames.length}
          paginated={paginated}
          currentPages={currentPage}
        />
      </div>
    </div>
  );
}

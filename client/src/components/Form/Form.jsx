import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { createVideogame, getGenres } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Form.module.css";

export default function Home() {
  const dispatch = useDispatch();
  const history = useHistory();
  const filterGenresVideoGames = useSelector((state) => state.genres);

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  const [form, setForm] = useState({
    name: "",
    description: "",
    released: "",
    rating: "",
    genres: [],
    platform: [],
    createdByDB: true,
  });

  const [error, setError] = useState("");

  const nameChangeHandler = (event) => {
    const nameValue = event.target.value;
    let letras = /^[ a-zA-ZÀ-ÿ 0-9.]+$/;

    if (!letras.test(nameValue)) {
      setError(["Dont use special characters in name."]);
    } else if (!form.name) {
      setError(...error, "You have to give a name.");
    } else {
      setError("");
    }
    setForm({ ...form, name: nameValue });
  };

  const descriptionChangeHandler = (event) => {
    const descriptionValue = event.target.value;

    setForm({ ...form, description: descriptionValue });
  };

  const releasedChangeHandler = (event) => {
    const releasedValue = event.target.value;

    setForm({ ...form, released: releasedValue });
  };

  const ratingChangeHandler = (event) => {
    const raitingValue = event.target.value;
    if (!(raitingValue >= 0 && raitingValue <= 5)) {
      setError([...error, "Must be a value between 0 and 5."]);
    } else {
      setError("");
    }
    setForm({ ...form, rating: raitingValue });
  };

  const genresChangeHandler = (event) => {
    if (!form.genres.includes(event.target.value)) {
      setForm({
        ...form,
        genres: [...form.genres, event.target.value],
      });
    }
  };

  const platformsChangeHandler = (event) => {
    if (!form.platform.includes(event.target.value)) {
      setForm({
        ...form,
        platform: [...form.platform, event.target.value],
      });
    }
  };

  const backHandler = (event) => {
    event.preventDefault();
    history.goBack();
  };

  const deletePlaformsHandler = (event) => {
    event.preventDefault();
    form.platform.map((ele) => console.log(ele));
    setForm({
      ...form,
      platform: form.platform.filter((elemet) => event.target.id !== elemet),
    });
  };

  const deleteGenresHandler = (event) => {
    event.preventDefault();
    form.genres.map((ele) => console.log(ele));
    setForm({
      ...form,
      genres: form.genres.filter((elemet) => event.target.id !== elemet),
    });
  };

  const submitHandle = (event) => {
    event.preventDefault();
    console.log(form);
    dispatch(createVideogame(form));
    alert("Videogame has been submitted successfully");
    history.push("/home");
  };

  return (
    <form onSubmit={submitHandle}>
      <div className={styles.divBodyContainer}>
        <div className="cajaTitulo">
          <h1 className={styles.cajaTituloHuno}> Create a new VideoGame </h1>
        </div>

        <div className="styles.cajaTituloHuno">
          <div className="inputBox">


          <div>
            <div className={styles.divContainerBox}>
              <span className={styles.span}> Name </span>
                <input
                    className={styles.box}
                    required="required"
                    type="text"
                    onChange={nameChangeHandler}
                    value={form.name}
              />
            </div>
          </div>
            <br/>

          <div>
            <div className={styles.divContainerBox}>
              <span className={styles.span}> Description </span>
                <textarea
                    type="text"
                    className={styles.spanDescription}
                    onChange={descriptionChangeHandler}
                    value={form.description}
                    placeholder="Description"
                />
            </div>
          </div>
          <br/>

            <div>
              <div className={styles.divContainerBox}>
                <span className={styles.spanRelease}>Release </span>
                <input
                  type="date"
                  className={styles.releaseBox}
                  id="releasedDate"
                  onChange={releasedChangeHandler}
                  value={form.released}
                />
              </div>
            </div>
            <br/>


            <div className="styles.cajaTituloHuno">      
              <span className={styles.span}> Rating  </span>
                <input
                  type="number"
                  className={styles.box}
                  onChange={ratingChangeHandler}
                  value={form.rating}
                  multiple={false}
                  placeholder="Rating"
                />
            </div>
            <br/>

            <div>
              <span className={styles.span}> Genres </span>
                <select
                  name=""
                  className={styles.box}
                  id=""
                  onChange={genresChangeHandler}
                  value={form.genres.join("")}
                  multiple={false}
                >
                <option value="Vacio">Choose</option>
                {filterGenresVideoGames.map((genre) => (
                  <option key={genre.id} value={genre.name}>
                    {genre.name}
                </option>
                ))}
              </select>
            </div>
            <br/>

           
            <div>
              <span className={styles.span}> Platfomrs </span>
                <select
                  name=""
                  className={styles.box}
                  id=""
                  onChange={platformsChangeHandler}
                  value={form.platform}
                >
                  <option value="Vacio">Choose</option>
                  <option value="PC">PC</option>
                  <option value="Nintendo">Nintendo</option>
                  <option value="Nintendo switch">Nintendo switch</option>
                  <option value="Xbox 360">Xbox 360</option>
                  <option value="Play Station">Play Station</option>
                  <option value="Play Station 2">Play Station 2</option>
                  <option value="Play Station 3">Play Station 3</option>
                  <option value="Play Station 4">Play Station 4</option>
                  <option value="Xbox One">Xbox One</option>
                  <option value="Xbox Series">Xbox Series</option>
                </select>
            </div>
            <br/>

            
            <div>
            <span className={styles.span}> Genres </span>
              {form.genres.map((elemet) => (
                  <div>
                    <span>{elemet}</span>
                    <button
                      className="btn"
                      onClick={deleteGenresHandler}
                      id={elemet}
                    >
                      x
                    </button>
                  </div>
                ))}
            </div>
            <br/>
            
          </div>

          
            <div>
              <span className={styles.span}> Platforms </span>
              {form.platform.map((elemet) => (
                <div>
                  <span>{elemet}</span>
                  <button onClick={deletePlaformsHandler} id={elemet}>
                    x
                  </button>
                </div>
              ))}
            </div>
            <br/>

          <div className="styles.cajaTituloHuno">{error && <p>{error}</p>}</div>

          <nav className="styles.cajaTituloHuno">
            <button onClick={backHandler}>Atras</button>

            <button
              type="submit"
              className="botonCrearVideoGame"
              disabled={
                !form.name ||
                !form.description ||
                !form.released ||
                !form.rating ||
                !form.platform.length ||
                error
                  ? true
                  : false
              }
            >
              CREAR
            </button>
          </nav>
        </div>
      </div>
    </form>
  );
}

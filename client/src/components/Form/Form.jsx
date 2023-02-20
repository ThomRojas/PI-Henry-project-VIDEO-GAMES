import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { createVideogame, getGenres, getVG } from "../../redux/actions";
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
  const [isValid, setIsValid] = useState(false);


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
    const isFormValid = form.name && form.description && form.released && form.rating && form.platform.length && !error;

   
    setIsValid(isFormValid);
    dispatch(createVideogame(form));
    alert("Videogame has been submitted successfully");
    history.push("/home");
  };

  return (
    <form onSubmit={submitHandle}>
      <div className={styles.divBodyContainer}>
        <div className={styles.titleContainer}>
          <h1>Create a new VideoGame</h1>
        </div>
        <div>
          <div className={styles.divName}>
            <span> Name </span>
          </div>
          <div>
            <input
              className={styles.inputName}
              required="required"
              type="text"
              onChange={nameChangeHandler}
              value={form.name}
              placeholder="VideoGame Name"
            />
          </div>
        </div>
        <div>
          <div className={styles.divName}>
            <span> Description </span>
          </div>
          <div>
            <input
              className={styles.inputName}
              required="required"
              type="text"
              onChange={descriptionChangeHandler}
              value={form.description}
              placeholder="VideoGame Description"
            />
          </div>
        </div>
        <div className={styles.divName}>
          <span>Release </span>
        </div>
        <div>
          <input
            className={styles.inputName}
            type="date"
            id="releasedDate"
            onChange={releasedChangeHandler}
            value={form.released}
          />
        </div>
        <div className={styles.divName}>
          <span>Rating </span>
        </div>
        <div>
          <input
            type="number"
            className={styles.inputName}
            onChange={ratingChangeHandler}
            value={form.rating}
            multiple={false}
            placeholder="Rating"
          />
        </div>
        <div className={styles.divName}>
          <span>Genres </span>
        </div>
        <div>
          <select
            name=""
            className={styles.inputName}
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
        <div className={styles.divName}>
          <span> Platfomrs </span>
        </div>

        <div>
          <select
            name=""
            className={styles.inputName}
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

        <div className={styles.divNameGenresSelected}>
          <span> Genres selected </span>
        </div>
        <div>
          {form.genres.map((elemet) => (
            <div className={styles.spanElementsGenres}>
              <span>{elemet}</span>
              <button
                className={styles.spanShowSelectionButton}
                onClick={deleteGenresHandler}
                id={elemet}
              >
                x
              </button>
            </div>
          ))}
        </div>

        <div className={styles.divNameGenresSelected}>
          <span> Platforms selected </span>
        </div>
        <div>
          {form.platform.map((elemet) => (
            <div className={styles.spanElementsGenres}>
              <span>{elemet}</span>
              <button
                className={styles.spanShowSelectionButton}
                onClick={deletePlaformsHandler}
                id={elemet}
              >
                x
              </button>
            </div>
          ))}
        </div>

        <div>{error && <p>{error}</p>}</div>

        <div>
          <nav >
            <button 
            type="button"
            className={styles.buttonsBacks} 
            onClick={backHandler}
            >
              BACK
              </button>

            <button
              className={`${styles.button} ${isValid? styles.button:""}`}
              type="submit"
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
              CREATE
            </button>
          </nav>
        </div>
      </div>
    </form>
  );
}

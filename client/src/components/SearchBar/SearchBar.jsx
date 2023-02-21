import React, { useState } from 'react';
import { getVGName } from '../../redux/actions';
import { useDispatch } from 'react-redux';
import debounce from 'lodash/debounce';

export default function SearchBar() {
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState('');

  function inputVideogameHandler(event) {
    event.preventDefault();
    dispatch(getVGName(event.target.value)).then((response) => {
      if (response && response.error) {
        setErrorMessage(response.error);
      } else {
        setErrorMessage('VideoGame not found');
      }
    });
  }

  const debouncedInputHandler = debounce(inputVideogameHandler, 500);

  return (
    <div>
      <div className="search">
        <label htmlFor="searchTerm">Search Videogame </label>
      </div>
      <div>
        <input
          id="searchTerm"
          className="searchTerm"
          type="text"
          onChange={debouncedInputHandler}
          onFocus={(e) => e.target.select()}
          placeholder="Enter videogame name"
        />
        {errorMessage && <p>{errorMessage}</p>}
      </div>
    </div>
  );
}
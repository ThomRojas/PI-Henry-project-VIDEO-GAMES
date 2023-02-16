import React from 'react';
import { getVGName } from '../../redux/actions';
import { useDispatch } from 'react-redux';
import debounce from 'lodash/debounce';

export default function SearchBar() {
  const dispatch = useDispatch();

  function inputVideogameHandler(event) {
    event.preventDefault();
    dispatch(getVGName(event.target.value));
  }

  const debouncedInputHandler = debounce(inputVideogameHandler, 500);

  return (
    <div className="search">
      <label htmlFor="searchTerm">Search Videogame:</label>
      <input
        id="searchTerm"
        className="searchTerm"
        type="text"
        onChange={debouncedInputHandler}
        onFocus={(e) => e.target.select()}
        placeholder="Enter videogame name"
      />
    </div>
  );
}
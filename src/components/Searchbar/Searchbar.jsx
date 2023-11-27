import React, { useState } from 'react';
import css from './Searchbar.module.css';

const Searchbar = ({ onSubmit }) => {
  const [searchValue, setSearchValue] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = e => {
    e.preventDefault();

    // Check for an incorrect word (e.g., "error" in this example)
    if (searchValue.toLowerCase() === 'error') {
      setError('Please enter a valid search term.');
    } else {
      setError('');
      onSubmit(searchValue);
    }
  };

  const handleChange = e => {
    setSearchValue(e.target.value);
    setError(''); // Clear error when the user starts typing
  };

  return (
    <header className={css.searchbar}>
      <form className={css.searchform} onSubmit={handleSubmit}>
        <button type="submit" className={css.searchbarBtn}>
          <span className={css.buttonlabel}>Search</span>
        </button>

        <input
          className={css.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={searchValue}
          onChange={handleChange}
        />
      </form>

      {error && <p className={css.error}>{error}</p>}
    </header>
  );
};

export default Searchbar;

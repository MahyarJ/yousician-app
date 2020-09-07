import React from 'react';
import styles from './Searchbar.module.sass';

const Searchbar = ({ placeholder, onSearch }) => {
  const handleKeydown = (event) => {
    if (event.keyCode === 13) onSearch(event.target.value);
  };
  const handleClick = (event) => {
    onSearch(event.target.value);
  };
  return (
    <div className={styles.container}>
      <input
        type="text"
        name="searchBar"
        placeholder={placeholder}
        onKeyDown={handleKeydown}
      />
      <div className={styles.searchButton} onClick={handleClick} />
    </div>
  );
};

export default Searchbar;

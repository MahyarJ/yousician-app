import React, { useState } from 'react';
import styles from './Searchbar.module.sass';

const Searchbar = ({ placeholder, onSearch }) => {
  const [value, setvalue] = useState('');
  const handleChange = (event) => {
    setvalue(event.target.value);
  };
  const handleKeydown = (event) => {
    if (event.keyCode === 13) onSearch(value);
  };
  const handleClick = (event) => {
    onSearch(value);
  };
  return (
    <div className={styles.container}>
      <input
        type="text"
        name="searchBar"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        onKeyDown={handleKeydown}
      />
      <div className={styles.searchButton} onClick={handleClick} />
    </div>
  );
};

export default Searchbar;

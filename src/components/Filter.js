import React from 'react';
import styles from './Filter.module.sass';

const toggleFilter = () => {
  console.log('toggling...');
};

const Filter = (props) => {
  return (
    <div className={styles.container}>
      <div className={styles.filterButton} onClick={toggleFilter}>
        <p>FILTER BY LEVEL</p>
        <div className={styles.filterIcon} />
      </div>
    </div>
  );
};

export default Filter;

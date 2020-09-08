import React, { useState } from 'react';
import styles from './Filter.module.sass';
import LevelIndicator from './LevelIndicator';

const filterMap = new Array(15).fill(0);

const Filter = (props) => {
  const [isOpen, setisOpen] = useState(false);
  const toggleFilter = () => {
    setisOpen(!isOpen);
  };
  return (
    <div className={styles.container}>
      <div className={styles.filterButton} onClick={toggleFilter}>
        <p>{isOpen ? 'HIDE FILTER' : 'FILTER BY LEVEL'}</p>
        <div className={styles.filterIcon} />
      </div>
      {isOpen && (
        <div className={styles.levelPanel}>
          {filterMap.map((_, index) => {
            return <LevelIndicator value={index + 1} />;
          })}
        </div>
      )}
    </div>
  );
};

export default Filter;

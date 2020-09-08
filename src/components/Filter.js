import React, { useState } from 'react';
import styles from './Filter.module.sass';
import LevelIndicator from './LevelIndicator';
import { uniq } from 'lodash';

const filterMap = new Array(15).fill(0);

const Filter = (props) => {
  const [isOpen, setisOpen] = useState(false);
  const [selected, setselected] = useState([]);

  const toggleFilter = () => {
    setisOpen(!isOpen);
  };

  const handleSelectLevel = (level) => {
    console.log(selected);
    if (selected.includes(level)) setselected(selected.filter((s) => s !== level));
    else setselected(uniq(selected.concat(level)));
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
            return (
              <LevelIndicator
                key={index + 1}
                value={index + 1}
                isSelected={selected.includes(index + 1)}
                onSelect={handleSelectLevel}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Filter;

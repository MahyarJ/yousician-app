import React, { useState } from 'react';
import styles from './Filter.module.sass';
import LevelIndicator from './LevelIndicator';
import { uniq } from 'lodash';

const Filter = ({ filterMap, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleFilter = () => {
    setIsOpen(!isOpen);
  };

  const handleSelectLevel = (level) => {
    if (filterMap.includes(level)) {
      onChange(filterMap.filter((s) => s !== level));
    } else {
      onChange(uniq(filterMap.concat(level)));
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.filterButton} onClick={toggleFilter}>
        <p>{isOpen ? 'HIDE FILTER' : 'FILTER BY LEVEL'}</p>
        <div className={styles.filterIcon} />
      </div>
      {isOpen && (
        <div className={styles.levelPanel}>
          {new Array(15).fill(0).map((_, index) => {
            return (
              <LevelIndicator
                key={index + 1}
                value={index + 1}
                isSelected={filterMap.includes(index + 1)}
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

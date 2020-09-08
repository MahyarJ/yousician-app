import React from 'react';
import styles from './LevelIndicator.module.sass';
import classNames from 'classnames/bind';
import CircularProgress from '@material-ui/core/CircularProgress';

const LevelIndicator = ({ value, isSelected, onSelect }) => {
  const cx = classNames.bind(styles);
  const graphStyle = cx({
    levelGraph: true,
    lowLevel: value <= 5,
    midLevel: 5 < value && value <= 10,
    highLevel: 10 < value && value <= 15,
  });

  const labelStyle = cx({
    label: true,
    selectedLabel: isSelected,
  });

  const levelStyle = cx({
    level: true,
    selectedLevel: isSelected,
  });

  const handleSelect = () => {
    if (!onSelect) return;
    onSelect(value);
  };

  return (
    <div className={levelStyle} onClick={handleSelect}>
      {!isSelected && (
        <>
          <CircularProgress
            className={styles.underlyingGraph}
            variant="static"
            value={100}
          />
          <CircularProgress
            className={graphStyle}
            variant="static"
            value={(value * 100) / 15}
          />
          <div className={styles.separator0} />
          <div className={styles.separator1} />
          <div className={styles.separator2} />
        </>
      )}
      <p className={labelStyle}>{value}</p>
    </div>
  );
};
export default LevelIndicator;

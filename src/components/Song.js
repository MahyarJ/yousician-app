import React from 'react';
import styles from './Song.module.sass';
import classNames from 'classnames/bind';
import CircularProgress from '@material-ui/core/CircularProgress';

const Song = ({ song, favoriteId, isDark, toggleFavorite }) => {
  const { id, title, images, artist, level } = song;
  const cx = classNames.bind(styles);
  const graphStyle = cx({
    levelGraph: true,
    lowLevel: level <= 5,
    midLevel: 5 < level && level <= 10,
    highLevel: 10 < level && level <= 15,
  });
  return (
    <li className={styles.container} style={{ background: isDark ? '#101010' : '#000' }}>
      <img src={images} alt="cover" />
      <div className={styles.titleBlock}>
        <h6 className={styles.songTitle}>{title}</h6>
        <p className={styles.songArtist}>{artist}</p>
      </div>
      <div className={styles.level}>
        <CircularProgress
          className={graphStyle}
          variant="static"
          value={(level * 100) / 15}
        />
        <div
          className={styles.separator0}
          style={{ background: isDark ? '#101010' : '#000' }}
        />
        <div
          className={styles.separator1}
          style={{ background: isDark ? '#101010' : '#000' }}
        />
        <div
          className={styles.separator2}
          style={{ background: isDark ? '#101010' : '#000' }}
        />
        <p className={styles.levelValue}>{level}</p>
      </div>
      <div
        className={favoriteId ? styles.favoriteMarked : styles.favoriteDefault}
        onClick={() => toggleFavorite(id, favoriteId)}
      />
    </li>
  );
};

export default Song;

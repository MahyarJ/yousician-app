import React from 'react';
import { Img } from 'react-image';
import styles from './Song.module.sass';
import LevelIndicator from './LevelIndicator';

const Song = ({ song, favoriteId, isDark, toggleFavorite }) => {
  const { id, title, images, artist, level } = song;
  return (
    <li
      className={styles.container}
      style={{ background: isDark ? '#000000' : '#101010' }}
      data-testid="songContainer"
    >
      <Img src={images} unloader={<div className={styles.coverFallback} />} />
      <div className={styles.titleBlock}>
        <h6 className={styles.songTitle}>{title}</h6>
        <p className={styles.songArtist}>{artist}</p>
      </div>
      <div className={styles.levelContainer}>
        <LevelIndicator value={level} />
      </div>
      <div
        className={favoriteId ? styles.favoriteMarked : styles.favoriteDefault}
        onClick={() => toggleFavorite(id, favoriteId)}
      />
    </li>
  );
};

export default Song;

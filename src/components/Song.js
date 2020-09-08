import React from 'react';
import styles from './Song.module.sass';
import LevelIndicator from './LevelIndicator';

const Song = ({ song, favoriteId, isDark, toggleFavorite }) => {
  const { id, title, images, artist, level } = song;
  return (
    <li
      className={styles.container}
      style={{ background: isDark ? '#101010' : '#000000' }}
    >
      <img src={images} alt="cover" />
      <div className={styles.titleBlock}>
        <h6 className={styles.songTitle}>{title}</h6>
        <p className={styles.songArtist}>{artist}</p>
      </div>
      <LevelIndicator value={level} />
      <div
        className={favoriteId ? styles.favoriteMarked : styles.favoriteDefault}
        onClick={() => toggleFavorite(id, favoriteId)}
      />
    </li>
  );
};

export default Song;

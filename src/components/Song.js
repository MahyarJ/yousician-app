import React from 'react';
import styles from './Song.module.sass';

const Song = ({ title, image, artist, level, isDark }) => {
  return (
    <li className={styles.container} style={{ background: isDark ? '#101010' : '#000' }}>
      <img src={image} alt="cover" />
      <div className={styles.titleBlock}>
        <h6 className={styles.songTitle}>{title}</h6>
        <p className={styles.songArtist}>{artist}</p>
      </div>
      <div className={styles.level}>{level}</div>
      <div className={styles.favoriteDefault} />
    </li>
  );
};

export default Song;

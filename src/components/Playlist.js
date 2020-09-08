import React from 'react';
import Song from './Song';
import styles from './Playlist.module.sass';
import { find } from 'lodash';

const Playlist = ({ data, favorites, onToggleFavorite, hasMore }) => {
  return (
    <ul className={styles.list}>
      {data.map((song, index) => {
        const record = find(favorites, (fav) => {
          return fav.songId === song.id;
        });
        return (
          <Song
            key={song.id}
            song={song}
            favoriteId={record ? record.id : null}
            isDark={index % 2}
            toggleFavorite={onToggleFavorite}
          />
        );
      })}

      <div className={styles.loading}>
        {hasMore ? 'LOADING...' : data.length ? '' : 'NO RELATED SONG AVAILABLE'}
      </div>
    </ul>
  );
};

export default Playlist;

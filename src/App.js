import React, { useState, useEffect } from 'react';
import styles from './App.module.sass';
import Searchbar from './components/Searchbar';
import Song from './components/Song';
import axios from 'axios';
import { find } from 'lodash';

const App = () => {
  const [data, setdata] = useState(null);
  const [favorites, setfavorites] = useState([]);
  const [error, seterror] = useState(null);

  const getFavorites = () => {
    const favoritesUrl = 'http://localhost:3004/favorites';
    axios
      .get(favoritesUrl)
      .then((response) => {
        setfavorites(response.data);
      })
      .catch((error) => {
        // handle error
        seterror(error);
        console.log(error);
      })
      .then(() => {
        // always executed
      });
  };

  const handleSearchSongs = (value) => {
    setdata(null);
    const url = 'http://localhost:3004/songs?_start=0&_end=50';
    const params = {
      _start: 0,
      _end: 50,
      search_like: encodeURI(value),
    };

    axios
      .get(url, { params })
      .then((response) => {
        setdata(response.data);
      })
      .catch((error) => {
        // handle error
        seterror(error);
        console.log(error);
      })
      .then(() => {
        // always executed
      });
  };

  const handleToggleFavorite = (songId, favoriteId) => {
    const url = 'http://localhost:3004/favorites';
    if (!favoriteId) {
      axios
        .post(url, { songId })
        .then((response) => {
          getFavorites();
          // setdata(response.data);
          console.log(response);
        })
        .catch((error) => {
          // handle error
          // seterror(error);
          console.log(error);
        })
        .then(() => {
          // always executed
        });
    } else {
      axios
        .delete(url + '/' + favoriteId)
        .then((response) => {
          // setdata(response.data);
          getFavorites();
          console.log(response);
        })
        .catch((error) => {
          // handle error
          // seterror(error);
          console.log(error);
        })
        .then(() => {
          // always executed
        });
    }
  };

  useEffect(() => {
    const songsUrl = 'http://localhost:3004/songs?_start=0&_end=50';
    axios
      .get(songsUrl)
      .then((response) => {
        setdata(response.data);
      })
      .catch((error) => {
        // handle error
        seterror(error);
        console.log(error);
      })
      .then(() => {
        // always executed
      });

    getFavorites();
  }, []);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerContainer}>
          <h1>New Songs Delivered Every Week</h1>
          <p>
            Here are the most recent additions to the Yousician App. Start playing today!
          </p>
          <Searchbar
            placeholder="Search for songs by artist or title"
            onSearch={handleSearchSongs}
          />
        </div>
      </header>
      <main className={styles.mainContainer}>
        <ul className={styles.list}>
          {error ? (
            <div>failed to load</div>
          ) : !data ? (
            <div>loading...</div>
          ) : (
            data.map((song, index) => {
              const record = find(favorites, (fav) => {
                return fav.songId === song.id;
              });

              return (
                <Song
                  key={song.id}
                  song={song}
                  favoriteId={record ? record.id : null}
                  isDark={index % 2}
                  toggleFavorite={handleToggleFavorite}
                />
              );
            })
          )}
        </ul>
      </main>
    </div>
  );
};

export default App;

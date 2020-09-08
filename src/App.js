import React, { useState, useEffect } from 'react';
import styles from './App.module.sass';
import Searchbar from './components/Searchbar';
import Song from './components/Song';
import axios from 'axios';
import { find } from 'lodash';

const pageSize = 20;

const App = () => {
  const [data, setdata] = useState([]);
  const [hasMore, sethasMore] = useState(true);
  const [isLoading, setisLoading] = useState(true);
  const [favorites, setfavorites] = useState([]);
  const [start, setstart] = useState(0);

  const listenToScroll = () => {
    const winScroll = document.documentElement.scrollTop;
    const height =
      document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const position = Math.round((winScroll / height) * 100);
    if (position > 90) setisLoading(true);
  };

  const getFavorites = () => {
    const favoritesUrl = 'http://localhost:3004/favorites';
    axios
      .get(favoritesUrl)
      .then((response) => {
        setfavorites(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .then(() => {
        // always executed
      });
  };

  const getNextPage = () => {
    if (!isLoading || !hasMore) return;
    const songsUrl = `http://localhost:3004/songs?_start=${start}&_limit=${pageSize}`;
    console.log(songsUrl);
    axios
      .get(songsUrl)
      .then((response) => {
        setisLoading(false);
        setstart(start + pageSize);
        if (response.data.length < pageSize) {
          console.log('no more');
          sethasMore(false);
        }
        setdata(data.concat(response.data));
      })
      .catch((error) => {
        console.log(error);
        setisLoading(false);
      });
  };

  const handleSearchSongs = (value) => {
    setdata(null);
    const url = 'http://localhost:3004/songs';
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
          console.log(error);
        })
        .then(() => {
          // always executed
        });
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', listenToScroll);
    return () => {
      window.removeEventListener('scroll', () => {});
    };
  }, []);

  useEffect(() => {
    getNextPage();
  }, [isLoading]);

  useEffect(() => {
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
                toggleFavorite={handleToggleFavorite}
              />
            );
          })}
          {hasMore ? <div className={styles.loading}>LOADING...</div> : <div></div>}
        </ul>
      </main>
    </div>
  );
};

export default App;

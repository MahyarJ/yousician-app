import React, { useState, useEffect } from 'react';
import styles from './App.module.sass';
import Searchbar from './components/Searchbar';
import Playlist from './components/Playlist';
import Filter from './components/Filter';
import axios from 'axios';
import getFavorites from './apis/getFavorites';

const pageSize = 20;

const App = () => {
  const [data, setdata] = useState([]);
  const [hasMore, sethasMore] = useState(true);
  const [isLoading, setisLoading] = useState(true);
  const [favorites, setfavorites] = useState([]);
  const [start, setstart] = useState(0);
  const [search, setsearch] = useState('');
  const [filterMap, setfilterMap] = useState([]);

  const listenToScroll = () => {
    const winScroll = document.documentElement.scrollTop;
    const height =
      document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const position = Math.round((winScroll / height) * 100);
    if (position > 90) setisLoading(true);
  };

  useEffect(() => {
    // GetNextPage
    if (!isLoading || !hasMore) return;
    const url = `${process.env.REACT_APP_API_URL}/songs?`;
    const params = `_start=${start}&_limit=${pageSize}&search_like=${search}`;
    const filter = filterMap.reduce((total, level) => {
      return `${total}&level=${level}`;
    }, '');

    axios
      .get(url + params + filter)
      .then((response) => {
        setisLoading(false);
        setstart((start) => start + pageSize);
        if (response.data.length < pageSize) {
          sethasMore(false);
        }
        setdata((data) => data.concat(response.data));
      })
      .catch((error) => {
        console.log(error);
        setisLoading(false);
      });
  }, [isLoading, search, hasMore, start, filterMap]);

  const handleSearchSongs = (value) => {
    setstart(0);
    setdata([]);
    setisLoading(true);
    sethasMore(true);
    setsearch(encodeURI(value));
  };

  const handleFilterChange = (filterMap) => {
    setstart(0);
    setdata([]);
    setisLoading(true);
    sethasMore(true);
    setfilterMap(filterMap);
  };

  const handleToggleFavorite = (songId, favoriteId) => {
    const url = `${process.env.REACT_APP_API_URL}/favorites`;
    if (!favoriteId) {
      // Handle optimistic UI - Append
      const newFavorites = favorites.concat({ id: 'tempId', songId });
      setfavorites(newFavorites);
      // Call real end-point
      axios
        .post(url, { songId })
        .then((response) => {
          getFavorites()
            .then((response) => {
              setfavorites(response.data);
            })
            .catch((error) => {
              // handle error
            });
        })
        .catch((error) => {
          // handle error
        })
        .then(() => {
          // always executed
        });
    } else {
      // Handle optimistic UI - Remove
      const newFavorites = favorites.filter((fav) => fav.id !== favoriteId);
      setfavorites(newFavorites);
      // Call real end-point
      axios
        .delete(url + '/' + favoriteId)
        .then((response) => {
          getFavorites()
            .then((response) => {
              setfavorites(response.data);
            })
            .catch((error) => {
              console.log(error);
            });
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
    getFavorites()
      .then((response) => {
        setfavorites(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
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
      <main className={styles.main}>
        <div className={styles.mainContainer}>
          <Filter filterMap={filterMap} onChange={handleFilterChange} />
          <Playlist
            data={data}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            hasMore={hasMore}
          />
        </div>
      </main>
    </div>
  );
};

export default App;

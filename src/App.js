import React, { useState, useEffect } from 'react';
import styles from './App.module.sass';
import Searchbar from './components/Searchbar';
import Playlist from './components/Playlist';
import Filter from './components/Filter';
import axios from 'axios';
import getFavorites from './apis/getFavorites';
import toggleFavorites from './apis/toggleFavorites';
import listenToScroll from './helpers/listenToScroll';

const pageSize = 20;

const App = () => {
  const [data, setData] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const [start, setStart] = useState(0);
  const [search, setSearch] = useState('');
  const [filterMap, setFilterMap] = useState([]);

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
        setIsLoading(false);
        setStart((start) => start + pageSize);
        if (response.data.length < pageSize) {
          setHasMore(false);
        }
        setData((data) => data.concat(response.data));
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, [isLoading, search, hasMore, start, filterMap]);

  const handleSearchSongs = (value) => {
    setStart(0);
    setData([]);
    setIsLoading(true);
    setHasMore(true);
    setSearch(encodeURI(value));
  };

  const handleFilterChange = (filterMap) => {
    setStart(0);
    setData([]);
    setIsLoading(true);
    setHasMore(true);
    setFilterMap(filterMap);
  };

  useEffect(() => {
    window.addEventListener('scroll', () => listenToScroll(setIsLoading));
    return () => {
      window.removeEventListener('scroll', () => {});
    };
  }, []);

  useEffect(() => {
    getFavorites()
      .then((response) => {
        setFavorites(response.data);
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
            onToggleFavorite={(songId, favoriteId) =>
              toggleFavorites(songId, favoriteId, favorites, setFavorites)
            }
            hasMore={hasMore}
          />
        </div>
      </main>
    </div>
  );
};

export default App;

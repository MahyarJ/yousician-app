import React, { useState, useEffect } from 'react';
import styles from './App.module.sass';
import Searchbar from './components/Searchbar';
import Song from './components/Song';
import axios from 'axios';

const url = 'http://localhost:3004/songs?_start=0&_end=50';

const App = () => {
  const [data, setdata] = useState(null);
  const [error, seterror] = useState(null);

  const handleSearchSongs = (value) => {
    setdata(null);
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

  useEffect(() => {
    axios
      .get(url)
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
            data.map(({ title, images, artist, level }, index) => {
              return (
                <Song
                  key={index}
                  title={title}
                  level={level}
                  image={images}
                  artist={artist}
                  isDark={index % 2}
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

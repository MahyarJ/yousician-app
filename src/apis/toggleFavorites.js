import getFavorites from './getFavorites';
import axios from 'axios';

const toggleFavorite = (songId, favoriteId, favorites, setFavorites) => {
  const url = `${process.env.REACT_APP_API_URL}/favorites`;
  if (!favoriteId) {
    // Handle optimistic UI - Append
    const newFavorites = favorites.concat({ id: 'tempId', songId });
    setFavorites(newFavorites);
    // Call real end-point
    axios
      .post(url, { songId })
      .then((response) => {
        getFavorites()
          .then((response) => {
            setFavorites(response.data);
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
    setFavorites(newFavorites);
    // Call real end-point
    axios
      .delete(url + '/' + favoriteId)
      .then((response) => {
        getFavorites()
          .then((response) => {
            setFavorites(response.data);
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

export default toggleFavorite;

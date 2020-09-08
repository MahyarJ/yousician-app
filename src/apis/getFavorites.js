import axios from 'axios';

const getFavorites = () => {
  const favoritesUrl = 'http://localhost:3004/favorites';
  return axios.get(favoritesUrl);
};

export default getFavorites;

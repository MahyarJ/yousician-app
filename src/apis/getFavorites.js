import axios from 'axios';

const getFavorites = () => {
  const favoritesUrl = `${process.env.REACT_APP_API_URL}/favorites`;
  return axios.get(favoritesUrl);
};

export default getFavorites;

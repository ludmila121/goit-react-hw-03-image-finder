import axios from 'axios';

const API_KEY = '24773711-fe92a58449d73928c22f0da31';
const BASE_URL = 'https://pixabay.com/api/';
const PER_PAGE = 12;

const getImages = (searchName, page) => {
  return axios
    .get(
      `${BASE_URL}?key=${API_KEY}&q=${searchName}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${PER_PAGE}`
    )
    .then(({ data: { hits, totalHits } }) => ({ hits, totalHits }));
};

const api = {
  getImages,
};

export default api;

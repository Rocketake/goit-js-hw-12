export const API_KEY = '46333898-2c3ef88233fdb340cf3d447ca';
export const BASE_URL = 'https://pixabay.com/api/';
export const PER_PAGE = 15;

import axios from 'axios';

export async function fetchImages(searchQuery, currentPage = 1) {
  const urlParams = new URLSearchParams({
    key: API_KEY,
    q: searchQuery,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: PER_PAGE,
  });

  const url = `${BASE_URL}?key=${API_KEY}&${urlParams}`;

  const {
    data: { articles, totalResults, status, message = '' },
  } = await axios.get(url);

  if (status !== 'ok') {
    loader.classList.toggle('loader');
    throw new Error(message);
  }

  if (articles.length === 0) {
    loader.classList.toggle('loader');
    throw new Error('No photos found');
  }

  return { articles, totalResults };
}

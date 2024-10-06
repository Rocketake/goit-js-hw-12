export const API_KEY = '46333898-2c3ef88233fdb340cf3d447ca';
export const BASE_URL = 'https://pixabay.com/api/';
export const PER_PAGE = 15;

import axios from 'axios';

import { loader } from '../main.js';

export async function fetchImages(searchQuery, currentPage) {
  const urlParams = new URLSearchParams({
    key: API_KEY,
    q: searchQuery,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: PER_PAGE,
    page: currentPage,
  });

  const url = `${BASE_URL}?${urlParams}`;

  const {
    data: { hits, totalHits },
    status,
  } = await axios.get(url);

  if (status !== 200) {
    loader.classList.add('is-hidden');
    throw new Error('Server is not responding properly');
  }

  if (hits.length === 0) {
    loader.classList.add('is-hidden');
    throw new Error('No photos found');
  }

  return { hits, totalHits };
}

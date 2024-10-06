import { fetchImages, PER_PAGE } from './js/pixabay-api';

import { createMarkup, list } from './js/render-function';

// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

const formListener = document.querySelector('.js-search-form');

const loadmoreButton = document.querySelector('.js-btn-load-more');

export const loader = document.querySelector('.loader-js');

formListener.addEventListener('submit', formSubmit);
loadmoreButton.addEventListener('click', formLoadMore);

let currentPage = 1;
let searchQuery = null;
let pages = 0;

async function formSubmit(event) {
  event.preventDefault();

  list.innerHTML = '';
  currentPage = 1;

  const form = event.currentTarget;
  searchQuery = form.elements.query.value;

  if (searchQuery === '') {
    return;
  }

  loadmoreButton.classList.add('is-hidden');
  loader.classList.remove('is-hidden');

  try {
    const { hits, totalHits } = await fetchImages(searchQuery, currentPage);

    pages = Math.ceil(totalHits / PER_PAGE);

    loader.classList.add('is-hidden');

    createMarkup(hits);

    loadmoreButton.classList.remove('is-hidden');
  } catch (error) {
    loadmoreButton.classList.add('is-hidden');
    loader.classList.add('is-hidden');
    console.log(error);

    iziToast.error({
      position: 'topRight',
      message: error.message,
    });
  } finally {
    form.reset();
  }
}

async function formLoadMore() {
  currentPage += 1;

  try {
    loadmoreButton.classList.add('is-hidden');
    loader.classList.remove('is-hidden');

    const { hits } = await fetchImages(searchQuery, currentPage);

    createMarkup(hits);

    windowScroll();

    if (currentPage >= pages) {
      iziToast.info({
        title: '',
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
      return;
    }

    loadmoreButton.classList.remove('is-hidden');
  } catch (error) {
    iziToast.error({
      position: 'topRight',
      message: error.message,
    });
  } finally {
    loader.classList.add('is-hidden');
  }
}

function windowScroll() {
  const lastElement = list.lastElementChild;
  const elementHeight = lastElement.getBoundingClientRect().height;
  window.scrollBy({
    top: elementHeight * 2,
    left: 0,
    behavior: 'smooth',
  });
}

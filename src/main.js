import { fetchImages, PER_PAGE } from './js/pixabay-api';

import { createMarkup, list } from './js/render-function';

// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

const formListener = document.querySelector('.js-search-form');

const loadmoreButton = document.querySelector('.js-btn-load-more');

const loader = document.querySelector('.loader-js');

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
  loader.classList.add('loader');

  try {
    const { articles, totalResults } = await fetchImages(
      searchQuery,
      currentPage
    );

    pages = Math.ceil(totalResults / PER_PAGE);

    loader.classList.remove('loader');

    createMarkup(articles);

    loadmoreButton.classList.remove('is-hidden');
  } catch (error) {
    loadmoreButton.classList.add('is-hidden');
    loader.classList.remove('loader');

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
    loader.classList.add('loader');

    const { articles } = await fetchImages(searchQuery, currentPage);

    createMarkup(articles);

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
    loader.classList.remove('loader');
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

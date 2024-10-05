// Описаний у документації
import SimpleLightbox from 'simplelightbox';
// Додатковий імпорт стилів
import 'simplelightbox/dist/simple-lightbox.min.css';

export const list = document.querySelector('.gallery');

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
  overlayOpacity: 0.7,
});

export const createMarkup = articles => {
  const markup = articles
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<li class="gallery-item">
      <a href="${largeImageURL}" class="gallery-link"><img src="${webformatURL}" alt="${tags}" class="gallery-img"></a>
      <div class="info-wrapper">
        <p class="info-item">likes<span>${likes}</span></p>
        <p class="info-item">views<span>${views}</span></p>
        <p class="info-item">comments<span>${comments}</span></p>
        <p class="info-item">downloads<span>${downloads}</span></p>
      </div>
    </li>`;
      }
    )
    .join('');
  list.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();

  list.addEventListener('click', event => event.preventDefault());
};

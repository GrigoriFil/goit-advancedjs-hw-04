import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryEl = document.querySelector('.gallery');
const loaderEl = document.querySelector('.loader-container');

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

export function createGallery(images) {
  const markup = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
      <li class="gallery-item">
        <a class="gallery-link" href="${largeImageURL}">
          <img class="gallery-image" src="${webformatURL}" alt="${tags}" />
        </a>
        <ul class="stats">
          <li class="stat-item">
            <p class="stat-title">Likes</p>
            <p class="stat-value">${likes}</p>
          </li>
          <li class="stat-item">
            <p class="stat-title">Views</p>
            <p class="stat-value">${views}</p>
          </li>
          <li class="stat-item">
            <p class="stat-title">Comments</p>
            <p class="stat-value">${comments}</p>
          </li>
          <li class="stat-item">
            <p class="stat-title">Downloads</p>
            <p class="stat-value">${downloads}</p>
          </li>
        </ul>
      </li>`
    )
    .join('');

  galleryEl.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}

export function clearGallery() {
  galleryEl.innerHTML = '';
}

export function showLoader() {
  loaderEl.classList.remove('is-hidden');
}

export function hideLoader() {
  loaderEl.classList.add('is-hidden');
}
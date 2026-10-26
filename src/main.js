import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getImagesByQuery } from './js/pixabay-api';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
} from './js/render-functions';

const form = document.querySelector('.form');

const toastOptions = {
  position: 'topRight',
  backgroundColor: '#EF4040',
  messageColor: '#FAFAFB',
  iconColor: '#FAFAFB',
  progressBarColor: '#B51B1B',
  maxWidth: 432,
};

form.addEventListener('submit', onSearch);

function onSearch(event) {
  event.preventDefault();

  const query = event.currentTarget.elements['search-text'].value.trim();

  if (query === '') {
    iziToast.warning({
      message: 'Please enter a search query!',
      position: 'topRight',
    });
    return;
  }

  clearGallery();
  showLoader();

  getImagesByQuery(query)
    .then(data => {
      if (data.hits.length === 0) {
        iziToast.error({
          ...toastOptions,
          message:
            'Sorry, there are no images matching your search query. Please, try again!',
        });
        return;
      }

      createGallery(data.hits);
    })
    .catch(() => {
      iziToast.error({
        ...toastOptions,
        message: 'Something went wrong. Please try again later.',
      });
    })
    .finally(() => {
      hideLoader();
      form.reset();
    });
}
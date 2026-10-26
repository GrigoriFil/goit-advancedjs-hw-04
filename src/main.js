import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getImagesByQuery, PER_PAGE } from './js/pixabay-api';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions';

const form = document.querySelector('.form');
const loadMoreBtn = document.querySelector('.load-more-btn');

let currentQuery = '';
let currentPage = 1;
let maxPage = 0;

const errorToastOptions = {
  position: 'topRight',
  backgroundColor: '#EF4040',
  messageColor: '#FAFAFB',
  iconColor: '#FAFAFB',
  progressBarColor: '#B51B1B',
  maxWidth: 432,
};

form.addEventListener('submit', onSearch);
loadMoreBtn.addEventListener('click', onLoadMore);

async function onSearch(event) {
  event.preventDefault();

  const query = event.currentTarget.elements['search-text'].value.trim();

  if (query === '') {
    iziToast.warning({
      position: 'topRight',
      message: 'Please enter a search query!',
    });
    return;
  }

  currentQuery = query;
  currentPage = 1;

  clearGallery();
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(currentQuery, currentPage);

    if (data.hits.length === 0) {
      iziToast.error({
        ...errorToastOptions,
        message:
          'Sorry, there are no images matching your search query. Please, try again!',
      });
      return;
    }

    maxPage = Math.ceil(data.totalHits / PER_PAGE);

    createGallery(data.hits);

    if (currentPage < maxPage) {
      showLoadMoreButton();
    } else {
      showEndOfResultsMessage();
    }
  } catch (error) {
    iziToast.error({
      ...errorToastOptions,
      message: 'Something went wrong. Please try again later.',
    });
  } finally {
    hideLoader();
    form.reset();
  }
}

async function onLoadMore() {
  currentPage += 1;

  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(currentQuery, currentPage);

    createGallery(data.hits);
    smoothScroll();

    if (currentPage < maxPage) {
      showLoadMoreButton();
    } else {
      showEndOfResultsMessage();
    }
  } catch (error) {
    currentPage -= 1;
    showLoadMoreButton();
    iziToast.error({
      ...errorToastOptions,
      message: 'Something went wrong. Please try again later.',
    });
  } finally {
    hideLoader();
  }
}

function showEndOfResultsMessage() {
  iziToast.info({
    position: 'topRight',
    message: "We're sorry, but you've reached the end of search results.",
  });
}

function smoothScroll() {
  const galleryItem = document.querySelector('.gallery-item');

  if (!galleryItem) {
    return;
  }

  const { height: cardHeight } = galleryItem.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

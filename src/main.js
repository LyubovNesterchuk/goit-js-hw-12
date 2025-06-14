// У файлі main.js напиши всю логіку роботи додатка.Виклики нотифікацій iziToast,
// усі перевірки на довжину масиву в отриманій відповіді та логіку прокручування сторінки(scroll)
// робимо саме в цьому файлі.
// Імпортуй в нього функції із файлів pixabay - api.js та render - functions.js та викликай їх у відповідний момент.


import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions.js';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const input = form.querySelector('input[name="search-text"]');
const loadMoreBtn = document.querySelector('button[type="button"]');
const loader = document.querySelector('.loader');
const galleryContainer = document.querySelector(".gallery");

let query = '';
let page = 1;
const perPage = 15;
let totalHits = 0;

form.addEventListener('submit', handleSubmit);
loadMoreBtn.addEventListener('click', handleLoadMore);


async function handleSubmit(event) {
  event.preventDefault();
  query = input.value.trim();
  page = 1;

  if (!query) {
    iziToast.warning({
      message: 'Please enter a search query!',
      position: 'topRight',
      backgroundColor: '#f1c40f',
    });
    return;
  }

  clearGallery();
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(query, page);
    hideLoader();

    if (!data.hits.length) {
      iziToast.info({
        message: 'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
        backgroundColor: 'red',
      });
      return;
    }

    totalHits = data.totalHits;
    createGallery(data.hits);

    if (totalHits > page * perPage) {
      showLoadMoreButton();
    } else {
      hideLoadMoreButton();
    }
  } catch (error) {
    hideLoader();
    iziToast.error({
      message: `Something went wrong: ${error.message}`,
      position: 'topRight',
    });
  } finally {
    form.reset();
  }
}


async function handleLoadMore() {
  showLoader();
  page += 1;
    
  try {
    const data = await getImagesByQuery(query, page);
    hideLoader();
    createGallery(data.hits);

   
    const { height: cardHeight } = galleryContainer.firstElementChild.getBoundingClientRect();

    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });

    
    const loadedImages = page * perPage;
    if (loadedImages >= totalHits) {
      hideLoadMoreButton();
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
        backgroundColor: '#3498db',
      });
    }
  } catch (error) {
    hideLoader();
    iziToast.error({
      message: `Something went wrong: ${error.message}`,
      position: 'topRight',
    });
  }
}


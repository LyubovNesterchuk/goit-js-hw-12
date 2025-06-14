// У файлі pixabay-api.js зберігай функції для виконання HTTP-запитів:
// getImagesByQuery(query, page).Ця функція повинна приймати два параметри query(пошукове слово, яке є рядком)
// та page(номер сторінки, яка є числом),
// здійснювати HTTP - запит і повертати значення властивості data з отриманої відповіді.

import axios from 'axios';

const API_KEY = '50781688-4c5e14a62117c7affe0b16869';
const BASE_URL = 'https://pixabay.com/api/';
const PER_PAGE = 15;

export async function getImagesByQuery(query, page = 1) {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page,
        per_page: PER_PAGE,
      },
    });

    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch images');
  }
}
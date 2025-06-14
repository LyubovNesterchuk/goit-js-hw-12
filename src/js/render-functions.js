// У файлі render-functions.js створи екземпляр SimpleLightbox для роботи з модальним вікном та
// зберігай функції для відображення елементів інтерфейсу:
// createGallery(images). Ця функція повинна приймати масив images, створювати HTML-розмітку для галереї, додавати
// її в контейнер галереї та викликати метод екземпляра SimpleLightbox refresh(). Нічого не повертає.
// clearGallery(). Ця функція нічого не приймає та повинна очищати вміст контейнера галереї. Нічого не повертає.
// showLoader(). Ця функція нічого не приймає, повинна додавати клас для відображення лоадера. Нічого не повертає.
// hideLoader(). Ця функція нічого не приймає, повинна прибирати клас для відображення лоадера. Нічого не повертає.
// showLoadMoreButton(). Ця функція нічого не приймає, повинна додавати клас для відображення кнопки Load more.
// Нічого не повертає.
// hideLoadMoreButton(). Ця функція нічого не приймає, повинна прибирати клас для відображення кнопки Load more.
// Нічого не повертає.


import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryContainer = document.querySelector(".gallery");
const loader = document.querySelector(".loader");
const loadMoreBtn = document.querySelector('button[type="button"]');

const lightbox = new SimpleLightbox(".gallery a", {
    captionsData: "alt",
    captionDelay: 250,
    captionPosition: "bottom"
});

export function createGallery(images) {
    const markup = images
        .map(
            ({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `
        <li class="gallery-item">
          <a href="${largeImageURL}">
            <img src="${webformatURL}" alt="${tags.split(' ').slice(0, 3).join(' ').replace(/,+$/, '')}" class="gallery-img" loading="lazy" />
          </a>
          <div class="info">
            <p><b>Likes:</b> ${likes}</p>
            <p><b>Views:</b> ${views}</p>
            <p><b>Comments:</b> ${comments}</p>
            <p><b>Downloads:</b> ${downloads}</p>
          </div>
        </li>
      `
        )
        .join('');
    
galleryContainer.insertAdjacentHTML("beforeend", markup);

lightbox.refresh();  
     
}

export function clearGallery() {
    galleryContainer.innerHTML = "";
}

export function showLoader() {
    loader.classList.add("is-visible");
}

export function hideLoader() {
    loader.classList.remove("is-visible");
}

export function showLoadMoreButton() {
    loadMoreBtn.style.display = "block";
  }
  
export function hideLoadMoreButton() {
    loadMoreBtn.style.display = "none";
  }


import { fetchImg, page, perPage, resetPage } from './js/fetchImages';
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";


const refs = {
  formSearch: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
  buttonRef: document.querySelector(".load-more"),
};

buttonHidden();

refs.formSearch.addEventListener('submit', onSearchBtn);
refs.buttonRef.addEventListener('click', onClickNexpPage);
 
let simpleLightbox = new SimpleLightbox('.photo-card a', {
    overlayOpacity: 0.5,
    captionsData: "alt",
    captionDelay: 250,
});

let searchValue = '';

async function onSearchBtn(e) {
  e.preventDefault();
  clearAll();
  searchValue = e.currentTarget.elements.searchQuery.value.trim();

    if (searchValue === '') {
      clearAll();
      Notiflix.Notify.info('You cannot search by empty field, try again.');
      buttonHidden()
      return;
    } else {
        try {
          resetPage();
          const images = await fetchImg(searchValue);
          console.log(page);
           if (images.hits.length < 1) {
               refs.formSearch.reset();
               clearAll();
              Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
              buttonHidden()
            } else {
              refs.formSearch.reset();
               createImage(images.hits);
               buttonShow();
               simpleLightbox.refresh();
               Notiflix.Notify.success(`Hooray! We found ${images.totalHits} images.`);
             
             if (images.totalHits <= page * perPage) {
              buttonHidden()
              refs.formSearch.reset();
             //Notiflix.Notify.success('We are sorry, but you have reached the end of search results.');
          }
            };
        } catch (error) {
            clearAll();
            buttonHidden();
            Notiflix.Report.info('Oh', 'Something get wrong, please try again', 'Okay');
        };
     };
}

async function onClickNexpPage() {   
  try {
    const images = await fetchImg(searchValue)
      createImage(images.hits)
      smoothScroll();
      simpleLightbox.refresh();
    
    if (images.totalHits <= (page - 1) * perPage) {
              buttonHidden()
              refs.formSearch.reset();
             Notiflix.Report.info('We are sorry, but you have reached the end of search results.');
          }
        
    } catch (error) {
       clearAll();
       buttonHidden();
       Notiflix.Report.info('Oh', 'Something get wrong, please try again', 'Okay');
    };
};

function createImage(images) {
  let markupPost = images
    .map(
      ({
        largeImageURL,
        webformatURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<div class="photo-card">
                  <a class="gallery__item" href="${largeImageURL}">
                      <img class="gallery__image" src="${webformatURL}" alt="${tags}" loading="lazy" />
                  </a>
                      <div class="info">
                        <p class="info-item"><b>Likes</b> ${likes}</p>
                        <p class="info-item"><b>Views</b> ${views}</p>
                        <p class="info-item"><b>Comments</b> ${comments}</p>
                        <p class="info-item"><b>Downloads</b> ${downloads}</p>
                      </div>
                </div>`;
      }
    )
    .join('');
  refs.gallery.insertAdjacentHTML('beforeend', markupPost); 
}

function clearAll() {
    refs.gallery.innerHTML = '';
};

function buttonShow() {
  refs.buttonRef.classList.remove('visually-hidden');
};

function buttonHidden() {
    refs.buttonRef.classList.add("visually-hidden");
};

function smoothScroll() {
    const { height: cardHeight } =
        document.querySelector(".photo-card").firstElementChild.getBoundingClientRect();
    window.scrollBy({
    top: cardHeight * 3,
    behavior: "smooth",
});
};


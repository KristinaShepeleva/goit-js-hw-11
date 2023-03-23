import { fetchImg, page, perPage, resetPage } from './js/fetchImages';
import Notiflix from 'notiflix';



const refs = {
  formSearch: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
  //inputRef:  formSearch.querySelector("input"),
  buttonRef: document.querySelector("load-more"),
};


//inputRef.addEventListener('input', onInput);
refs.formSearch.addEventListener('submit', onSearchBtn);

async function onSearchBtn(e) {
  e.preventDefault();
  let searchValue = e.currentTarget.elements.searchQuery.value.trim();

    if (searchValue === '') {
         clearAll();
        // buttonHidden();
        Notiflix.Notify.info('You cannot search by empty field, try again.');
         return;
     } else {
         try {
             resetPage();
             const images = await fetchImg(searchValue);
             if (images.hits < 1) {
              refs.formSearch.reset();
                 clearAll();
              //   buttonHidden();
                 Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
             } else {
              refs.formSearch.reset();
                 createImage(images.hits);
              //   simpleLightbox = new SimpleLightbox(".gallery a", optionsSL).refresh();
             //    buttonUnHidden();
                
                 Notiflix.Notify.success(`Hooray! We found ${images.totalHits} images.`);
           };
        } catch (error) {
             clearAll();
            //buttonHidden();
            Notiflix.Report.info('Oh', 'Something get wrong, please try again', 'Okay');
         };
     };

  }


function createImage(data) {
  let markupPost = data
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
        return `
                  <div class="photo-card">
                  <a class="gallery__item" href="${largeImageURL}">
                      <img class="gallery__image" src="${webformatURL}" alt="${tags}" loading="lazy" />
                      </a>
                      <div class="info">
                        <p class="info-item"><b>Likes</b> ${likes}</p>
                        <p class="info-item"><b>Views</b> ${views}</p>
                        <p class="info-item"><b>Comments</b> ${comments}</p>
                        <p class="info-item"><b>Downloads</b> ${downloads}</p>
                      </div>
                    </div>
                 `;
      }
    )
    .join('');
   
  refs.gallery.insertAdjacentHTML('beforeend', markupPost);
  //lightbox.refresh();
  // smoothScroll();
}


function clearAll() {
    refs.gallery.innerHTML = '';
};


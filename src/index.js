import { fetchImg } from './js/fetchImages';
import Notiflix from 'notiflix';



const refs = {
  formSearch: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
  //inputRef:  formSearch.querySelector("input"),
  //buttonRef: formSearch.querySelector("button"),
};


//inputRef.addEventListener('input', onInput);
refs.formSearch.addEventListener('submit', onSearchBtn);

async function onSearchBtn(e) {
  e.preventDefault();

  let searchValue = e.currentTarget.elements.searchQuery.value.trim();

   //console.log(inputRef.value);
  //console.log(e.currentTarget.elements.searchQuery.value);
  
  if (searchValue) {
    const images = await fetchImg(searchValue);
    if (images.length > 0) {
      refs.formSearch.reset();
      clearAll()
      Notiflix.Notify.info('Sorry, there are no images matching your search query. Please try again.');
      console.log(images);
    } else
      
      
      refs.formSearch.reset();
      
      createImage(images);
      Notiflix.Notify.success(`Hooray! We found ${images.totalHits} images.`);

    

    } 
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
        return `<a class="gallery__item" href="${largeImageURL}">
                  <div class="photo-card">
                      <img src="${webformatURL}" alt="${tags}" loading="lazy" />
                      <div class="info">
                        <p class="info-item"><b>Likes</b> ${likes}</p>
                        <p class="info-item"><b>Views</b> ${views}</p>
                        <p class="info-item"><b>Comments</b> ${comments}</p>
                        <p class="info-item"><b>Downloads</b> ${downloads}</p>
                      </div>
                    </div>
                 </a>`;
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

 
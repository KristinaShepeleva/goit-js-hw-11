

const formRef = document.querySelector(".search-form");
const inputRef = formRef.querySelector("input");
const buttonRef = formRef.querySelector("button");
const divRef = document.querySelector('gallery')

console.log(formRef);

//inputRef.addEventListener('input', onInput);
formRef.addEventListener('submit', onSearchBtn);



async function onSearchBtn(e) {
    e.preventDefault();

    let searchValue = inputRef.value.trim();

    console.log(searchValue);
};


// function onSearchBtn(event) {
//     event.preventDefault();
//      try {
//     const imgs = await fetchImgs();
//     createMarcup(imgs);
//   }  catch (error) {
//     console.log(error.message);
//   }
// };







function createMarcup(imgs) {
    clearMarkup();
    const markupList = imgs
     .map(img => {
       return `<div class="photo-card">
<a class="img-big" href="${img.largeImageURL}">
  <img src="${img.webformatURL}" alt="${img.tags}" loading="lazy" />
</a>
  <div class="info">
    <p class="info-item">${img.likes}
      <b>Likes</b>
    </p>
    <p class="info-item">${img.views}
      <b>Views</b>
    </p>
    <p class="info-item">${img.comments}
      <b>Comments</b>
    </p>
    <p class="info-item">${img.downloads}
      <b>Downloads</b>
    </p>
  </div>
</div>`;
     }).join("");
    divRef.innerHTML = markupList;
}


 function clearMarkup() {
   divRef.innerHTML = '';
 };



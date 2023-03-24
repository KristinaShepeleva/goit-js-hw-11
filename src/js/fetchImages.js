import axios from 'axios';

export const DEFAULT_PAGE = 1;
export let page = DEFAULT_PAGE;

export const perPage = 40;

export async function fetchImg(searchValue) {
    const searchParams = new URLSearchParams({
        key: '10836129-2832e3ff848e050d6947a018c',
        q: searchValue,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        per_page: 40,
        page
    });
     
    try {
        const images = await axios.get(`https://pixabay.com/api/?${searchParams}`).then(page += 1);
        //console.log(images);
        //console.log(images.data);
        //console.log(images.data.hits);
        return images.data;
    } catch (error) {
    console.error(error);
   }
}

export function resetPage() {
    page = DEFAULT_PAGE;
};


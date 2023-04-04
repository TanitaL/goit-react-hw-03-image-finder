
const API_KEY = "33826333-8ed58ef37d24ee746ab39c4fa";
const URL = 'https://pixabay.com/api/';

export function getImages(nextSearchWord, page) { 
    return fetch(`${URL}?q=${nextSearchWord}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`)
        .then(res => res.json())
}
 

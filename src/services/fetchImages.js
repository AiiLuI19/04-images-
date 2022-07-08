import PropTypes from 'prop-types';
function fetchImages(name, page) {
  return fetch(
    `https://pixabay.com/api/?q=${name}&page=${page}&key=28000983-d0b2a085634fa0bb803984db3&image_type=photo&orientation=horizontal&per_page=12`
  ).then(response => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(new Error('нет такой картинки'));
  });
}
fetchImages.PropTypes = {
  name: PropTypes.string,
  page: PropTypes.number,
};
const api = { fetchImages };
export default api;

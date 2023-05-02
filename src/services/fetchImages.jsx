import PropTypes from 'prop-types';
import axios from 'axios';

function fetchImages(searchQuery, page) {
  const response = axios.get(
    `https://pixabay.com/api/?q=${searchQuery}&page=${page}&key=34508452-be9fd8685a6af31007ab8f46e&image_type=photo&orientation=horizontal&per_page=12`
  );
  return response;
}

fetchImages.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
};

export default fetchImages;

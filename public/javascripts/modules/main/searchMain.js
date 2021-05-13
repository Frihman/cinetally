import request from '../functions/request.js';
import checkAddedMovies from '../functions/checkAddedMovies.js';

function addMovie(movie) {
  var arr = JSON.parse(movie);
  document.getElementById(`div_${arr.imdbID}`).removeAttribute('onclick');
  document.getElementById(`i_${arr.imdbID}`).className = 'fas fa-circle-notch fa-spin';
  request('/request/movie', 'POST', movie, function() {
    document.getElementById(`i_${arr.imdbID}`).className = 'fas fa-check';
    document.getElementById(`p_${arr.imdbID}`).innerHTML = 'Added';
    
    document.getElementById(`div_${arr.imdbID}`).onclick = function() {
      request('/request/movie/inactive', 'POST', movie, function(result) {
          document.getElementById(`i_${arr.imdbID}`).className = 'fas fa-plus';
          document.getElementById(`p_${arr.imdbID}`).innerHTML = 'Add to list';
          document.getElementById(`div_${arr.imdbID}`).onclick = function() {
            addMovie(movie);
          }
      });
    }
  });
}

checkAddedMovies();

window.addMovie = addMovie;
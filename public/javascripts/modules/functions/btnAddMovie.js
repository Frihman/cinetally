import request from './request.js';

function addMovie(movie) {
  var arr = JSON.parse(movie);
  document.getElementById(`btnA_${arr.imdbID}`).removeAttribute('onclick');
  document.getElementById(`iA_${arr.imdbID}`).className = 'fas fa-circle-notch fa-spin';
  request('/request/movie', 'POST', movie, function() {
    document.getElementById(`iA_${arr.imdbID}`).className = 'fas fa-check';
    document.getElementById(`pA_${arr.imdbID}`).innerHTML = 'Added';
    
    document.getElementById(`btnA_${arr.imdbID}`).onclick = function() {
      request('/request/movie/inactive', 'POST', movie, function(result) {
          document.getElementById(`iA_${arr.imdbID}`).className = 'fas fa-plus';
          document.getElementById(`pA_${arr.imdbID}`).innerHTML = 'Add to list';
          document.getElementById(`btnA_${arr.imdbID}`).onclick = function() {
            addMovie(movie);
          }
      });
    }
  });
}



window.addMovie = addMovie;
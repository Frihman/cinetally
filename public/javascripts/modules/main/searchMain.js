import request from '../functions/request.js';
import checkAddedMovies from '../functions/checkAddedMovies.js';

var input = document.getElementById('inputBigSearch');
var button = document.getElementById('btnBigSearch');

button.addEventListener('click', function(){
    var path = '/search/' + input.value;
    path = encodeURI(path);
    window.location = path;
});

input.addEventListener('keyup', function(event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      button.click();
    }
});

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
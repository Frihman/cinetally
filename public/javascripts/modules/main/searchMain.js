import request from '../functions/request.js';

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
  request('/request/movie', 'POST', movie, function() {
    movie = JSON.parse(movie);
    document.getElementById(`i_${movie.imdbID}`).className = 'fas fa-check';
    document.getElementById(`p_${movie.imdbID}`).innerHTML = 'Added';
  });

}

window.addMovie = addMovie;
import request from './request.js';
import checkWatchedMovies from './checkWatchedMovies.js';

function addMovie(movie) {
  var arr = JSON.parse(movie);
  document.getElementById(`iA_${arr.imdbID}`).className = 'fas fa-circle-notch fa-spin';
  request('/request/movie', 'POST', movie, function(result) {
    var data = JSON.parse(result);
    if (data.message == 'deleted') {
      document.getElementById(`iA_${arr.imdbID}`).className = 'fas fa-plus';
      document.getElementById(`pA_${arr.imdbID}`).innerHTML = 'Add to list';

      try {document.getElementById(`btnW_${arr.imdbID}`).style.display = 'none';} catch{}
      try {document.getElementById(`iW_${arr.imdbID}`).style.display = 'none';} catch{}
      try {document.getElementById(`pW_${arr.imdbID}`).style.display = 'none';} catch{}
    } else {
      document.getElementById(`iA_${arr.imdbID}`).className = 'fas fa-check';
      document.getElementById(`pA_${arr.imdbID}`).innerHTML = 'Added';

      try {document.getElementById(`btnW_${arr.imdbID}`).style.display = 'inline-block';} catch{}
      try {document.getElementById(`iW_${arr.imdbID}`).style.display = 'inline-block';} catch{}
      try {document.getElementById(`pW_${arr.imdbID}`).style.display = 'inline-block';} catch{}

      try {checkWatchedMovies('moviePage')} catch {}

    }
    
    
  });
}



window.addMovie = addMovie;
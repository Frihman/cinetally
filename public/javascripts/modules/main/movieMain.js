import checkAddedMovies from '../functions/checkAddedMovies.js';
import checkWatchedMovies from '../functions/checkWatchedMovies.js';

window.onload = function(){
    checkAddedMovies();
    checkWatchedMovies('moviePage');
}
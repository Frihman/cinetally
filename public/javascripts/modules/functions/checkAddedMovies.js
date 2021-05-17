import request from './request.js';

export default function checkAddedMovies() {
    const promises = [];

    var divs = document.getElementsByClassName('btnAddMovie');
    for(let i = 0; i < divs.length; i++) {
        let id = divs[i].id.substring(5);
        promises.push(new Promise((resolve, reject) => {
            request('/request/movie/' + id, 'GET', '', function(result) {
                var data = JSON.parse(result);
                resolve();
                if (data.length > 0) {
                    document.getElementById(`iA_${id}`).className = 'fas fa-check';
                    document.getElementById(`pA_${id}`).innerHTML = 'Added';
    
                    var movieData = {imdbID: data[0].ImdbId, Title: data[0].Title, Year: data[0].Year, Poster: data[0].Poster};
    
                    divs[i].onclick = function() {
                        request('/request/movie/inactive', 'POST', JSON.stringify(movieData), function(result) {
                            document.getElementById(`iA_${id}`).className = 'fas fa-plus';
                            document.getElementById(`pA_${id}`).innerHTML = 'Add to list';
                            divs[i].onclick =  function() {
                                addMovie(JSON.stringify(movieData));
                            }
                        });
                    }
                }
            });
        }));

        Promise.all(promises).then(() => {
            console.log('resolved');
        })
        
    }
}
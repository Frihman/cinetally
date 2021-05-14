import request from '../functions/request.js';
import {toggleRemoveMovies} from '../functions/indexControls.js';
import getMoviePage from '../functions/getMoviePage.js';
import bigSearchInput from '../functions/bigSearchInput.js';

export function displayList() {
    bigSearchInput();
    request('/request/movie', 'GET', '', function(result) {
        var data = JSON.parse(result);

        if (data.length > 0) {
            var ul = document.getElementById('entries');
            ul.innerHTML = '';

            for (let i = 0; i < data.length; i++) {
                var li = document.createElement('li');
                li.className= 'entry';
                li.id = `li_${data[i].ImdbId}`;
                li.innerHTML = `
                <img src="${data[i].Poster}">
                <div class="yearTitle">
                <p>${data[i].Year}</p>
                <h3>${data[i].Title}</h3>
                </div>
                `;

                ul.appendChild(li);

            }

            getMoviePage();
        } else {
            document.getElementById('entries').style.display = 'none';
            document.getElementById('controls').style.display = 'none';
            document.getElementById('bigSearch').style.display = 'block';

        }
        

        
    });
}

document.getElementById('removeMovies').addEventListener('click', function() {
    toggleRemoveMovies();
});

window.onload = displayList;
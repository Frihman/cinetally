import request from '../functions/request.js';
import {toggleRemoveMovies} from '../functions/indexControls.js';

function displayList() {
    request('/request/movie', 'GET', '', function(result) {
        var data = JSON.parse(result);

        var ul = document.getElementById('entries');

        for (let i = 0; i < data.length; i++) {
            var li = document.createElement('li');
            li.className= 'entry';
            li.id = `li_${data[i].ImdbId}`;
            li.innerHTML = `<a id="a_${data[i].ImdbId}">
            <img src="${data[i].Poster}">
            <div class="yearTitle">
            <p>${data[i].Year}</p>
            <h3>${data[i].Title}</h3>
            </div>
            </a>
            `;

            ul.appendChild(li);

        }

        
    });
}

document.getElementById('removeMovies').addEventListener('click', function() {
    toggleRemoveMovies();
});

window.onload = displayList;
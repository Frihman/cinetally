import request from '../functions/request.js';
import {toggleRemoveMovies} from '../functions/indexControls.js';
import getMoviePage from '../functions/getMoviePage.js';
import btnWatched from '../functions/btnWatched.js';
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
                var innerHTML = `
                <div id="div_${data[i].ImdbId}" class="entryLink">
                `;

                if(data[i].Poster == 'N/A') {
                    innerHTML += `<img src="https://via.placeholder.com/140x210?text=Cinetally">`;
                } else {
                    innerHTML += `<img src="${data[i].Poster}">`;
                }

                

                innerHTML += `
                <div class="yearTitle">
                <p>${data[i].Year}</p>
                <h3>${data[i].Title}</h3>
                </div>
                </div>
                <div id="btn_${data[i].ImdbId}" class="btnWatched">
                `;

                if(data[i].Watched == 1) {
                    li.style.backgroundColor = 'rgb(0, 202, 0)';
                    innerHTML += `
                    <i id="i_${data[i].ImdbId}" class="fas fa-check"></i>
                    <p id="p_${data[i].ImdbId}">Watched</p>
                    </div>
                    `;
                } else {
                    innerHTML += `
                    <i id="i_${data[i].ImdbId}" class="fas fa-eye"></i>
                    <p id="p_${data[i].ImdbId}">Mark as watched</p>
                    </div>
                    `;
                }

                li.innerHTML = innerHTML;

                ul.appendChild(li);

            }

            getMoviePage();
            btnWatched();

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
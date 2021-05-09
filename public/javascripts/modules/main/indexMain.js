import request from '../functions/request.js';

function displayList() {
    request('/request/movie', 'GET', '', function(result) {
        var data = JSON.parse(result);

        var ul = document.getElementById('entries');

        console.log(data);

        for (let i = 0; i < data.length; i++) {
            var li = document.createElement('li');
            li.innerHTML = `<a>
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

window.onload = displayList;
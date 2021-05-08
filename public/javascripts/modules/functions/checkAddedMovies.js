import request from './request.js';

export default function checkAddedMovies() {
    var divs = document.getElementsByClassName('addMovie');
    for(let i = 0; i < divs.length; i++) {
        let id = divs[i].id.substring(4);
        request('/request/movie/' + id, 'GET', '', function(result) {
            var data = JSON.parse(result);
            if (data.length > 0) {
                console.log(`i_${id}`);
                document.getElementById(`i_${id}`).className = 'fas fa-check';
                document.getElementById(`p_${id}`).innerHTML = 'Added';
            }
        });
    }
}
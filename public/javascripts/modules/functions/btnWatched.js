import request from './request.js';

export default function btnWatched() {
    var buttons = document.getElementsByClassName('btnWatched');

    for(let i = 0; i < buttons.length; i++) {
        
        buttons[i].onclick = function() {
            let id = buttons[i].id.substring(4);
            markAsWatched(id);
        }
    }
}

function markAsWatched(id) {
    request('request/movie/watched/' + id, 'PUT', '', function(result) {
        console.log(result);
    });
}


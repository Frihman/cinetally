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
        if(document.getElementById(`li_${id}`).style.backgroundColor != 'rgb(0, 202, 0)') {
            document.getElementById(`li_${id}`).style.backgroundColor = 'rgb(0, 202, 0)';
            
            document.getElementById(`i_${id}`).className = 'fas fa-check';
            document.getElementById(`p_${id}`).innerHTML = 'Watched';
        } else {
            document.getElementById(`li_${id}`).style.backgroundColor = '#ffffff';
            
            document.getElementById(`i_${id}`).className = 'fas fa-eye';
            document.getElementById(`p_${id}`).innerHTML = 'Mark as watched';
        }
        console.log(result);
    });
}


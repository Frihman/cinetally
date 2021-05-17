import request from './request.js';

export default function btnWatched() {
    var buttons = document.getElementsByClassName('btnWatched');

    for(let i = 0; i < buttons.length; i++) {
        
        buttons[i].onclick = function() {
            let id = buttons[i].id.substring(5);
            markAsWatched(id);
        }
    }
}

function markAsWatched(id) {
    document.getElementById(`iW_${id}`).className = 'fas fa-circle-notch fa-spin';
    request('/request/movie/watched/' + id, 'PUT', '', function(result) {
        if(document.getElementById(`pW_${id}`).innerHTML == 'Mark as watched') {
            document.getElementById(`iW_${id}`).className = 'fas fa-check';
            document.getElementById(`pW_${id}`).innerHTML = 'Watched';

            document.getElementById(`r_${id}`).style.display = 'inline-block';

            try {document.getElementById(`li_${id}`).style.backgroundColor = 'rgb(0, 202, 0)';} catch{}
        } else {
            document.getElementById(`iW_${id}`).className = 'fas fa-eye';
            document.getElementById(`pW_${id}`).innerHTML = 'Mark as watched';

            document.getElementById(`r_${id}`).style.display = 'none';

            try {document.getElementById(`li_${id}`).style.backgroundColor = '#ffffff';} catch{};
        }
    });
}


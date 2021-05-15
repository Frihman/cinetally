import request from './request.js';

export default function checkWatchedMovies() {
    var buttons = document.getElementsByClassName('btnWatched');
    for(let i = 0; i < buttons.length; i++) {
        let id = buttons[i].id.substring(5);
        request('/request/movie/' + id, 'GET', '', function(result) {
            var data = JSON.parse(result);
            if(data.length > 0) {
                if(data[0].Watched == 1) {
                    document.getElementById(`iW_${id}`).className = 'fas fa-check';
                    document.getElementById(`pW_${id}`).innerHTML = 'Watched';
                }
                
                
            } else {
                document.getElementById(`btnW_${id}`).style.display = 'none';
            }
            
        });
    }
}
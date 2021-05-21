import request from './request.js';

export default function selectRating() {
    var selects = document.getElementsByClassName('rating');
    for(let i = 0; i < selects.length; i++) {
        selects[i].onchange = function() {
            var data = [];
            data.push(selects[i].value);
            let id = selects[i].id.substring(2);
            selects[i].style.display = 'none';
            var icon = document.createElement('i');
            icon.className = 'fas fa-circle-notch fa-spin';
            selects[i].parentNode.appendChild(icon);
            request('/request/movie/rating/' + id, 'PUT', JSON.stringify(data), function() {
                icon.remove();
                selects[i].style.display = 'inline-block';
            });
        }
    }
}


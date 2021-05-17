import request from './request.js';

export default function selectRating() {
    var selects = document.getElementsByClassName('rating');
    for(let i = 0; i < selects.length; i++) {
        selects[i].onchange = function() {
            var data = [];
            data.push(selects[i].value);
            let id = selects[i].id.substring(2);
            request('/request/movie/rating/' + id, 'PUT', JSON.stringify(data), function() {
                
            });
        }
    }
}


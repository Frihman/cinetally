import request from './request.js';
import selectRating from '../functions/selectRating.js';
import btnWatched from './btnWatched.js';

export default function checkWatchedMovies(selection) {
    var buttons = document.getElementsByClassName('btnWatched');
    for(let i = 0; i < buttons.length; i++) {
        let id = buttons[i].id.substring(5);
        request('/request/movie/' + id, 'GET', '', function(result) {
            var data = JSON.parse(result);
            if(data.length > 0) {
                if(data[0].Watched == 1) {
                    document.getElementById(`iW_${id}`).className = 'fas fa-check';
                    document.getElementById(`pW_${id}`).innerHTML = 'Watched';
                    document.getElementById('buttons').innerHTML += `
                    <select name="rating" id="r_${data[0].ImdbId}" class="rating">
                    <option value="" selected disabled hidden>${data[0].Rating}</option>
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                    </select>
                    `;

                    selectRating();

                    
                    
                }

                if (selection == 'moviePage') {
                    btnWatched();
                }
                
                
            } else {
                document.getElementById(`btnW_${id}`).style.display = 'none';
            }
            
        });
    }
}
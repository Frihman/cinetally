import request from './request.js';
import {displayList} from '../main/indexMain.js';

var removeIsToggled = false;
var selectedMovies = [];

export function toggleRemoveMovies() {
    if (removeIsToggled) {
        document.getElementById('cancelConfirm').style.display = 'none';
        document.getElementById('removeMovies').style.backgroundColor = '#ffffff';
        selectedMovies = [];
        var divs = document.getElementsByClassName('entry');
        for(let i = 0; i < divs.length; i++) {
            
            divs[i].onclick = '';
            divs[i].style.border = '1px solid rgb(204, 204, 204)';
            
        }
        removeIsToggled = false;
    } else {
        document.getElementById('cancelConfirm').style.display = 'block';
        document.getElementById('removeMovies').style.backgroundColor = 'rgb(238, 238, 238)';
        var divs = document.getElementsByClassName('entry');
        for(let i = 0; i < divs.length; i++) {
            let id = divs[i].id.substring(3);
            
            divs[i].onclick = function() {
                addMovie(id, divs[i]);
                console.log(selectedMovies);
            };
            
        }

        document.getElementById('btnCancel').onclick = function() {
            toggleRemoveMovies();
        }

        document.getElementById('btnConfirm').onclick = function() {
            removeSelectedMovies();
            toggleRemoveMovies();
            
        }
        removeIsToggled = true;
    }
}

function addMovie(id, div) {
    var match = selectedMovies.some(item => item === id);

    if (!match) {
        selectedMovies.push(id);
        div.style.border = '2px solid red';
    } else {
        selectedMovies = selectedMovies.filter(item => item != id);
        div.style.border = '1px solid rgb(204, 204, 204)';
    }
}

function removeSelectedMovies() {
    request('/request/movies', 'DELETE', JSON.stringify(selectedMovies), function() {
        displayList();
    });
}
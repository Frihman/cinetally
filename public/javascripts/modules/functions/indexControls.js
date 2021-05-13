var removeIsToggled = false;
var selectedMovies = [];

export function toggleRemoveMovies() {
    if (removeIsToggled) {
        document.getElementById('cancelConfirm').style.display = 'none';
        selectedMovies = [];
        var divs = document.getElementsByClassName('entry');
        for(let i = 0; i < divs.length; i++) {
            
            divs[i].onclick = '';
            divs[i].style.border = '1px solid rgb(204, 204, 204)';
            
        }
        removeIsToggled = false;
    } else {
        document.getElementById('cancelConfirm').style.display = 'block';
        var divs = document.getElementsByClassName('entry');
        for(let i = 0; i < divs.length; i++) {
            let id = divs[i].id.substring(3);
            
            divs[i].onclick = function() {
                addMovie(id, divs[i]);
                console.log(selectedMovies);
            };
            
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
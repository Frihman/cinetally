import request from './request.js';

export default function checkAddedMovies() {
    const promises = [];
    var divs = document.getElementsByClassName('btnAddMovie');
    for(let i = 0; i < divs.length; i++) {
        let id = divs[i].id.substring(5);

        promises.push(new Promise((resolve, reject) => {
            request('/request/movie/' + id, 'GET', '', function(result) {
                var data = JSON.parse(result);
                
                if (data.length > 0) {
                    document.getElementById(`iA_${id}`).className = 'fas fa-check';
                    document.getElementById(`pA_${id}`).innerHTML = 'Added';
                    
                }
                resolve();
            });
        }));

        Promise.all(promises).then(() => {
            console.log('resolved');
        })
        
    }
}
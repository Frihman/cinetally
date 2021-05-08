function addMovie(id) {
    document.getElementById(`i_${id}`).className = 'fas fa-check';
    document.getElementById(`p_${id}`).innerHTML = 'Added';


}
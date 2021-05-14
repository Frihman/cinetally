export default function getMoviePage() {
    var entries = document.getElementsByClassName('entry');
    for(let i = 0; i < entries.length; i++) {
        entries[i].onclick = function() {
            let id = entries[i].id.substring(3);
            window.location = '/movie/' + id;
        }
    }
}

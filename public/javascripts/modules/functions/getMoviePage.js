export default function getMoviePage() {
    var entries = document.getElementsByClassName('entryLink');
    for(let i = 0; i < entries.length; i++) {
        entries[i].onclick = function() {
            let id = entries[i].id.substring(4);
            window.location = '/movie/' + id;
        }
    }
}

document.getElementById('btnSearch').addEventListener('click', function(){
    var path = '/search/' + document.getElementById('inputSearch').value;
    path = encodeURI(path);
    window.location = path;
});
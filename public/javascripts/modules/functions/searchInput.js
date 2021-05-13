var input = document.getElementById('inputSearch');
var button = document.getElementById('btnSearch');

button.addEventListener('click', function(){
    var path = '/search/' + input.value;
    path = encodeURI(path);
    window.location = path;
});

input.addEventListener('keyup', function(event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      button.click();
    }
});

var bigInput = document.getElementById('inputBigSearch');
var bigButton = document.getElementById('btnBigSearch');

bigButton.addEventListener('click', function(){
    var path = '/search/' + bigInput.value;
    path = encodeURI(path);
    window.location = path;
});

bigInput.addEventListener('keyup', function(event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      bigButton.click();
    }
});
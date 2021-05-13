var removeIsToggled = false;

export function toggleRemoveMovies() {
    if (removeIsToggled) {
        document.getElementById('cancelConfirm').style.display = 'none';
        removeIsToggled = false;
    } else {
        document.getElementById('cancelConfirm').style.display = 'block';
        removeIsToggled = true;
    }
}
export default function request(location, method, data, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, location);
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.send(data);
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            
            callback(xhr.response);
        }
    }
    
}
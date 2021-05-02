export default function request(location, method, data, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, location);
    if(method == 'POST') {
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.send(data);
        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4 && xhr.status == 200) {
                
                callback(xhr.response);
            } else{
                console.log(xhr.response);
            }
        }
    } else if (method == 'GET') {
        xhr.send();
        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4 && xhr.status == 200) {
                
                callback(xhr.response);
            } else {
                console.log(xhr.response);
            }
        }
    }
    
}
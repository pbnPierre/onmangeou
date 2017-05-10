var r = new XMLHttpRequest(),
    searchUrl = 'http://localhost:1337/search?location=48.844749,2.383247',
    imageUrl = 'http://localhost:1337/image'
;


function getApiData(searchUrl) {
    var keyword = document.getElementById('keyword').value;

    r.open("GET", searchUrl, true);
    r.onreadystatechange = function () {
        if (r.readyState != 4 || r.status != 200) return;

        var response = JSON.parse(r.responseText);
        if (response.result === 'ko') {
            alert('Error. Reason: ' + response.result.reason);
            return;
        }

        displayResults(response.data.results);
        if (response.data.next_page_token) {
            window.setTimeout(function() { getApiData(searchUrl +'&pagetoken='+response.data.next_page_token)}, 1000);
        }
    };
    r.send();
}

function displayResults(results) {
    results.forEach(function (result) {
        if (result.geometry && result.geometry.location) {
            var location = result.geometry.location.lat+','+result.geometry.location.long;

            var request = new XMLHttpRequest();
            request.open('GET', imageUrl + '?location=' + location, true);
            request.onreadystatechange = function() {
                if (request.readyState != 4 || request.status != 200) {
                    addResult(result, null);
                    return;
                }

                var response = JSON.parse(r.responseText);
                if (response.result === 'ko') {
                    alert('Error. Reason: ' + response.result.reason);
                    return;
                }

                addResult(result, request.image)
            };
            request.send();
        } else {
            addResult(result, null);
        }
    });
}

function addResult(result, image) {
    var item = document.createElement('li');
    var html = result.name;

    if (image !== null) {
        var image = document.createElement('img');
        image.src = 'data:image/png;base64, ' + image;
    }

    item.innerHTML = html;
    document.getElementById('results').appendChild(item);
}

function search() {
    document.getElementById('results').innerHTML = '';
    getApiData(searchUrl);
}
document.getElementById('keyword').addEventListener('input', search);
document.getElementById('go').addEventListener('click', search);

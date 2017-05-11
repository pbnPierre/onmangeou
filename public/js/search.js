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
            alert('Error. Reason: ' + response.reason);
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
            var location = result.geometry.location.lat+','+result.geometry.location.lng;

            var request = new XMLHttpRequest();
            request.open('GET', imageUrl + '?location=' + location, true);
            request.onreadystatechange = function() {
                if (request.readyState != 4 || request.status != 200) {
                    return;
                }

                var response = JSON.parse(request.responseText);
                if (response.result === 'ko') {
                    alert('Error. Reason: ' + response.reason);
                    return;
                }

                addResult(result, response.image)
            };
            request.send();
        } else {
            addResult(result, null);
        }
    });
}

function addResult(result, imageData) {

    var item = document.createElement('div');
        item.classList.add('col-xs-6');
        item.classList.add('col-md-3');

    var thumbnailcontainer = document.createElement('div');
        thumbnailcontainer.className = 'thumbnail';

    if (imageData !== null) {
        var image = document.createElement('img');
        image.src = 'data:image/png;base64, ' + imageData;
        thumbnailcontainer.appendChild(image)
    }

    var name = document.createElement('h3');
        name.innerHTML = result.name;
    var nameParent = document.createElement('div');
        nameParent.className='caption';


    nameParent.appendChild(name);
    thumbnailcontainer.appendChild(nameParent);
    item.appendChild(thumbnailcontainer);
    document.getElementById('results').appendChild(item);
}

function search() {
    document.getElementById('results').innerHTML = '';
    getApiData(searchUrl);
}
document.getElementById('keyword').addEventListener('input', search);
document.getElementById('go').addEventListener('click', search);

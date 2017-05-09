var r = new XMLHttpRequest(),
    searchUrl = 'http://localhost:1337/search?location=48.844749,2.383247'
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
    var resultList = document.getElementById('results');
    results.forEach(function (result) {
        var item = document.createElement('li');
        html = '';
        if (result.photos) {
            //TODO Add photos with
        }
        html += result.name;

        item.innerHTML = html;
        resultList.appendChild(item);
    });
}

function search() {
    document.getElementById('results').innerHTML = '';
    getApiData(searchUrl);
}
document.getElementById('keyword').addEventListener('input', search);
document.getElementById('go').addEventListener('click', search);

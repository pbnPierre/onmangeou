var r = new XMLHttpRequest(),
    apiBase = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?',
    apiUrl = apiBase +
             'location=48.844749,2.383247'+
             '&radius=300'+
             '&type=restaurant'+
             '&opennow';

function getApiData(apiUrl, apiKey) {
    var url = apiUrl + '&key=' + apiKey;
    console.log(url);
    r.open("GET", url, true);
    r.onreadystatechange = function () {
        if (r.readyState != 4 || r.status != 200) return;
        var response = JSON.parse(r.responseText);
        displayResults(response.results);
        if (response.next_page_token) {
            window.setTimeout(function() { getApiData(apiUrl = apiBase +'pagetoken='+response.next_page_token, apiKey)}, 2000);
        }
        console.log(response);
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

document.getElementById('apikey').addEventListener('input', function (evt) {
    getApiData(apiUrl, this.value);
});


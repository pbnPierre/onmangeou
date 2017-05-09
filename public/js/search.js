var r = new XMLHttpRequest(),
    apiBase = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?',
    apiUrl = apiBase +
             'location=48.844749,2.383247'+
             '&radius=300'+
             '&type=restaurant'+
             '&opennow';

function getApiData(apiUrl) {
    var apikey = document.getElementById('apikey').value,
        keyword = document.getElementById('keyword').value;
    var url = apiUrl + '&key=' + apikey + '&keyword=' + keyword;
    r.open("GET", url, true);
    r.onreadystatechange = function () {
        if (r.readyState != 4 || r.status != 200) return;
        var response = JSON.parse(r.responseText);
        displayResults(response.results);
        if (response.next_page_token) {
            window.setTimeout(function() { getApiData(apiBase +'pagetoken='+response.next_page_token)}, 1000);
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
    getApiData(apiUrl);
}
document.getElementById('apikey').addEventListener('input', search);
document.getElementById('keyword').addEventListener('input', search);


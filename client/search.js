function addResult(name, imageData) {
    const item = document.createElement('div');
    item.classList.add('col-xs-6');
    item.classList.add('col-md-3');

    const thumbnailcontainer = document.createElement('div');
    thumbnailcontainer.className = 'thumbnail';

    if (imageData !== null) {
        const image = document.createElement('img');
        image.src = 'data:image/png;base64, ' + imageData;
        thumbnailcontainer.appendChild(image);
    }

    const nameTag = document.createElement('h3');
    nameTag.innerHTML = name;
    const nameParent = document.createElement('div');
    nameParent.className = 'caption';


    nameParent.appendChild(nameTag);
    thumbnailcontainer.appendChild(nameParent);
    item.appendChild(thumbnailcontainer);
    document.getElementById('results').appendChild(item);
}



function search(location) {
    var uri = '/search?location=' + location;

    uri += '&radius='+document.querySelector('[name="range"]').value;

    if (document.querySelector('[name="open-now"]').value == 'on') {
        uri += '&opennow';
    };
    var keyword = document.querySelector('[name="keyword"]').value;
    if (keyword !== '') {
        uri += '&keyword='+ keyword;
    };
    fetch(uri, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    })
    .then((response) => response.json())
    .then((json) => {
        if (json.result === 'ko') {
            alert('Error. Reason: ' + json.reason);
            return;
        }

        document.getElementById('results').innerHTML = '';

        json.data.forEach((result) => addResult(result.name, result.image));
    })
    .catch((ex) => {
        alert('Failed to retrieve data');
        console.log(ex);
    });
}

export function initialize() {
    $('#search').on('click', function(event) {
        location(search);
    });
    $('#choose').on('click', function(event) {
        chooseRandomly();
    });
    location(search);
}

function chooseRandomly() {
    var results = document.getElementById('results').childNodes;
    if (results.length > 0) {
        var element = results[Math.floor(Math.random()*results.length)];
        var randomResultDiv = document.getElementById('random-result');
        randomResultDiv.innerHTML = '';
        randomResultDiv.appendChild(element.cloneNode(true));
    }
}

function location(callback) {
    var defaultLocation = '48.844749,2.383247';
    if ('geolocation' in navigator) {
        return navigator.geolocation.getCurrentPosition(
            function(location) {
               callback(location.coords.latitude + ', ' + location.coords.longitude);
            },
            function() {
                callback(defaultLocation)
            }
        );
    }

    //Default location if no support or disabled
    return callback(defaultLocation);
}

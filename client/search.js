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
}



function search(location) {
    fetch('/search?location=' + location, {
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

        json.data.forEach((result) => addResult(result.name, result.image));
        alert('On va manger à ' + json.data[Math.random()*json.data.length].name);
    })
    .catch((ex) => {
        alert('Failed to retrieve data');
        console.log(ex);
    });
}

export function initialize() {
    location(search);
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

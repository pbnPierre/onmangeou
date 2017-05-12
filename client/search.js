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
    })
    .catch((ex) => {
        alert('Failed to retrieve data');
        console.log(ex);
    });
}

export function initialize() {
    search('48.844749,2.383247');
}

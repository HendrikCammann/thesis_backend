const UpdateDataBase = document.querySelector('.UpdateDataBase');
UpdateDataBase.addEventListener('submit', (e) => {
    e.preventDefault();
    post('/updateDataBase');
});

const FetchDetails = document.querySelector('.FetchDetailInfo');
FetchDetails.addEventListener('submit', (e) => {
    e.preventDefault();
    post('/fetchDetails');
});

const FetchZones = document.querySelector('.FetchZones');
FetchZones.addEventListener('submit', (e) => {
    e.preventDefault();
    post('/fetchZones');
});

const FetchStreams = document.querySelector('.FetchStreams');
FetchStreams.addEventListener('submit', (e) => {
    e.preventDefault();
    post('/fetchStreams');
});

function post (path, data) {
    return window.fetch(path, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
}
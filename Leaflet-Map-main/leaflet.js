const map = L.map('map').setView([37.5, -95.5], 4);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

function getRandomInRange(from, to, fixed) {
    return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
}

const coordinates = [
    { lat: getRandomInRange(30, 35, 3), lng: getRandomInRange(-90, -100, 3) },
    { lat: getRandomInRange(30, 35, 3), lng: getRandomInRange(-90, -100, 3) },
    { lat: getRandomInRange(30, 35, 3), lng: getRandomInRange(-90, -100, 3) }
];

coordinates.forEach((coord, index) => {
    const marker = L.marker([coord.lat, coord.lng]).addTo(map)
        .bindPopup(`Marker ${index + 1}: [${coord.lat}, ${coord.lng}]`).openPopup();

    document.getElementById(`marker${index + 1}`).innerHTML = `Marker ${index + 1}: Coordinates [${coord.lat}, ${coord.lng}]`;

    fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${coord.lat}&longitude=${coord.lng}&localityLanguage=en`)
        .then(response => response.json())
        .then(data => {
            document.getElementById(`marker${index + 1}`).innerHTML += `<br>Locality: ${data.locality || 'Not available'}`;
        })
        .catch(error => {
            console.error("Error fetching locality data:", error);
        });
});
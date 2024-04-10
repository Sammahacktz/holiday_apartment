var map = L.map('map').setView([50.6498108,13.4494005], 17);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);
var marker = L.marker([50.6498108,13.4494005]).addTo(map);
marker.bindPopup("<b>Ferienwohnung Lippmann</b>").openPopup();

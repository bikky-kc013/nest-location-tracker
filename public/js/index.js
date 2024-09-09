const socket = io();
let latlng;

if (navigator.geolocation) {
  navigator.geolocation.watchPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      socket.emit('send-location', { latitude, longitude });
    },
    (error) => {
      console.error('Geolocation error:', error.message);
    },
    {
      maximumAge: 0,
      timeout: 3000,
      enableHighAccuracy: true,
    },
  );
} else {
  console.error('Geolocation is not supported by this browser.');
}

const map = L.map('map').setView([0, 0], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors',
}).addTo(map);

let markers = {};

socket.on('receive-location', (data) => {
  const { id, latitude, longitude } = data;
  map.setView([latitude, longitude], 50);
  if (!markers[id]) {
    markers[id] = L.marker([latitude, longitude]).addTo(map);
  } else {
    markers[id].setLatLng([latitude, longitude]);
  }
  var marker = L.marker([latitude, longitude], { alt: 'Hello' })
    .addTo(map)
    .bindPopup('Hello,This is your location');
});

socket.on('user-disconnected', (id) => {
  if (markers[id]) {
    map.removeLayer(markers[id]);
    delete markers[id];
  }
});

window.addEventListener('load', () => {
  let lon;
  let lat;
  const API_KEY = 'e9972c70265e580963d7930ca994c94c';

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      lon = position.coords.longitude;
      lat = position.coords.latitude;
      console.log(position);
      console.log(lat, lon);

      const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${API_KEY}`;
      fetch(api)
        .then((data) => {
          return data.json();
        })
        .then((data) => {
          console.log(data);
        });
    });
  } else {
    h1.textContent = ' Hey there, please enable your location';
  }
});

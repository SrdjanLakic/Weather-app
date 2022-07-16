window.addEventListener('load', () => {
  let lon;
  let lat;
  let temperature = document.querySelector('.temperature-degree');
  let temperatureDescription = document.querySelector(
    '.temperature-description'
  );
  let timezoneLocation = document.querySelector('.location-timezone');

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      lon = position.coords.longitude;
      lat = position.coords.latitude;
      console.log(position);
      console.log(lat, lon);

      const api = `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lon}&key=33605dcddc9f4b1eb7bf9f252c99f90e&include=minutely`;
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

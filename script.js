window.addEventListener('load', () => {
  let lon;
  let lat;
  const temperatureDegree = document.querySelector('.temperature-degree');
  const temperatureDescription = document.querySelector(
    '.temperature-description'
  );
  const timezoneLocation = document.querySelector('.location-timezone');
  const degreeSection = document.querySelector('.temperature');
  const temperatureSpan = document.querySelector('.temperature span');
  const date = document.querySelector('.date');
  const weatherDesription = document.querySelector('.description');
  const descriptionIcon = document.querySelector('.description-icon');
  const now = new Date();
  const day = now.getDate();
  const month = now.getMonth() + 1;
  const year = now.getFullYear();
  const hour = now.getHours();
  const min = now.getMinutes();
  date.textContent = `${month}/${day}/${year}  ${hour}:${min}`;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      lon = position.coords.longitude;
      lat = position.coords.latitude;

      const api = `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lon}&key=33605dcddc9f4b1eb7bf9f252c99f90e`;
      fetch(api)
        .then((data) => {
          return data.json();
        })
        .then((data) => {
          const { temp, timezone, datetime, weather } = data.data[0];
          temperatureDegree.textContent = temp;
          temperatureDescription.textContent = weather.description;
          timezoneLocation.textContent = timezone;

          const description = weather.description;

          let fahrenheit = temp * (9 / 5) + 32;

          degreeSection.addEventListener('click', () => {
            if (temperatureSpan.textContent === 'C') {
              temperatureSpan.textContent = 'F';
              temperatureDegree.textContent = Math.floor(fahrenheit);
            } else {
              temperatureSpan.textContent = 'C';
              temperatureDegree.textContent = temp;
            }
          });

          if (description.includes('sky')) {
            console.log(description);
            console.log('sky');
            document.body.style.backgroundImage = "url('sky.png')";
            descriptionIcon.innerHTML =
              "<i class='fa-solid fa-sun-bright fa-4x'></i>";
          } else if (description.includes('cloud') && temp > 20) {
            console.log('cloud');
            descriptionIcon.innerHTML =
              "<i class='fa-solid fa-cloud fa-4x'></i>";
            document.body.style.backgroundImage = "url('cloud.jpg')";
          } else if (description.includes('rain' || 'drizzle')) {
            console.log('rain');
            descriptionIcon.innerHTML = "url('rain.jpg";
            ("<i class='fa-solid fa-cloud-rain fa-4x'></i>");
          } else if (description.includes('Thunderstorm')) {
            console.log('thunder');
            document.body.style.backgroundImage = "url('thunderstorm.jpg')";
            descriptionIcon.innerHTML =
              '<i class="fa-solid fa-cloud-bolt fa-4x"></i>';
          } else if (description.includes('snow')) {
            document.body.style.backgroundImage = "url('snow.jpg')";
            descriptionIcon.innerHTML =
              "<i class='fa-solid fa-snowflakesfa-6x'></i>";
          }
        });
    });
  } else {
    h1.textContent = ' Hey there, please enable your location';
  }
});

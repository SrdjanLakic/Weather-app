window.addEventListener("load", () => {
  let lon;
  let lat;
  const temperatureDegree = document.querySelector(".temperature-degree");
  const temperatureDescription = document.querySelector(
    ".temperature-description"
  );
  const timezoneLocation = document.querySelector(".location-timezone");
  let degreeSection = document.querySelector(".temperature");
  const temperatureSpan = document.querySelector(".temperature span");
  const date = document.querySelector(".date");

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
          console.log(data);
          const { temp, timezone } = data.data[0];
          temperatureDegree.textContent = temp;
          temperatureDescription.textContent = data.data[0].weather.description;
          timezoneLocation.textContent = timezone;

          let fahrenheit = temp * (9 / 5) + 32;
          degreeSection.addEventListener("click", () => {
            if (temperatureSpan.textContent === "C") {
              temperatureSpan.textContent = "F";
              temperatureDegree.textContent = Math.floor(fahrenheit);
            } else {
              temperatureSpan.textContent = "C";
              temperatureDegree.textContent = temp;
            }
          });
        });
    });
  } else {
    h1.textContent = " Hey there, please enable your location";
  }
});

const search = document.querySelector(".search");
search.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    console.log(search.value);
    getStations();
  }
});

async function getStations() {
  const response = await fetch(
    "https://de1.api.radio-browser.info/json/stations/search?name=" +
      search.value,
  );

  const data = await response.json();
  console.log(data);

  const results = document.querySelector(".results");
  results.innerHTML = "";
  data.forEach((station) => {
    console.log(station.name);
    const card = document.createElement("button");
    card.classList.add("stationCard");
    card.innerHTML = `
          <img class= "stationIcon" src="${station.favicon}" alt="">

      <div class="stationInfo">
        <h2 class="stationName">${station.name}</h2>

        <p class="metadata">
          ${station.bitrate} kbps • ${station.country} • ${station.tags}
        </p>
      </div>
    `;

    results.appendChild(card);
  });
}

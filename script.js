const search = document.querySelector(".search");
search.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    console.log(search.value);
    getStations();
  }
});

nowPlaying = document.querySelector(".channelName");

const audio = new Audio();

let stations = [];
let currentStation = 0;

async function getStations() {
  const response = await fetch(
    "https://de1.api.radio-browser.info/json/stations/search?name=" +
      search.value,
  );

  const data = await response.json();
  console.log(data);

  stations = data;

  const results = document.querySelector(".results");
  results.innerHTML = "";

  // Create the cards

  data.forEach((station, index) => {
    console.log(station.name);
    const card = document.createElement("button");
    card.classList.add("stationCard");
    let tag = station.tags.split(",")[0];
    card.innerHTML = `
          <img class= "stationIcon" src="${station.favicon}" alt="">

      <div class="stationInfo">
        <h2 class="stationName">${station.name}</h2>

        <p class="metadata">
          ${station.bitrate} kbps • ${station.country} • ${tag}
        </p>
      </div>
    `;

    results.appendChild(card);

    // Make the clicking work

    card.addEventListener("click", () => {
      currentStation = index;
      audio.src = station.url_resolved;
      audio.play();

      nowPlaying.textContent = station.name;
    });
  });
}

// Media buttons

document.querySelector(".previousBtn").onclick = () => {
  currentStation--;

  if (currentStation < 0) {
    currentStation = stations.length - 1;
  }

  audio.src = stations[currentStation].url_resolved;
  audio.play();
  nowPlaying.textContent = stations[currentStation].name;
};

document.querySelector(".playPauseBtn").onclick = () => {
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
};

document.querySelector(".nextBtn").onclick = () => {
  currentStation++;

  if (currentStation >= stations.length) {
    currentStation = 0;
  }

  audio.src = stations[currentStation].url_resolved;
  audio.play();
  nowPlaying.textContent = stations[currentStation].name;
};

const volumeIcon = document.querySelector(".volumeIcon");

let currentVolumeIcon = "high";
document.querySelector(".volumeSlider").addEventListener("input", (event) => {
  playingVolume = Number(event.target.value);
  audio.volume = playingVolume;
  if (playingVolume == 0 && !(currentVolumeIcon == "mute")) {
    volumeIcon.classList.remove("fa-volume-high", "fa-volume-low", "fa-volume");
    volumeIcon.classList.toggle("fa-volume-xmark");
    currentVolumeIcon = "mute";
  } else if (
    playingVolume > 0 &&
    playingVolume <= 0.4 &&
    !(currentVolumeIcon == "low")
  ) {
    volumeIcon.classList.remove("fa-volume-high", "fa-volume-xmark");
    volumeIcon.classList.toggle("fa-volume-low");
    currentVolumeIcon = "low";
  } else if (playingVolume > 0.4 && !(currentVolumeIcon == "high")) {
    volumeIcon.classList.remove("fa-volume-xmark", "fa-volume-low");
    volumeIcon.classList.toggle("fa-volume-high");
    currentVolumeIcon = "high";
  }
});

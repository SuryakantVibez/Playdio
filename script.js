const resultList = document.querySelector(".resultList");
const original = document.querySelector(".stationCard");

for (let i = 0; i < 10; i++) {
  resultList.appendChild(original.cloneNode(true));
}

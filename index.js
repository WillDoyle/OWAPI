function updatePlatform(event) {
  console.log(event.target.value);
}

const playerWrapper = document.querySelector(".player__wrapper");
const errorDiv = document.querySelector(".error__wrapper");
const playerDiv = document.querySelector(".player__info");
const rankDiv = document.querySelector(".rank__wrapper");
const playerNamecard = document.querySelector(".player__namecard");
const clearBtn = document.querySelector(".clear__btn");

const playerInput = document.querySelector(".player__input");
console.log(rankDiv);

async function fetchData(apiInput) {
  const apiUrl = `https://overfast-api.tekrop.fr/players/${apiInput}/summary`;

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    console.log("API Data:", data);
    showName(data);
    showIcon(data);
    displayProfile(data);
    displayRank(data);
    errorDiv.innerHTML = ``;
  } catch (error) {
    console.error("Fetch Error:", error);
    console.log("ERROR");

    if (playerInput.value) {
      errorDiv.innerHTML = `<h3 class="error__header">Error retrieving user profile</h3>`;
    }
  }
}

async function showName(playerData) {
  const username = await playerData.username;
}

function searchPlayer(event) {
  event.preventDefault();
  const userInput = event.target.value;
  const apiInput = userInput.replace("#", "-");

  fetchData(apiInput);
}

function displayProfile(data) {
  const username = data.username;
  const icon = data.avatar;
  const title = data.title;
  const namecard = data.namecard;

  if (namecard) {
    playerNamecard.src = namecard;
    console.log(playerNamecard.src);
  }

  playerDiv.innerHTML = `<h1 class="user__name item">${username}</h1> <h2 class="player__title item">${title}</h2> <img class="player__icon item" src=${icon}>`;
}

function displayRank(data) {
  showPlayer();
  if (data.privacy !== "private") {
    const tankRank = data.competitive.pc.tank;
    const damageRank = data.competitive.pc.damage;
    const supportRank = data.competitive.pc.support;

    rankDiv.innerHTML = `
    <div class="item"> <h2>Tank:</h2> <img src=${tankRank.rank_icon}> </div>
    <div class="item"><h2>Damage:</h2> <img src=${damageRank.rank_icon}></div>
    <div class="item"><h2>Support:</h2> <img src=${supportRank.rank_icon}></div>
  `;
  } else {
    rankDiv.innerHTML = `<h2 class="private__header"><i class="fa-solid fa-lock"></i> Profile is private</h2>`;
  }
  console.log(rankDiv.innerHTML);
}

function clearProfile() {
  rankDiv.innerHTML = "";
  playerDiv.innerHTML = "";
  hidePlayer();
  errorDiv.innerHTML = "";
  playerInput.value = "";
}

function hidePlayer() {
  clearBtn.style.display = "none";
  playerWrapper.classList.remove("show");
  setTimeout(() => {
    playerWrapper.style.display = "none";
  }, 40);
}

function showPlayer() {
  playerWrapper.style.display = "flex";
  setTimeout(() => {
    playerWrapper.classList += " show";
    clearBtn.style.display = "flex";
  }, 40);
}

async function showIcon(playerIcon) {}

// Call the async function to fetch and log data
fetchData();
showName();
hidePlayer();

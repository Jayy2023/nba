const toggleButton = document.getElementById('toggle-button');
const naviList = document.getElementById('navi-list');

toggleButton.addEventListener('click', () => {
    naviList.classList.toggle('active');
})


const btn = document.querySelector('button');
btn.onclick = searchPlayer;
const playerStatsDiv = document.getElementById('playerStats');


async function searchPlayer() {
  const playerName = document.getElementById('playerName').value;
  const apiUrl = 'https://www.balldontlie.io/api/v1/players?search=' + playerName;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    const playerId = data.data[0].id;
    const statsApiUrl =
      'https://www.balldontlie.io/api/v1/season_averages?player_ids[]=' + playerId;

    const statsResponse = await fetch(statsApiUrl);
    const statsData = await statsResponse.json();
    const playerStats = statsData.data[0];

    const playerFullName = data.data[0].first_name + ' ' + data.data[0].last_name;
   
    
    playerStatsDiv.innerHTML =
      '<h2>' + playerFullName + '</h2>' +
      '<p>Points per game: ' + playerStats.pts + '</p>' +
      '<p>Assists per game: ' + playerStats.ast + '</p>' +
      '<p>Rebounds per game: ' + playerStats.reb + '</p>' +
      '<p>Field goal percentage: ' + playerStats.fg_pct + '</p>' +
      '<p>Random meme: '+ "" + '</p>';
   
    document.getElementById('playerName').value = '';
  } catch (error) {
    console.error('Error:', error);
  }
  generateRandomMeme();
}


async function generateRandomMeme() {
  const apiUrl = 'https://api.imgflip.com/get_memes';

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    const memes = data.data.memes;

    const randomIndex = Math.floor(Math.random() * memes.length);
    const meme = memes[randomIndex];

    const memeImg = document.createElement('img');
    memeImg.src = meme.url;

    playerStatsDiv.appendChild(memeImg);
  } catch (error) {
    console.error('Error:', error);
  }
}
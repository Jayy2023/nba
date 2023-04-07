// const btn = document.querySelector('button');
// btn.onclick = searchPlayer;

// async function searchPlayer() {
//   const playerName = document.getElementById('playerName').value;
//   const apiUrl = 'https://www.balldontlie.io/api/v1/players?search=' + playerName;

//   try {
//     const response = await fetch(apiUrl);
//     const data = await response.json();
//     const playerId = data.data[0].id;
//     const statsApiUrl =
//       'https://www.balldontlie.io/api/v1/season_averages?player_ids[]=' + playerId;

//     const statsResponse = await fetch(statsApiUrl);
//     const statsData = await statsResponse.json();
//     const playerStats = statsData.data[0];



//     const playerFullName = data.data[0].first_name + ' ' + data.data[0].last_name;
//     const playerStatsDiv = document.getElementById('playerStats');
//     playerStatsDiv.innerHTML =
//         '<h2>' + playerFullName + '</h2>' +
//         '<p>Points per game: ' + playerStats.pts + '</p>' +
//         '<p>Assists per game: ' + playerStats.ast + '</p>' +
//         '<p>Rebounds per game: ' + playerStats.reb + '</p>' +
//         '<p>Field goal percentage: ' + playerStats.fg_pct + '</p>';
        

//     document.getElementById('playerName').value = '';
//   } catch (error) {
//     console.error('Error:', error);
//   }
// }
const btn = document.querySelector('button');
btn.onclick = searchPlayer;

async function searchPlayer() {
  const playerName = document.getElementById('playerName').value;
  const apiUrl = 'https://www.balldontlie.io/api/v1/players?search=' + playerName;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    const playerId = data.data[0].id;
    const statsApiUrl = 'https://www.balldontlie.io/api/v1/season_averages?player_ids[]=' + playerId;

    const statsResponse = await fetch(statsApiUrl);
    const statsData = await statsResponse.json();
    const playerStats = statsData.data[0];

    const playerFullName = data.data[0].first_name + ' ' + data.data[0].last_name;
    const playerStatsDiv = document.getElementById('playerStats');

    playerStatsDiv.innerHTML =
      '<h2>' + playerFullName + '</h2>' +
      '<p>Points per game: ' + playerStats.pts + '</p>' +
      '<p>Assists per game: ' + playerStats.ast + '</p>' +
      '<p>Rebounds per game: ' + playerStats.reb + '</p>' +
      '<p>Field goal percentage: ' + playerStats.fg_pct + '</p>';

    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'e3475bce2dmsh3b7de0acb5e68a1p14aaeejsncbc3a128adc9',
        'X-RapidAPI-Host': 'basketapi1.p.rapidapi.com'
      }
    };

    const imageUrl = `https://basketapi1.p.rapidapi.com/api/basketball/player/${playerId}/image`;
    const imageResponse = await fetch(imageUrl, options);
    const imageData = await imageResponse.json();
    const playerImage = imageData.url;
    console.log(imageResponse);
    const imageElement = document.createElement('img');
    imageElement.src = playerImage;
    playerStatsDiv.appendChild(imageElement);

    document.getElementById('playerName').value = '';
  } catch (error) {
    // console.error('Error:', error);
  }
}







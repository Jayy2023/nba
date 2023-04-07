
const btn = document.querySelector('button');
btn.onclick = searchPlayer;
const playerStatsDiv = document.getElementById('playerStats');


/**
 * The function searches for a basketball player's stats using their name and displays it on the
 * webpage along with a random meme and their image.
 */
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
    console.log(playerStats);

    const options = {
        method: 'GET',
        headers: {
          'x-rapidapi-host': 'nba-player-individual-stats.p.rapidapi.com',
          'x-rapidapi-key': 'fa96c64051mshe57b38479c7104bp161232jsn5416a889dc93',
        },
      };

      const searchEndpoint = 'https://basketapi1.p.rapidapi.com/api/basketball/player/' + playerName + '/image';
      

      fetch(`${searchEndpoint}`, options)
        .then((response) => response.json())
        .then((response) => {
        
          const player = response.data[0];
          console.log(response);
      
          const img = document.createElement('img');
          img.src = player.img_url;
      
          playerStatsDiv.appendChild(img);
        })
        .catch((err) => console.error(err));
      
    
    const playerFullName = data.data[0].first_name + ' ' + data.data[0].last_name;

    playerStatsDiv.innerHTML =
      '<h2>' + playerFullName + '</h2>' +
      '<p>Points per game: ' + playerStats.pts + '</p>' +
      '<p>Assists per game: ' + playerStats.ast + '</p>' +
      '<p>Rebounds per game: ' + playerStats.reb + '</p>' +
      '<p>Field goal percentage: ' + playerStats.fg_pct + '</p>';

    document.getElementById('playerName').value = '';
  } catch (error) {
    console.error('Error:', error);
  }
}







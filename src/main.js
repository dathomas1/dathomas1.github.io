const form = document.getElementById('league-form');
const output = document.getElementById('js-output');

function generate_league(event) {
  const team_count = document.getElementById('league_size').value;
  let shuffled_league = new League(team_count);
  shuffled_league.generate();
  output.innerHTML = shuffled_league.display_league_html();
  event.preventDefault();
}

form.addEventListener('submit', generate_league);

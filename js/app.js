// --------------------------
// API: Equipos
// --------------------------
const teamsUrl = 'https://valorant-esports1.p.rapidapi.com/v1/teams';
const playersUrl = 'https://valorant-esports1.p.rapidapi.com/v1/players';

const options = {
  method: 'GET',
  headers: {
    'x-rapidapi-key': '1ed744d008mshc9012beae8006fdp11e870jsn1d22999f808a',
    'x-rapidapi-host': 'valorant-esports1.p.rapidapi.com'
  }
};

// --------------------------
// Función para cargar equipos
// --------------------------
async function loadTeams() {
  const teamsContainer = document.getElementById('teams-list');
  try {
    const response = await fetch(teamsUrl, options);
    const data = await response.json();
    console.log("Equipos:", data);

    if (data && data.status === "OK" && Array.isArray(data.data)) {
      teamsContainer.innerHTML = ""; // Limpiar
      data.data.forEach(team => {
        const card = document.createElement('div');
        card.className = 'col-md-3 mb-4';

        card.innerHTML = `
          <div class="card h-100 shadow-sm border-0">
            <img src="${team.img || 'https://via.placeholder.com/200x200'}" 
                 class="card-img-top p-3" 
                 alt="${team.name}">
            <div class="card-body text-center">
              <h5 class="card-title mb-2">${team.name}</h5>
              <p class="text-muted mb-1">${team.country || 'Sin país'}</p>
              <a href="${team.url}" target="_blank" class="btn btn-danger btn-sm mt-2">
                Ver equipo
              </a>
            </div>
          </div>
        `;
        teamsContainer.appendChild(card);
      });
    } else {
      teamsContainer.innerHTML = '<p class="text-center">No se encontraron equipos.</p>';
    }
  } catch (error) {
    console.error("Error al cargar equipos:", error);
    teamsContainer.innerHTML = '<p class="text-center text-danger">Error al obtener los equipos.</p>';
  }
}

// --------------------------
// Función para cargar jugadores
// --------------------------
async function loadPlayers() {
  const playersContainer = document.getElementById('players-list');
  try {
    const response = await fetch(playersUrl, options);
    const data = await response.json();
    console.log("Jugadores:", data);

    if (data && data.status === "OK" && Array.isArray(data.data)) {
      playersContainer.innerHTML = "";
      data.data.forEach(player => {
        const card = document.createElement('div');
        card.className = 'col-md-2 mb-4';

        card.innerHTML = `
          <div class="card h-100 text-center shadow-sm border-0 p-3">
            <div class="card-body">
              <h5 class="card-title">${player.name}</h5>
              <p class="card-text">
                <strong>Tag:</strong> ${player.teamTag || 'N/A'}<br>
                <strong>País:</strong> ${player.country.toUpperCase()}
              </p>
              <a href="${player.url}" target="_blank" class="btn btn-dark btn-sm">Ver jugador</a>
            </div>
          </div>
        `;
        playersContainer.appendChild(card);
      });
    } else {
      playersContainer.innerHTML = '<p class="text-center">No se encontraron jugadores.</p>';
    }
  } catch (error) {
    console.error("Error al cargar jugadores:", error);
    playersContainer.innerHTML = '<p class="text-center text-danger">Error al obtener los jugadores.</p>';
  }
}

// --------------------------
// Cargar ambos al iniciar
// --------------------------
document.addEventListener("DOMContentLoaded", () => {
  loadTeams();
  loadPlayers();
});

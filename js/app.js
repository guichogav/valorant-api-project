// --------------------------
// API: Equipos y Jugadores
// --------------------------
const teamsUrl = 'https://valorant-esports1.p.rapidapi.com/v1/teams';
const playersUrl = 'https://valorant-esports1.p.rapidapi.com/v1/players';
const teamInfoUrl = id => `https://valorant-esports1.p.rapidapi.com/v1/teams/${id}`;

const options = {
  method: 'GET',
  headers: {
    'x-rapidapi-key': '1ed744d008mshc9012beae8006fdp11e870jsn1d22999f808a',
    'x-rapidapi-host': 'valorant-esports1.p.rapidapi.com'
  }
};

// --------------------------
// Cargar Equipos
// --------------------------
async function loadTeams() {
  const teamsContainer = document.getElementById('teams-list');
  try {
    const response = await fetch(teamsUrl, options);
    const data = await response.json();
    console.log("Equipos:", data);

    if (data?.status === "OK" && Array.isArray(data.data)) {
      teamsContainer.innerHTML = "";
      data.data.forEach(team => {
        const card = document.createElement('div');
        card.className = 'col-md-3 mb-4';

        card.innerHTML = `
          <div class="card h-100 shadow-sm border-0">
            <img src="${team.img || 'https://via.placeholder.com/200x200'}"
                 class="card-img-top p-3" alt="${team.name}">
            <div class="card-body text-center">
              <h5 class="card-title mb-2">${team.name}</h5>
              <p class="text-muted mb-1">${team.country || 'Sin país'}</p>
              <button class="btn btn-danger btn-sm mt-2" 
                      onclick="showTeamInfo('${team.id}')">
                Ver equipo
              </button>
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
// Mostrar Detalle del Equipo
// --------------------------
async function showTeamInfo(teamId) {
  const teamDetails = document.getElementById('team-details');
  const modal = new bootstrap.Modal(document.getElementById('teamModal'));
  teamDetails.innerHTML = '<p class="text-muted">Cargando información...</p>';
  modal.show();

  try {
    const response = await fetch(teamInfoUrl(teamId), options);
    const data = await response.json();
    console.log("Detalle equipo:", data);

    if (data.status === "OK" && data.data?.info) {
      // La estructura real está en data.data.*
      const info = data.data.info;
      const players = data.data.players || [];
      const staff = data.data.staff || [];
      const events = data.data.events || [];

      // Jugadores
      const playersHtml = players.length > 0
        ? players.map(p => `
          <div class="col-md-4 mb-3">
            <div class="card border-0 shadow-sm p-2">
              <img src="${p.img}" class="card-img-top rounded-circle mx-auto"
                   style="width:80px; height:80px; object-fit:cover;">
              <div class="card-body text-center">
                <h6 class="card-title mb-1">${p.user}</h6>
                <small class="text-muted">${p.country.toUpperCase()}</small>
              </div>
            </div>
          </div>
        `).join('')
        : '<p>No hay jugadores registrados.</p>';

      // Staff
      const staffHtml = staff.length > 0
        ? staff.map(s => `
          <div class="col-md-6 mb-3">
            <div class="card border-0 shadow-sm p-2">
              <div class="d-flex align-items-center">
                <img src="${s.img}" class="rounded-circle me-3"
                     style="width:50px; height:50px; object-fit:cover;">
                <div>
                  <strong>${s.user}</strong><br>
                  <small>${s.tag} - ${s.country.toUpperCase()}</small>
                </div>
              </div>
            </div>
          </div>
        `).join('')
        : '<p>No hay staff disponible.</p>';

      // Eventos
      const eventsHtml = events.length > 0
        ? events
            .slice(0, 5) 
            .map(e => `
              <li class="list-group-item">
                <a href="${e.url}" target="_blank">${e.name}</a>
                (${e.year}) — <em>${e.results?.join(', ')}</em>
              </li>
            `).join('')
        : '<p>No hay eventos registrados.</p>';

      // Mostrar en el modal
      teamDetails.innerHTML = `
        <img src="${info.logo}" alt="${info.name}" class="mb-3" width="120">
        <h3>${info.name} <small class="text-muted">(${info.tag})</small></h3>
        <hr>
        <h5 class="mt-3">Jugadores</h5>
        <div class="row">${playersHtml}</div>
        <h5 class="mt-4">Staff</h5>
        <div class="row">${staffHtml}</div>
        <h5 class="mt-4">Eventos Recientes</h5>
        <ul class="list-group">${eventsHtml}</ul>
      `;
    } else {
      teamDetails.innerHTML = '<p class="text-danger">No se pudo cargar la información del equipo.</p>';
    }
  } catch (error) {
    console.error("Error al cargar detalle del equipo:", error);
    teamDetails.innerHTML = '<p class="text-danger">Error al obtener los detalles del equipo.</p>';
  }
}


// --------------------------
// Cargar Jugadores
// --------------------------
async function loadPlayers() {
  const playersContainer = document.getElementById('players-list');
  try {
    const response = await fetch(playersUrl, options);
    const data = await response.json();
    console.log("Jugadores:", data);

    if (data?.status === "OK" && Array.isArray(data.data)) {
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
                <strong>País:</strong> ${player.country?.toUpperCase() || 'N/A'}
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
// Inicializar
// --------------------------
document.addEventListener("DOMContentLoaded", () => {
  loadTeams();
  loadPlayers();
});

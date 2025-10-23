// API: Equipos y Jugadores
const teamsUrl = 'https://valorant-esports1.p.rapidapi.com/v1/teams';
const playersUrl = 'https://valorant-esports1.p.rapidapi.com/v1/players';
const teamInfoUrl = id => `https://valorant-esports1.p.rapidapi.com/v1/teams/${id}`;
const playerInfoUrl = id => `https://valorant-esports1.p.rapidapi.com/v1/players/${id}`;
const eventsUrl = 'https://valorant-esports1.p.rapidapi.com/v1/events?status=all&region=all';


let currentTeamPage = 1;
let currentPlayerPage = 1;
const pageSize = 8; 

const options = {
  method: 'GET',
  headers: {
    'x-rapidapi-key': '1ed744d008mshc9012beae8006fdp11e870jsn1d22999f808a', // Key utilizada: Nutri --- Payed plan
    'x-rapidapi-host': 'valorant-esports1.p.rapidapi.com'
  }
};

// Cargar Equipos
async function loadTeams(page = 1) {
  const teamsContainer = document.getElementById('teams-list');
  const url = `${teamsUrl}?page=${page}&size=${pageSize}`;
  try {
    const response = await fetch(url, options);
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

      // Mostrar botón "Ver más"
      renderTeamPagination(data.pagination);
    } else {
      teamsContainer.innerHTML = '<p class="text-center">No se encontraron equipos.</p>';
    }
  } catch (error) {
    console.error("Error al cargar equipos:", error);
    teamsContainer.innerHTML = '<p class="text-center text-danger">Error al obtener los equipos.</p>';
  }
}


// Mostrar Detalle del Equipo
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

// Cargar Jugadores
async function loadPlayers(page = 1) {
  const playersContainer = document.getElementById('players-list');
  const url = `${playersUrl}?page=${page}&size=${pageSize}`;
  try {
    const response = await fetch(url, options);
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
              <button class="btn btn-dark btn-sm" onclick="showPlayerInfo('${player.id}')">
                Ver jugador
              </button>
            </div>
          </div>
        `;
        playersContainer.appendChild(card);
      });

      // Mostrar botón "Ver más"
      renderPlayerPagination(data.pagination);
    } else {
      playersContainer.innerHTML = '<p class="text-center">No se encontraron jugadores.</p>';
    }
  } catch (error) {
    console.error("Error al cargar jugadores:", error);
    playersContainer.innerHTML = '<p class="text-center text-danger">Error al obtener los jugadores.</p>';
  }
}

// Mostrar Detalle del Jugador
async function showPlayerInfo(playerId) {
  const playerDetails = document.getElementById('player-details');
  const modal = new bootstrap.Modal(document.getElementById('playerModal'));
  playerDetails.innerHTML = '<p class="text-muted">Cargando información...</p>';
  modal.show();

  try {
    const response = await fetch(playerInfoUrl(playerId), options);
    const data = await response.json();
    console.log("Detalle jugador:", data);

    if (data.status === "OK" && data.data?.info) {
      const info = data.data.info;
      const team = data.data.team || {};
      const socials = data.data.socials || {}; 

      const socialsHtml = `
        ${socials.twitter_url ? `
          <a href="${socials.twitter_url}" target="_blank" class="btn btn-outline-primary btn-sm">
            <i class="bi bi-twitter"></i> ${socials.twitter}
          </a>` : ''}
        ${socials.twitch_url ? `
          <a href="${socials.twitch_url}" target="_blank" class="btn btn-outline-purple btn-sm">
            <i class="bi bi-twitch"></i> ${socials.twitch}
          </a>` : ''}
      ` || '<p class="text-muted">Sin redes sociales disponibles.</p>';

      // Modal
      playerDetails.innerHTML = `
        <img src="${info.img || 'https://via.placeholder.com/120'}" 
             alt="${info.user}" 
             class="rounded-circle mb-3 shadow-sm"  
             width="120" height="120">
        <h3>${info.name}</h3>
        <p class="text-muted">@${info.user}</p>
        <hr>
        <p>
          <strong>País:</strong> ${info.country?.toUpperCase() || 'N/A'} 
          ${info.flag ? `<img src="https://flagcdn.com/24x18/${info.flag}.png" 
                         alt="${info.country}" 
                         class="ms-2 rounded border">` : ''}
        </p>
        <p>
          <strong>Equipo:</strong> 
          ${team.name 
            ? `<a href="${team.url}" target="_blank">${team.name}</a> 
               ${team.logo ? `<img src="${team.logo}" alt="${team.name}" width="40" class="ms-2 rounded-circle border">` : ''}
               <br><small class="text-muted">${team.joined || ''}</small>`
            : 'Sin equipo'}
        </p>
        <hr>
        <div class="d-flex flex-wrap justify-content-center gap-3 mt-2">
          ${socialsHtml}
        </div>
        <hr>
        <a href="${info.url}" target="_blank" class="btn btn-dark btn-sm mt-3">
          Ver perfil en VLR.gg
        </a>
      `;
    } else {
      playerDetails.innerHTML = '<p class="text-danger">No se pudo cargar la información del jugador.</p>';
    }
  } catch (error) {
    console.error("Error al cargar detalle del jugador:", error);
    playerDetails.innerHTML = '<p class="text-danger">Error al obtener los detalles del jugador.</p>';
  }
}


// Paginación de equipos
function renderTeamPagination(pagination) {
  const section = document.querySelector('#teams-list').parentElement;
  let btnContainer = document.getElementById('team-pagination');
  if (!btnContainer) {
    btnContainer = document.createElement('div');
    btnContainer.id = 'team-pagination';
    btnContainer.className = 'text-center mt-3';
    section.appendChild(btnContainer);
  }

  btnContainer.innerHTML = `
    <button class="btn btn-outline-danger me-2" 
            ${pagination.page <= 1 ? 'disabled' : ''}
            onclick="loadTeams(${pagination.page - 1})">
      ← Anterior
    </button>
    <span>Página ${pagination.page} de ${pagination.totalPages}</span>
    <button class="btn btn-outline-danger ms-2" 
            ${!pagination.hasNextPage ? 'disabled' : ''}
            onclick="loadTeams(${pagination.page + 1})">
      Siguiente →
    </button>
  `;
}

// Paginación de jugadores
function renderPlayerPagination(pagination) {
  const section = document.querySelector('#players-list').parentElement;
  let btnContainer = document.getElementById('player-pagination');
  if (!btnContainer) {
    btnContainer = document.createElement('div');
    btnContainer.id = 'player-pagination';
    btnContainer.className = 'text-center mt-3';
    section.appendChild(btnContainer);
  }

  btnContainer.innerHTML = `
    <button class="btn btn-outline-dark me-2" 
            ${pagination.page <= 1 ? 'disabled' : ''}
            onclick="loadPlayers(${pagination.page - 1})">
      ← Anterior
    </button>
    <span>Página ${pagination.page} de ${pagination.totalPages}</span>
    <button class="btn btn-outline-dark ms-2" 
            ${!pagination.hasNextPage ? 'disabled' : ''}
            onclick="loadPlayers(${pagination.page + 1})">
      Siguiente →
    </button>
  `;
}

// Cargar Eventos
const eventsPerPage = 10; 

async function loadEvents(page = 1) {
  const eventsContainer = document.getElementById('events-list');
  const url = `${eventsUrl}&page=${page}&size=${eventsPerPage}`;
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    console.log("Eventos:", data);

    if (data?.status === "OK" && Array.isArray(data.data)) {
      eventsContainer.innerHTML = "";
      data.data.forEach(event => {
        const card = document.createElement('div');
        card.className = 'col-md-3 mb-4';
        card.innerHTML = `
          <div class="card h-100 shadow-sm border-0">
            <img src="${event.img || 'https://via.placeholder.com/200x200'}"
                 class="card-img-top p-3" alt="${event.name}">
            <div class="card-body text-center">
              <h5 class="card-title mb-2">${event.name}</h5>
              <p class="text-muted mb-1">
                <strong>Estado:</strong> ${event.status || 'N/A'}<br>
                <strong>Premio:</strong> ${event.prizepool || 'No especificado'}<br>
                <strong>Fechas:</strong> ${event.dates || 'Sin datos'}<br>
                <strong>País:</strong> ${event.country?.toUpperCase() || 'N/A'}
              </p>
            </div>
          </div>
        `;
        eventsContainer.appendChild(card);
      });

      let paginationObj = data.pagination;
      if (!paginationObj) {
        const totalItems = Number(data.size) || 0; 
        const totalPages = totalItems > 0 ? Math.ceil(totalItems / eventsPerPage) : 1;
        paginationObj = {
          page: page,
          totalPages: totalPages,
          hasNextPage: page < totalPages
        };
      }
      renderEventPagination(paginationObj);
    } else {
      eventsContainer.innerHTML = '<p class="text-center">No se encontraron eventos.</p>';
      const existing = document.getElementById('event-pagination');
      if (existing) existing.innerHTML = '';
    }
  } catch (error) {
    console.error("Error al cargar eventos:", error);
    eventsContainer.innerHTML = '<p class="text-center text-danger">Error al obtener los eventos.</p>';
  }
}

// Paginación de eventos
function renderEventPagination(pagination) {
  const page = Number(pagination?.page) || 1;
  const totalPages = Number(pagination?.totalPages) || 1;
  const hasNext = (typeof pagination?.hasNextPage === 'boolean') ? pagination.hasNextPage : (page < totalPages);

  const section = document.querySelector('#events-list').parentElement;
  let btnContainer = document.getElementById('event-pagination');
  if (!btnContainer) {
    btnContainer = document.createElement('div');
    btnContainer.id = 'event-pagination';
    btnContainer.className = 'text-center mt-3';
    section.appendChild(btnContainer);
  }

  btnContainer.innerHTML = `
    <button class="btn btn-outline-primary me-2" 
            ${page <= 1 ? 'disabled' : ''}
            onclick="loadEvents(${page - 1})">
      ← Anterior
    </button>
    <span>Página ${page} de ${totalPages}</span>
    <button class="btn btn-outline-primary ms-2" 
            ${!hasNext ? 'disabled' : ''}
            onclick="loadEvents(${page + 1})">
      Siguiente →
    </button>
  `;
}

// Inicializar
document.addEventListener("DOMContentLoaded", () => {
  loadTeams();
  loadPlayers();
  loadEvents();
});


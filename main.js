/**
 * Lógica Principal e Eventos
 */

// Navegação entre as 5 vistas
function showView(viewId) {
    // Esconder todas
    document.querySelectorAll('.view').forEach(v => v.style.display = 'none');
    // Mostrar a pretendida
    const target = document.getElementById(`view-${viewId}`);
    target.style.display = (viewId === 'details') ? 'block' : 'grid';

    // Carregar dados específicos conforme a vista
    if (viewId === 'home') loadGames('games', 'view-home');
    if (viewId === 'top') loadGames('games', 'view-top', '&ordering=-metacritic&dates=2024-01-01,2024-12-31');
    if (viewId === 'upcoming') loadGames('games', 'view-upcoming', '&ordering=-released&dates=2025-01-01,2025-12-31');
    if (viewId === 'collection') loadCollection();
}

// Função genérica assíncrona para carregar jogos
async function loadGames(endpoint, containerId, extraParams = "") {
    const platform = document.getElementById('platformFilter').value;
    const sort = document.getElementById('sortOrder').value;
    
    let params = `${extraParams}&platforms=${platform}&ordering=${sort}`;
    const games = await fetchGames(endpoint, params);
    renderGameCards(games, containerId);
}

// Pesquisa (Evento Input com Debounce simples)
document.getElementById('searchInput').addEventListener('input', async (e) => {
    const term = e.target.value;
    if (term.length > 2) {
        const results = await fetchGames('games', `&search=${term}`);
        showView('home'); // Redireciona para a home para ver resultados
        renderGameCards(results, 'view-home');
    }
});

// Gestão de Detalhes (Operação Assíncrona Real)
async function showGameDetails(gameId) {
    showView('details');
    const game = await fetchGames(`games/${gameId}`);
    renderDetailedView(game);
}

// LocalStorage: Favoritos
function toggleFavorite(game) {
    let favorites = JSON.parse(localStorage.getItem('gamerVault_favs')) || [];
    const exists = favorites.find(f => f.id === game.id);

    if (exists) {
        favorites = favorites.filter(f => f.id !== game.id);
    } else {
        favorites.push({id: game.id, name: game.name, background_image: game.background_image, metacritic: game.metacritic});
    }

    localStorage.setItem('gamerVault_favs', JSON.stringify(favorites));
}

function loadCollection() {
    const favorites = JSON.parse(localStorage.getItem('gamerVault_favs')) || [];
    renderGameCards(favorites, 'view-collection');
}

// Filtros (Eventos Change)
document.getElementById('platformFilter').addEventListener('change', () => showView('home'));
document.getElementById('sortOrder').addEventListener('change', () => showView('home'));

// Inicialização ao carregar a página
window.onload = () => {
    showView('home');
};
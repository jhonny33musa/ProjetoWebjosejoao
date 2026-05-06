/**
 * Lógica Principal e Eventos
 */
// Verifica se o utilizador está logado logo ao carregar
if (sessionStorage.getItem('isLogged') !== 'true') {
    window.location.href = 'login.html';
}

// Atualiza a inicial na roda da conta
window.addEventListener('DOMContentLoaded', () => {
    const name = sessionStorage.getItem('userName') || "U";
    document.getElementById('userInitial').textContent = name.charAt(0);
});

// Função de Log Out
function logout() {
    if (confirm("Desejas encerrar a sessão?")) {
        sessionStorage.clear();
        window.location.href = 'login.html';
    }
}
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
    // 1. Obter a lista atual
    let favorites = JSON.parse(localStorage.getItem('gamerVault_favs')) || [];
    
    // 2. Verificar se o jogo já existe na lista
    const exists = favorites.find(f => f.id === game.id);

    if (exists) {
        // REMOVER: Cria um novo array excluindo o jogo com este ID
        favorites = favorites.filter(f => f.id !== game.id);
        alert(`${game.name} removido da tua coleção!`);
    } else {
        // ADICIONAR: Coloca o jogo na lista
        favorites.push({
            id: game.id,
            name: game.name,
            background_image: game.background_image,
            metacritic: game.metacritic
        });
        alert(`${game.name} adicionado à coleção!`);
    }

    // 3. Atualizar o localStorage
    localStorage.setItem('gamerVault_favs', JSON.stringify(favorites));
    
    // 4. Se o utilizador estiver na página de coleção, recarregar a vista imediatamente
    const collectionPage = document.getElementById('view-collection');
    if (collectionPage.style.display !== 'none') {
        loadCollection();
    }
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
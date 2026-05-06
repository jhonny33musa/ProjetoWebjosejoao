/**
 * Lógica Principal e Controlo de Vistas
 */

// 1. Função de Navegação (A que estava a dar erro de "not defined")
function showView(viewId) {
    console.log("A mudar para a vista:", viewId); // Debug para veres na consola
    
    // Esconder todas as secções
    const views = document.querySelectorAll('.view');
    views.forEach(v => v.style.display = 'none');

    // Mostrar a secção pretendida
    const targetView = document.getElementById(`view-${viewId}`);
    if (targetView) {
        // Detalhes usa 'block', as outras usam 'grid' para os cartões
        targetView.style.display = (viewId === 'details') ? 'block' : 'grid';
    }

    // Executar a função de carregamento correspondente
    if (viewId === 'home') loadGames('games', 'view-home');
    if (viewId === 'top') loadGames('games', 'view-top', '&ordering=-metacritic&dates=2024-01-01,2024-12-31');
    if (viewId === 'upcoming') loadGames('games', 'view-upcoming', '&ordering=-released&dates=2025-01-01,2025-12-31');
    if (viewId === 'collection') loadCollection();
}

// 2. Carregar jogos da API de forma assíncrona
async function loadGames(endpoint, containerId, extraParams = "") {
    const platform = document.getElementById('platformFilter').value;
    const sort = document.getElementById('sortOrder').value;
    
    // Construir os parâmetros (Filtros + Ordenação)
    let params = `${extraParams}&platforms=${platform}&ordering=${sort}`;
    
    const games = await fetchGames(endpoint, params); // Chama a função do api.js
    renderGameCards(games, containerId); // Chama a função do dom.js
}

// 3. Função para a vista de Favoritos (Coleção)
function loadCollection() {
    const favorites = JSON.parse(localStorage.getItem('gamerVault_favs')) || [];
    renderGameCards(favorites, 'view-collection');
}

// 4. Lógica de Pesquisa com evento 'input'
document.getElementById('searchInput').addEventListener('input', async (e) => {
    const term = e.target.value;
    if (term.length > 2) {
        const results = await fetchGames('games', `&search=${term}`);
        // Mostra os resultados na view-home
        document.querySelectorAll('.view').forEach(v => v.style.display = 'none');
        document.getElementById('view-home').style.display = 'grid';
        renderGameCards(results, 'view-home');
    }
});

// 5. Inicialização: O que acontece quando abres o site
window.onload = () => {
    console.log("Aplicação iniciada com sucesso!");
    showView('home'); // Carrega a página inicial por defeito
};
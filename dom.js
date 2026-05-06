/**
 * Módulo de Manipulação do DOM
 */

// Renderiza uma lista de jogos em formato de cartões
function renderGameCards(games, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = ""; 

    games.forEach(game => { // <-- O 'game' é definido aqui para cada iteração
        
        // 1. Verificar se ESTE jogo específico é favorito (Lógica corrigida)
        const favorites = JSON.parse(localStorage.getItem('gamerVault_favs')) || [];
        const isFav = favorites.some(f => f.id === game.id);

        const card = document.createElement('div');
        card.className = 'game-card';

        // ... código da imagem, título, etc (mantém o que tens) ...

        // 2. Criar o botão de favorito com a cor correta
        const favBtn = document.createElement('button');
        favBtn.className = 'fav-btn';
        favBtn.innerHTML = '❤';
        
        // Se for favorito, pintamos de vermelho, se não, fica branco/cinza
        favBtn.style.color = isFav ? '#ff4b2b' : '#ffffff';

        favBtn.onclick = (e) => {
            e.stopPropagation();
            toggleFavorite(game); // Esta função está no main.js
            
            // Truque visual: muda a cor mal clicas para feedback imediato
            favBtn.style.color = favBtn.style.color === 'rgb(255, 75, 43)' ? '#ffffff' : '#ff4b2b';
        };

        // ... resto dos appends ...
        card.appendChild(favBtn);
        container.appendChild(card);
    });
}
// Renderiza a vista detalhada de um jogo
function renderDetailedView(game) {
    const container = document.getElementById('view-details');
    
    // Criamos uma estrutura mais limpa e com classes para o CSS
    container.innerHTML = `
        <div class="detail-container">
            <button class="back-btn" onclick="showView('home')">← Voltar à Biblioteca</button>
            
            <div class="detail-header">
                <img src="${game.background_image}" alt="${game.name}" class="detail-banner">
                <div class="detail-title-box">
                    <h1>${game.name}</h1>
                    <span class="metascore">Metascore: ${game.metacritic || 'N/A'}</span>
                </div>
            </div>

            <div class="detail-info">
                <div class="description">
                    <h3>Sobre o Jogo</h3>
                    <p>${game.description_raw || "Sem descrição disponível."}</p>
                </div>
                
                <div class="meta-data">
                    <p><strong>📅 Lançamento:</strong> ${game.released}</p>
                    <p><strong>🎮 Plataformas:</strong> ${game.platforms.map(p => p.platform.name).join(', ')}</p>
                    <p><strong>🏷️ Géneros:</strong> ${game.genres.map(g => g.name).join(', ')}</p>
                </div>
            </div>
        </div>
    `;
}
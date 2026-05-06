/**
 * Módulo de Manipulação do DOM
 */

// Renderiza uma lista de jogos em formato de cartões
function renderGameCards(games, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = ""; 

    if (games.length === 0) {
        container.innerHTML = "<p>Nenhum jogo encontrado.</p>";
        return;
    }

    games.forEach(game => {
        // 1. Criar Contentor do Cartão
        const card = document.createElement('div');
        card.className = 'game-card';

        // 2. Imagem
        const img = document.createElement('img');
        img.src = game.background_image || 'https://via.placeholder.com/400x200?text=No+Image';
        img.alt = game.name;

        // 3. Título
        const title = document.createElement('h3');
        title.textContent = game.name;

        // 4. Rating (Metacritic)
        const rating = document.createElement('span');
        rating.textContent = `⭐ Metascore: ${game.metacritic || 'N/A'}`;

        // 5. Botão de Favorito (localStorage)
        const favBtn = document.createElement('button');
        favBtn.className = 'fav-btn';
        favBtn.innerHTML = '❤';
        favBtn.onclick = (e) => {
            e.stopPropagation();
            toggleFavorite(game);
        };

        // 6. Botão Detalhes
        const detailBtn = document.createElement('button');
        detailBtn.textContent = "Ver Detalhes";
        detailBtn.onclick = () => showGameDetails(game.id);

        // Montagem (Append)
        card.appendChild(img);
        card.appendChild(favBtn);
        card.appendChild(title);
        card.appendChild(rating);
        card.appendChild(detailBtn);
        
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
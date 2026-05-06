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
    container.innerHTML = `
        <div class="detail-content">
            <button onclick="showView('home')">← Voltar</button>
            <img src="${game.background_image_additional || game.background_image}" style="width:100%; border-radius:10px;">
            <h1>${game.name}</h1>
            <p><strong>Lançamento:</strong> ${game.released}</p>
            <p>${game.description_raw || 'Sem descrição disponível.'}</p>
            <div class="platforms">
                <strong>Plataformas:</strong> 
                ${game.platforms.map(p => p.platform.name).join(', ')}
            </div>
        </div>
    `;
}
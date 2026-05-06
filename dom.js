function renderGameCards(games, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return; // Segurança caso o ID não exista
    
    container.innerHTML = ""; 

    if (!games || games.length === 0) {
        container.innerHTML = "<p class='no-data'>Nenhum jogo encontrado.</p>";
        return;
    }

    games.forEach(game => {
        // 1. Verificar se é favorito para definir a cor inicial
        const favorites = JSON.parse(localStorage.getItem('gamerVault_favs')) || [];
        const isFav = favorites.some(f => f.id === game.id);

        // 2. Criar o Card
        const card = document.createElement('div');
        card.className = 'game-card';

        // 3. Imagem
        const img = document.createElement('img');
        img.src = game.background_image || 'https://via.placeholder.com/400x200';
        img.alt = game.name;

        // 4. Botão de Favorito (Coração)
        const favBtn = document.createElement('button');
        favBtn.className = 'fav-btn';
        favBtn.innerHTML = '❤';
        favBtn.style.color = isFav ? '#ff4b2b' : '#ffffff';
        
        favBtn.onclick = (e) => {
            e.stopPropagation();
            toggleFavorite(game); // Esta função está no main.js
            
            // Atualiza a cor do coração sem precisar de refresh
            const updatedFavs = JSON.parse(localStorage.getItem('gamerVault_favs')) || [];
            const currentlyFav = updatedFavs.some(f => f.id === game.id);
            favBtn.style.color = currentlyFav ? '#ff4b2b' : '#ffffff';
        };

        // 5. Conteúdo de texto
        const title = document.createElement('h3');
        title.textContent = game.name;

        const rating = document.createElement('span');
        rating.innerHTML = `⭐ Metascore: ${game.metacritic || 'N/A'}`;

        // 6. Botão de Detalhes
        const detailBtn = document.createElement('button');
        detailBtn.className = 'detail-btn';
        detailBtn.textContent = "Ver Detalhes";
        detailBtn.onclick = () => showGameDetails(game.id);

        // 7. Montar o Card
        card.appendChild(img);
        card.appendChild(favBtn);
        card.appendChild(title);
        card.appendChild(rating);
        card.appendChild(detailBtn);
        
        container.appendChild(card);
    });
}

function renderDetailedView(game) {
    const container = document.getElementById('view-details');
    if (!container) return;

    container.innerHTML = `
        <div class="detail-container">
            <button class="back-btn" onclick="showView('home')">← Voltar</button>
            <div class="detail-header">
                <img src="${game.background_image}" class="detail-banner">
                <h1>${game.name}</h1>
                <span class="metascore">${game.metacritic || 'N/A'}</span>
            </div>
            <div class="detail-info">
                <p>${game.description_raw || 'Sem descrição.'}</p>
                <div class="meta-tags">
                    <p><strong>Lançamento:</strong> ${game.released}</p>
                    <p><strong>Plataformas:</strong> ${game.platforms.map(p => p.platform.name).join(', ')}</p>
                </div>
            </div>
        </div>
    `;
}
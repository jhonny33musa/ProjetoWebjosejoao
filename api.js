/**
 * Comunicação com a API (RAWG)
 */
const API_KEY = '66d499a1e24f4b168c4d34232b612a65'; // Obtém em https://rawg.io/apidocs
const BASE_URL = 'https://api.rawg.io/api/';

async function fetchGames(endpoint, params = "") {
    try {
        const response = await fetch(`${BASE_URL}${endpoint}?key=${API_KEY}${params}`);
        
        if (!response.ok) {
            throw new Error(`Erro na API: ${response.status}`);
        }

        const data = await response.json();
        
        // Se for um detalhe único, retorna o objeto; se for lista, retorna o array results
        return data.results ? data.results : data;
    } catch (error) {
        console.error("Erro ao procurar dados:", error);
        // Exemplo de Tratamento de Erros (Requisito)
        const container = document.querySelector('.view:not([style*="none"])');
        container.innerHTML = `<p class="error">Pedimos desculpa, ocorreu um erro ao carregar os jogos.</p>`;
        return [];
    }
}
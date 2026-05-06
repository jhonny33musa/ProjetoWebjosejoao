/**
 * Comunicação com a API (RAWG)
 */
const API_KEY = '66d499a1e24f4b168c4d34232b612a65'; // Obtém em https://rawg.io/apidocs
const BASE_URL = 'https://api.rawg.io/api/';

async function fetchGames(endpoint, params = "") {
    try {
        const response = await fetch(`${BASE_URL}${endpoint}?key=${API_KEY}${params}`);
        if (!response.ok) throw new Error(`Erro: ${response.status}`);
        const data = await response.json();
        return data.results ? data.results : data;
    } catch (error) {
        console.error("Erro na API:", error);
        return [];
    }
}
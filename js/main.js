import { fetchTMDB } from './api.js';
import { renderCards, showLoading } from './ui.js';

async function init() {
    // Show loading text while fetching
    showLoading("trendingGrid");
    
    // Fetch and render data
    try {
        const trending = await fetchTMDB('/trending/movie/day');
        renderCards(trending, "trendingGrid");

        const series = await fetchTMDB('/discover/tv');
        renderCards(series, "seriesGrid");
    } catch (error) {
        console.error("Initialization failed:", error);
    }
}

document.addEventListener("DOMContentLoaded", init);

import { fetchTMDB } from './api.js';
import { renderCards, showLoading } from './ui.js';

async function init() {
    // Show loading
    showLoading("trendingGrid");
    showLoading("seriesGrid");
    showLoading("serialGrid");
    
    try {
        // 1. Trending Movies
        const trending = await fetchTMDB('/trending/movie/day');
        renderCards(trending, "trendingGrid");

        // 2. Latest Series (TV Shows)
        const latestSeries = await fetchTMDB('/tv/on_the_air');
        renderCards(latestSeries, "seriesGrid");

        // 3. Anime (Top Rated Animation)
        const anime = await fetchTMDB('/discover/tv?with_genres=16&sort_by=vote_average.desc');
        renderCards(anime, "serialGrid");
    } catch (err) {
        console.error("Failed to load data:", err);
    }
}

// Search Logic
const searchInput = document.getElementById("searchInput");
searchInput.addEventListener("input", async function () {
    const query = searchInput.value;
    if (query.length < 3) return;
    
    const results = await fetchTMDB(`/search/multi?query=${query}`);
    renderCards(results, "searchGrid");
    document.getElementById("searchSection").style.display = "block";
});

document.addEventListener("DOMContentLoaded", init);

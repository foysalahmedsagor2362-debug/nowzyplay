import { fetchTMDB, fetchCustom } from './api.js';
import { renderCards, renderRankedCards, showLoading } from './ui.js';

async function init() {
    // Show loading
    showLoading("trendingGrid");
    showLoading("seriesGrid");
    showLoading("serialGrid");
    
    try {
        // 1. TOP 10 (Ranked)
        const top10 = await fetchCustom('/movie/top_rated?page=1');
        renderRankedCards(top10.slice(0, 10), "trendingGrid");

        // 2. TRENDING (Movies)
        const trending = await fetchTMDB('/trending/movie/day');
        renderCards(trending.slice(0, 10), "seriesGrid");

        // 3. LATEST SERIES (TV Shows)
        const latestSeries = await fetchTMDB('/discover/tv?sort_by=first_air_date.desc');
        renderCards(latestSeries.slice(0, 10), "serialGrid");
        
    } catch (err) {
        console.error("Initialization failed:", err);
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

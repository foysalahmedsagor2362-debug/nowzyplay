import { fetchTMDB, fetchCustom } from './api.js';
import { renderCards, renderRankedCards, showLoading } from './ui.js';

async function init() {
    // Show loading for all 4 sections
    showLoading("trendingGrid");
    showLoading("seriesGrid");
    showLoading("animeGrid");
    showLoading("serialGrid");
    
    try {
        // 1. TOP 10 (Ranked) -> Trending
        const top10 = await fetchCustom('/movie/top_rated?page=1');
        renderRankedCards(top10.slice(0, 10), "trendingGrid");

        // 2. TRENDING (Movies) -> Series Section
        const trending = await fetchTMDB('/trending/movie/day');
        renderCards(trending.slice(0, 10), "seriesGrid");

        // 3. ANIME (Genre 16) -> Anime Section
        const anime = await fetchTMDB('/discover/tv?with_genres=16');
        renderCards(anime.slice(0, 10), "animeGrid");

        // 4. LATEST SERIALS -> Serial Section
        const latestSerials = await fetchTMDB('/discover/tv?sort_by=first_air_date.desc');
        renderCards(latestSerials.slice(0, 10), "serialGrid");
        
    } catch (err) {
        console.error("Initialization failed:", err);
    }
}

// Navigation Helper (to switch views)
window.navigate = (page) => {
    const sections = {
        home: ["trendingSection", "seriesSection", "animeSection", "serialSection"],
        movies: ["trendingSection"],
        series: ["seriesSection"],
        anime: ["animeSection"],
        serials: ["serialSection"]
    };

    // Logic to hide/show sections based on clicked nav link
    document.querySelectorAll('.trending').forEach(sec => sec.style.display = 'none');
    
    if (sections[page]) {
        sections[page].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.style.display = 'block';
        });
    }
};

// Search Logic
const searchInput = document.getElementById("searchInput");
if (searchInput) {
    searchInput.addEventListener("input", async function () {
        const query = searchInput.value;
        if (query.length < 3) return;
        
        const results = await fetchTMDB(`/search/multi?query=${query}`);
        renderCards(results, "searchGrid");
        document.getElementById("searchSection").style.display = "block";
    });
}

document.addEventListener("DOMContentLoaded", init);

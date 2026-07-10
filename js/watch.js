import { fetchTMDB } from './api.js';
import { renderCards, renderEpisodes } from './ui.js';

document.addEventListener("DOMContentLoaded", async () => {
    // 1. Retrieve the selected content
    const data = JSON.parse(localStorage.getItem("selectedMovie"));
    
    if (!data) {
        alert("No movie selected!");
        return;
    }

    console.log("Loading data for:", data.title);

    // 2. SET HERO DATA
    document.getElementById("title").innerText = data.title;
    document.getElementById("description").innerText = data.overview || "No description available.";
    
    // Background image
    const imgUrl = data.backdrop_path 
        ? `https://image.tmdb.org/t/p/original/${data.backdrop_path}` 
        : data.img;
    document.getElementById("heroBackground").style.backgroundImage = `url('${imgUrl}')`;

    // 3. TV SERIES LOGIC (Only if it's a TV show)
    if (data.type === 'tv') {
        document.getElementById("episodesSection").style.display = "block";
        
        const showDetails = await fetchTMDB(`/tv/${data.id}`);
        const selector = document.getElementById("seasonSelector");
        
        selector.innerHTML = "";
        for (let i = 1; i <= showDetails.number_of_seasons; i++) {
            selector.innerHTML += `<option value="${i}">Season ${i}</option>`;
        }
        loadSeason(1, data.id);
    }

    // 4. LOAD SIMILAR CONTENT
    const endpoint = data.type === 'tv' ? `/tv/${data.id}/similar` : `/movie/${data.id}/similar`;
    const similar = await fetchTMDB(endpoint);
    renderCards(similar.slice(0, 4), "similarGrid");
});

// Helper function to load and render episodes
async function loadSeason(seasonNum, showId) {
    const seasonData = await fetchTMDB(`/tv/${showId}/season/${seasonNum}`);
    renderEpisodes(seasonData.episodes, "episodesGrid");
}

// Event: Season Change
document.getElementById("seasonSelector").addEventListener("change", (e) => {
    const data = JSON.parse(localStorage.getItem("selectedMovie"));
    loadSeason(e.target.value, data.id);
});

// 5. WATCH BUTTON LOGIC
document.getElementById("watchBtn").addEventListener("click", () => {
    const data = JSON.parse(localStorage.getItem("selectedMovie"));
    const player = document.getElementById("player");
    
    // Hide Hero elements
    document.querySelector(".watch-hero").style.display = "none";
    
    // Set Video Source (Template for 2Embed)
    const videoUrl = data.type === 'tv' 
        ? `https://www.2embed.cc/embedtv/${data.id}` 
        : `https://www.2embed.cc/embed/${data.id}`;
        
    player.src = videoUrl;
    player.style.display = "block";
    player.load();
    player.play().catch(err => console.log("Play error:", err));
});

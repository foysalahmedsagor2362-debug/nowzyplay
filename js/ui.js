export function renderCards(data, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = ""; 

    data.forEach((item) => {
        const card = document.createElement("div");
        card.classList.add("movie-card");
        const imgPath = item.poster_path ? `https://image.tmdb.org/t/p/w500/${item.poster_path}` : 'Assets/placeholder.jpg';
        
        card.innerHTML = `<img src="${imgPath}"><div class="movie-title">${item.title || item.name}</div>`;
        
        card.onclick = () => {
            // UPDATED: Now saves type and backdrop for the new Watch Page
            localStorage.setItem("selectedMovie", JSON.stringify({ 
                id: item.id,
                type: item.media_type || (item.first_air_date ? 'tv' : 'movie'),
                title: item.title || item.name, 
                img: imgPath, 
                backdrop_path: item.backdrop_path, 
                overview: item.overview 
            }));
            window.location.href = "watch.html";
        };
        container.appendChild(card);
    });
}

export function renderRankedCards(data, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = ""; 

    data.forEach((item, index) => {
        const card = document.createElement("div");
        card.classList.add("movie-card", "ranked");
        const imgPath = `https://image.tmdb.org/t/p/w500/${item.poster_path}`;
        
        card.innerHTML = `
            <span class="rank-number">${index + 1}</span>
            <img src="${imgPath}">
        `;
        
        card.onclick = () => {
            // UPDATED: Now saves type and backdrop for the new Watch Page
            localStorage.setItem("selectedMovie", JSON.stringify({ 
                id: item.id,
                type: item.media_type || (item.first_air_date ? 'tv' : 'movie'),
                title: item.title || item.name, 
                img: imgPath, 
                backdrop_path: item.backdrop_path, 
                overview: item.overview 
            }));
            window.location.href = "watch.html";
        };
        container.appendChild(card);
    });
}

export function renderEpisodes(episodes, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = ""; 

    episodes.forEach((ep) => {
        const episodeCard = document.createElement("div");
        episodeCard.classList.add("episode-card");
        const stillPath = ep.still_path ? `https://image.tmdb.org/t/p/w500/${ep.still_path}` : 'Assets/placeholder.jpg';
        
        episodeCard.innerHTML = `
            <img src="${stillPath}">
            <div class="ep-info">
                <h4>E${ep.episode_number}: ${ep.name}</h4>
            </div>
        `;
        container.appendChild(episodeCard);
    });
}

export function showLoading(containerId) {
    const container = document.getElementById(containerId);
    if (container) container.innerHTML = '<p>Loading...</p>';
}

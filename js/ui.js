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
            localStorage.setItem("selectedMovie", JSON.stringify({ title: item.title || item.name, img: imgPath, overview: item.overview }));
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
            localStorage.setItem("selectedMovie", JSON.stringify({ title: item.title, img: imgPath, overview: item.overview }));
            window.location.href = "watch.html";
        };
        container.appendChild(card);
    });
}

export function showLoading(containerId) {
    const container = document.getElementById(containerId);
    if (container) container.innerHTML = '<p>Loading...</p>';
}

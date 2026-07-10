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
            localStorage.setItem("selectedMovie", JSON.stringify({
                title: item.title || item.name,
                img: imgPath,
                overview: item.overview
            }));
            window.location.href = "watch.html";
        };
        container.appendChild(card);
    });
}

export function showLoading(containerId) {
    const container = document.getElementById(containerId);
    if (container) container.innerHTML = '<p>Loading movies...</p>';
}

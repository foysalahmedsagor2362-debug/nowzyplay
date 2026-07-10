// --- CONFIGURATION ---
const API_KEY = '0b3d17a4fe3dd52593a48d9a0dad4bd6';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_BASE_URL = 'https://image.tmdb.org/t/p/w500';

// ================= NAVIGATION =================
function navigate(page) {
    const hero = document.getElementById("heroSection");
    const trending = document.getElementById("trendingSection");
    const series = document.getElementById("seriesSection");
    const anime = document.getElementById("animeSection");
    const serials = document.getElementById("serialSection");
    const search = document.getElementById("searchSection");

    const sections = { hero, trending, series, anime, serials };
    
    // Hide all
    Object.values(sections).forEach(s => s.style.display = "none");
    search.style.display = "none";

    if (page === "home") {
        Object.values(sections).forEach(s => s.style.display = "block");
    } else if (page === "movies") {
        trending.style.display = "block";
    } else if (page === "series") {
        series.style.display = "block";
    } else if (page === "anime") {
        anime.style.display = "block";
    }
}

// FIX: Ensure loginModal is HIDDEN on load
document.addEventListener("DOMContentLoaded", () => {
    navigate("home");
    document.getElementById("loginModal").classList.add("hidden");
});

// ================= MENU & SLIDER =================
let burger = document.querySelector(".burger");
let menu = document.getElementById("menu");
burger.onclick = () => menu.classList.toggle("hidden");

function goPage(page) { window.location.href = page; }

// FIX: Only initialize slider if slides exist to prevent errors
let slider = document.getElementById("slider");
let slides = document.querySelectorAll(".slide");

if (slides.length > 0) {
    let index = 1;
    let gap = 20;
    let slideWidth = slides[0].offsetWidth;
    let totalWidth = slideWidth + gap;

    let firstClone = slides[0].cloneNode(true);
    let lastClone = slides[slides.length - 1].cloneNode(true);
    slider.appendChild(firstClone);
    slider.insertBefore(lastClone, slides[0]);
    slides = document.querySelectorAll(".slide");

    function moveSlider(animation = true) {
        let heroWidth = document.querySelector(".hero").offsetWidth;
        let center = (heroWidth - slideWidth) / 2;
        slider.style.transition = animation ? "0.5s" : "none";
        slider.style.transform = `translateX(${center - (index * totalWidth)}px)`;
    }
    moveSlider(false);
    document.querySelector(".next").onclick = () => { index++; moveSlider(); };
    document.querySelector(".prev").onclick = () => { index--; moveSlider(); };
    setInterval(() => { index++; moveSlider(); }, 5000);
}

// ================= LOGIN SYSTEM =================
const modal = document.getElementById("loginModal");
const closeBtn = document.getElementById("closeModal");
const loginBtn = document.querySelector(".login");

closeBtn.addEventListener("click", () => modal.classList.add("hidden"));
modal.addEventListener("click", (e) => { if (e.target === modal) modal.classList.add("hidden"); });

function loginUser() {
    const username = document.getElementById("username").value;
    if (!username) return alert("Enter username");
    localStorage.setItem("user", username);
    modal.classList.add("hidden");
    updateLoginUI();
}

function updateLoginUI() {
    const user = localStorage.getItem("user");
    loginBtn.textContent = user ? "User: " + user : "Login";
}

loginBtn.addEventListener("click", () => {
    if (localStorage.getItem("user")) {
        localStorage.removeItem("user");
        updateLoginUI();
    } else {
        modal.classList.remove("hidden");
    }
});
window.addEventListener("DOMContentLoaded", updateLoginUI);

// ================= DYNAMIC API DATA =================
async function fetchTMDB(endpoint) {
    const response = await fetch(`${BASE_URL}${endpoint}?api_key=${API_KEY}`);
    const data = await response.json();
    return data.results;
}

function renderCards(data, containerId) {
    const container = document.getElementById(containerId);
    if(!container) return;
    container.innerHTML = ""; 

    data.forEach((item) => {
        const card = document.createElement("div");
        card.classList.add("movie-card");
        const imgPath = item.poster_path ? `${IMG_BASE_URL}${item.poster_path}` : 'Assets/placeholder.jpg';
        
        card.innerHTML = `<img src="${imgPath}"><div class="movie-title">${item.title || item.name}</div>`;
        card.onclick = () => {
            localStorage.setItem("selectedMovie", JSON.stringify({
                id: item.id,
                title: item.title || item.name,
                img: imgPath,
                overview: item.overview
            }));
            window.location.href = "watch.html";
        };
        container.appendChild(card);
    });
}

async function loadContent() {
    renderCards(await fetchTMDB('/trending/movie/day'), "trendingGrid");
    renderCards(await fetchTMDB('/discover/tv'), "seriesGrid");
    renderCards(await fetchTMDB('/discover/tv?with_genres=16'), "animeGrid");
    renderCards(await fetchTMDB('/discover/movie?with_genres=10751'), "serialGrid");
}

loadContent();

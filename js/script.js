// --- CONFIGURATION ---
const API_KEY = '0b3d17a4fe3dd52593a48d9a0dad4bd6'; // Your API Key
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_BASE_URL = 'https://image.tmdb.org/t/p/w500';

// ================= NAVIGATION =================
function navigate(page) {
    const hero = document.getElementById("heroSection");
    const trending = document.getElementById("trendingSection");
    const series = document.getElementById("seriesSection");
    const serials = document.getElementById("serialSection");

    const sections = { hero, trending, series, serials };
    
    // Hide all
    Object.values(sections).forEach(s => s.style.display = "none");

    if (page === "home") {
        Object.values(sections).forEach(s => s.style.display = "block");
    } else if (page === "movies") {
        trending.style.display = "block";
    } else if (page === "series") {
        series.style.display = "block";
    } else if (page === "anime") {
        serials.style.display = "block";
    }
}

window.onload = () => { navigate("home"); };

// ================= MENU & SLIDER (Your original code kept) =================
let burger = document.querySelector(".burger");
let menu = document.getElementById("menu");
burger.onclick = () => menu.classList.toggle("hidden");

function goPage(page) { window.location.href = page; }

let slider = document.getElementById("slider");
let slides = document.querySelectorAll(".slide");
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

slider.addEventListener("transitionend", () => {
    if (index === slides.length - 1) { index = 1; moveSlider(false); }
    if (index === 0) { index = slides.length - 2; moveSlider(false); }
});

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
    loginBtn.textContent = user ? "Logged in: " + user : "Login";
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
    const trending = await fetchTMDB('/trending/movie/day');
    renderCards(trending, "trendingGrid");

    const series = await fetchTMDB('/discover/tv');
    renderCards(series, "seriesGrid");

    const anime = await fetchTMDB('/discover/tv?with_genres=16');
    renderCards(anime, "serialGrid"); // Using serialGrid for Anime
}

loadContent();

// ================= SEARCH LOGIC =================
const searchInput = document.getElementById("searchInput");
searchInput.addEventListener("input", async function () {
    const query = searchInput.value;
    if (query.length < 3) return;
    const results = await fetchTMDB(`/search/multi?query=${query}`);
    renderCards(results, "searchGrid");
    document.getElementById("searchSection").style.display = "block";
});

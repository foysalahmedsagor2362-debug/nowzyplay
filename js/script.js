// navigation
function navigate(page) {

    const hero = document.getElementById("heroSection");
    const trending = document.getElementById("trendingSection");
    const series = document.getElementById("seriesSection");
    const serials = document.getElementById("serialSection");

    if (page === "home") {
        hero.style.display = "block";
        trending.style.display = "block";
        series.style.display = "block";
        serials.style.display = "block";
    }

    if (page === "movies") {
        hero.style.display = "none";   // HIDE SLIDER
        trending.style.display = "block";
        series.style.display = "none";
        serials.style.display = "none";
    }

    if (page === "series") {
        hero.style.display = "none";   // 
        trending.style.display = "none";
        series.style.display = "block";
        serials.style.display = "none";
    }

    if (page === "serials") {
        hero.style.display = "none";   
        trending.style.display = "none";
        series.style.display = "none";
        serials.style.display = "block";
    }
}
window.onload = () => {
    navigate("home");
};
// ================= MENU =================

let burger = document.querySelector(".burger");
let menu = document.getElementById("menu");

burger.onclick = () => {
    menu.classList.toggle("hidden");
};
//
function goPage(page) {
    window.location.href = page;
}
// ================= SLIDER =================

let slider = document.getElementById("slider");
let slides = document.querySelectorAll(".slide");

let index = 1;
let gap = 20;

// slide width
let slideWidth = slides[0].offsetWidth;

// total move distance
let totalWidth = slideWidth + gap;

// ================= CLONES =================

// clone first and last slide
let firstClone = slides[0].cloneNode(true);
let lastClone = slides[slides.length - 1].cloneNode(true);

// add clones
slider.appendChild(firstClone);
slider.insertBefore(lastClone, slides[0]);

// update slides
slides = document.querySelectorAll(".slide");

// ================= MOVE SLIDER =================

function moveSlider(animation = true) {

    // hero width
    let heroWidth = document.querySelector(".hero").offsetWidth;

    // center active slide
    let center = (heroWidth - slideWidth) / 2;

    // animation
    if (animation) {
        slider.style.transition = "0.5s";
    } else {
        slider.style.transition = "none";
    }

    // move slider
    slider.style.transform =
        `translateX(${center - (index * totalWidth)}px)`;
}

// first position
moveSlider(false);

// ================= NEXT BUTTON =================

document.querySelector(".next").onclick = () => {

    index++;

    moveSlider();
};

// ================= PREV BUTTON =================

document.querySelector(".prev").onclick = () => {

    index--;

    moveSlider();
};

// ================= AUTO SLIDE =================

setInterval(() => {

    index++;

    moveSlider();

}, 5000);

// ================= INFINITE LOOP =================

slider.addEventListener("transitionend", () => {

    // fake last slide
    if (index === slides.length - 1) {

        index = 1;

        moveSlider(false);
    }

    // fake first slide
    if (index === 0) {

        index = slides.length - 2;

        moveSlider(false);
    }
});


const row = document.querySelector(".movie-row");

//------------------ login   -----------------------------------

// ================= LOGIN SYSTEM =================

const modal = document.getElementById("loginModal");
const closeBtn = document.getElementById("closeModal");
const loginBtn = document.querySelector(".login");

// OPEN LOGIN MODAL
function openLogin() {
    modal.classList.remove("hidden");
}

// CLOSE MODAL
closeBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
});

// CLICK OUTSIDE CLOSE
modal.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.classList.add("hidden");
    }
});

// LOGIN FUNCTION
function loginUser() {
    const username = document.getElementById("username").value;

    if (!username) {
        alert("Enter username");
        return;
    }

    localStorage.setItem("user", username);

    modal.classList.add("hidden");

    updateLoginUI();
}

// UPDATE BUTTON UI
function updateLoginUI() {
    const user = localStorage.getItem("user");

    if (user) {
        loginBtn.textContent = "Logged in: " + user;
    } else {
        loginBtn.textContent = "Login";
    }
}

// TOGGLE LOGIN / LOGOUT
loginBtn.addEventListener("click", () => {
    const user = localStorage.getItem("user");

    if (user) {
        localStorage.removeItem("user");
        updateLoginUI();
    } else {
        openLogin();
    }
});

// INIT
window.addEventListener("DOMContentLoaded", updateLoginUI);

// ================= TRENDING DATA =================

// ================= REUSABLE FUNCTION =================

function renderCards(data, containerId) {

    const container = document.getElementById(containerId);

    container.innerHTML = ""; //  clear old content

    data.forEach((item) => {

        const card = document.createElement("div");
        card.classList.add("movie-card");

        const img = document.createElement("img");
        img.src = item.img;

        const title = document.createElement("div");
        title.classList.add("movie-title");
        title.innerText = item.title;

        card.appendChild(img);
        card.appendChild(title);

        //  IMPORTANT CONNECTION
        card.onclick = () => {

            if (!item.video) {
                alert("Video not available!");
                return;
            }

            localStorage.setItem("selectedMovie", JSON.stringify(item));

            window.location.href = "watch.html";
        };

        container.appendChild(card);
    });
}

// ================= DATA =================

// Trending (Movies)
const movies = [
    { img: "Assets/movie1_dhoni.webp", title: "Ms dhoni", video: "Assets/movie1.mp4" },
    { img: "Assets/movie_4_vazzha.webp", title: "vaazha", video: "Assets/movie1.mp4" },
    { img: "Assets/movie_5_amazingspiderman.jpg", title: "Amazingspiderman", video: "Assets/movie1.mp4" },
    { img: "Assets/movie3_jananayagan.jpg", title: "Jananayagan", video: "Assets/movie1.mp4" },
    { img: "Assets/movie2_kala.jpg", title: "kaala", video: "Assets/movie1.mp4" },
    { img: "Assets/trending list/Screenshot 2026-05-16 171652.png", title: "kolaiseval", video: "Assets/movie1.mp4" },
    { img: "Assets/trending list/Screenshot 2026-05-16 171719.png", title: "aadu", video: "Assets/movie1.mp4" },
    { img: "Assets/trending list/Screenshot 2026-05-16 171738.png", title: "Neelira", video: "Assets/movie1.mp4" }
];

// Series
const series = [
    { img: "Assets/series list/Screenshot 2026-05-16 173233.png", title: "ayali", video: "Assets/movie1.mp4" },
    { img: "Assets/series list/Screenshot 2026-05-16 173247.png", title: "mana shankaravara prasad", video: "Assets/movie1.mp4" },
    { img: "Assets/series list/Screenshot 2026-05-16 173338.png", title: "Warrant", video: "Assets/movie1.mp4" },
    { img: "Assets/series list/Screenshot 2026-05-16 173349.png", title: "The Charge sheet", video: "Assets/movie1.mp4" },
    { img: "Assets/series list/Screenshot 2026-05-16 173403.png", title: "ATM", video: "Assets/movie1.mp4" },
    { img: "Assets/series list/Screenshot 2026-05-16 173512.png", title: "heartiley Battery", video: "Assets/movie1.mp4" },
    { img: "Assets/series list/Screenshot 2026-05-16 173531.png", title: "Veduvan", video: "Assets/movie1.mp4" },
    { img: "Assets/series list/Screenshot 2026-05-16 173555.png", title: "Kakee Circus", video: "Assets/movie1.mp4" },

];

// Serials
const serials = [
    { img: "Assets/serial/Screenshot 2026-05-16 174004.png", title: "Sirakadikai Assai", video: "Assets/movie1.mp4" },
    { img: "Assets/serial/Screenshot 2026-05-16 174056.png", title: "ayyanar thunai", video: "Assets/movie1.mp4" },
    { img: "Assets/serial/Screenshot 2026-05-16 173825.png", title: "Karthikai deepham", video: "Assets/movie1.mp4" },
    { img: "Assets/serial/Screenshot 2026-05-16 173836.png", title: "paari jatham", video: "Assets/movie1.mp4" },
    { img: "Assets/serial/Screenshot 2026-05-16 173854.png", title: "Salangai ooli", video: "Assets/movie1.mp4" },
    { img: "Assets/serial/Screenshot 2026-05-16 173913.png", title: "Vaarisu", video: "Assets/movie1.mp4" },
];

// ================= RENDER =================

renderCards(movies, "trendingGrid");
renderCards(series, "seriesGrid");
renderCards(serials, "serialGrid");


// Search logic

// ================= DROPDOWN SEARCH =================

// ================= SEARCH (SEPARATE SECTION) =================

const searchInput = document.getElementById("searchInput");
const searchGrid = document.getElementById("searchGrid");
const searchSection = document.getElementById("searchSection");

const allData = [...movies, ...series, ...serials];

searchInput.addEventListener("input", function () {

    const value = searchInput.value.toLowerCase().trim();

    searchGrid.innerHTML = "";

    if (value === "") {
        searchSection.style.display = "none";
        return;
    }

    const results = allData.filter(item =>
        item.title.toLowerCase().includes(value)
    );

    if (results.length === 0) {
        searchGrid.innerHTML = "<p>No results found</p>";
    } else {
        renderCards(results, "searchGrid");
    }

    // ONLY SHOW SEARCH (don’t hide others)
    searchSection.style.display = "block";
});


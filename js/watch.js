//ALWAYS FIRST
const data = JSON.parse(localStorage.getItem("selectedMovie"));

console.log(data); // test


if (!data) {
    alert("No movie selected!");
}

// SET DATA
document.getElementById("title").innerText = data.title;
document.getElementById("poster").src = data.img;

const player = document.getElementById("player");

// watch
document.getElementById("watchBtn").addEventListener("click", () => {

    if (!data || !data.video) {
        alert("Video not available!");
        return;
    }

    const player = document.getElementById("player");
    const backBtn = document.getElementById("backBtn");

    player.src = data.video;
    player.style.display = "block";

    backBtn.style.display = "inline-block"; // show back button

    player.load();

    player.play().catch(err => {
        console.log("Play error:", err);
    });
});
// video back to home
document.getElementById("backBtn").addEventListener("click", () => {
    window.location.href = "index.html";
});

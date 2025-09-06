
const toggleBtn = document.getElementById("theme-toggle");
const body = document.body;

// Prüfen ob ein Modus schon gespeichert ist
if (localStorage.getItem("theme") === "dark") {
    body.classList.add("dark-mode");
    toggleBtn.textContent = "☀️";
}

toggleBtn.addEventListener("click", () => {
    body.classList.toggle("dark-mode");
    
    if (body.classList.contains("dark-mode")) {
        toggleBtn.textContent = "☀️";
        localStorage.setItem("theme", "dark");
    } else {
        toggleBtn.textContent = "🌙";
        localStorage.setItem("theme", "light");
    }
});

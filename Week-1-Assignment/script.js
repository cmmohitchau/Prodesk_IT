
const toggle = document.querySelector(".nav-toggle");
const links = document.querySelector(".links");

toggle.addEventListener("click" , () => {
    links.classList.toggle("active");
})



function darkMode() {
    const element = document.body;
    element.classList.toggle("dark");

    const btn = document.getElementById('theme-btn');
    btn.textContent = document.body.classList.contains("dark") ? '☀️' : '🌙';
}

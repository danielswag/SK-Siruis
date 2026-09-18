const burgerButton = document.querySelector("#burgerButton");
const sidebar = document.querySelector("#sidebar");
const sidebarClose = document.querySelector("#sidebarClose");
const sidebarOverlay = document.querySelector("#sidebarOverlay");

burgerButton.addEventListener("click", () => {
    sidebar.classList.add("active");
});

sidebarClose.addEventListener("click", () => {
    sidebar.classList.remove("active");
});

sidebarOverlay.addEventListener("click", () => {
    sidebar.classList.remove("active");
});
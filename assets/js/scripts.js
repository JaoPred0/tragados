document.addEventListener("DOMContentLoaded", function () {
    const lightModeBtn = document.getElementById("lightMode");
    const darkModeBtn = document.getElementById("darkMode");
    const systemModeBtn = document.getElementById("systemMode");
    const modalEl = document.getElementById("loadingModal");

    if (!lightModeBtn || !darkModeBtn || !systemModeBtn || !modalEl) {
        console.error("Erro: Elementos não encontrados!");
        return;
    }

    const theme = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-bs-theme", theme);

    function changeTheme(newTheme) {
        const modal = new bootstrap.Modal(modalEl);
        modal.show();
        setTimeout(() => {
            document.documentElement.setAttribute("data-bs-theme", newTheme);
            localStorage.setItem("theme", newTheme);
            modal.hide();
        }, 1500);
    }

    lightModeBtn.addEventListener("click", () => changeTheme("light"));
    darkModeBtn.addEventListener("click", () => changeTheme("dark"));
    systemModeBtn.addEventListener("click", () => {
        const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
        changeTheme(systemTheme);
    });
});
    
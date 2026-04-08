const ADMIN_USER = "admin";
const ADMIN_PASS = "0852";
const ADMIN_SESSION_KEY = "bitbytes_admin_authed";

function requireAdminAuth() {
  const isAuthed = localStorage.getItem(ADMIN_SESSION_KEY) === "true";
  if (!isAuthed) {
    window.location.href = "admin.html";
  }
}

function logoutAdmin() {
  localStorage.removeItem(ADMIN_SESSION_KEY);
  window.location.href = "admin.html";
}

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("adminLoginForm");
  const status = document.getElementById("loginStatus");
  const logoutBtn = document.getElementById("logoutBtn");

  if (window.location.pathname.endsWith("sheets.html")) {
    requireAdminAuth();
  }

  if (loginForm) {
    if (localStorage.getItem(ADMIN_SESSION_KEY) === "true") {
      window.location.href = "sheets.html";
      return;
    }

    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const user = document.getElementById("username")?.value.trim();
      const pass = document.getElementById("password")?.value;

      if (user === ADMIN_USER && pass === ADMIN_PASS) {
        localStorage.setItem(ADMIN_SESSION_KEY, "true");
        if (status) status.textContent = "Access granted. Redirecting...";
        window.location.href = "sheets.html";
      } else {
        if (status) status.textContent = "Incorrect username or password.";
      }
    });
  }

  if (logoutBtn) {
    logoutBtn.addEventListener("click", logoutAdmin);
  }
});
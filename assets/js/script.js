const themeToggles = document.querySelectorAll('.theme-toggle');
const savedTheme = localStorage.getItem('bitbytes-theme');

if (savedTheme === 'dark') {
  document.body.classList.add('dark');
}

themeToggles.forEach((toggle) => {
  const setLabel = () => {
    toggle.textContent = document.body.classList.contains('dark') ? 'Light Mode' : 'Dark Mode';
    toggle.setAttribute('aria-pressed', document.body.classList.contains('dark') ? 'true' : 'false');
  };

  setLabel();

  toggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    const nextTheme = document.body.classList.contains('dark') ? 'dark' : 'light';
    localStorage.setItem('bitbytes-theme', nextTheme);

    themeToggles.forEach((btn) => {
      btn.textContent = nextTheme === 'dark' ? 'Light Mode' : 'Dark Mode';
      btn.setAttribute('aria-pressed', nextTheme === 'dark' ? 'true' : 'false');
    });
  });
});

const form = document.querySelector('.contact-form');

if (form && !form.dataset.inlineHandled) {
  form.addEventListener('submit', () => {
    const button = form.querySelector('button');
    const status = form.querySelector('.form-status');

    if (button) {
      button.innerText = 'Sending...';
      button.disabled = true;
    }

    if (status) {
      status.textContent = 'Sending your message...';
    }
  });
}

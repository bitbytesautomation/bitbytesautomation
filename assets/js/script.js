const form = document.querySelector('.contact-form');

if (form) {
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

    // Let Make webhook handle submission
  });
}

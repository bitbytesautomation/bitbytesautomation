const form = document.querySelector('.contact-form');

if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const button = form.querySelector('button');
    const status = form.querySelector('.form-status');

    if (button) {
      button.innerText = 'Sending...';
      button.disabled = true;
    }

    if (status) {
      status.textContent = 'Preparing your message...';
    }

    setTimeout(() => {
      if (button) {
        button.innerText = 'Message Sent ✓';
      }

      if (status) {
        status.textContent = 'Thanks — your message was received. This will later connect to your live automation.';
      }

      form.reset();

      setTimeout(() => {
        if (button) {
          button.innerText = 'Send Message';
          button.disabled = false;
        }

        if (status) {
          status.textContent = '';
        }
      }, 2500);
    }, 1200);
  });
}

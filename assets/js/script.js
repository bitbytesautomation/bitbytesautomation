const contactFormShared = document.querySelector('.contact-form');

if (contactFormShared && !contactFormShared.dataset.inlineHandled) {
  contactFormShared.addEventListener('submit', () => {
    const button = contactFormShared.querySelector('button');
    const status = contactFormShared.querySelector('.form-status');

    if (button) {
      button.innerText = 'Sending...';
      button.disabled = true;
    }

    if (status) {
      status.textContent = 'Sending your message...';
    }
  });
}

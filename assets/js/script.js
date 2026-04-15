(function () {
  const config = window.BITBYTES_CONFIG || { webhooks: {}, stripe: {} };

  function setStripeLinks() {
    document.querySelectorAll("[data-stripe-key]").forEach((link) => {
      const key = link.getAttribute("data-stripe-key");
      const href = config.stripe?.[key];
      if (href) {
        link.setAttribute("href", href);
      }
      if (!href || href.startsWith("#ADD_")) {
        link.setAttribute("href", "contact.html");
        link.setAttribute("data-missing-link", "true");
      }
    });
  }

  function updateMissingLinkLabels() {
    document.querySelectorAll('[data-missing-link="true"]').forEach((link) => {
      const original = link.textContent.trim();
      if (!original.includes("(add Stripe link)")) {
        link.textContent = `${original} (add Stripe link)`;
      }
    });
  }

  function handleWebhookForms() {
    document.querySelectorAll("form[data-webhook-key]").forEach((form) => {
      form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const webhookKey = form.getAttribute("data-webhook-key");
        const webhookUrl = config.webhooks?.[webhookKey];
        const redirectTarget = form.getAttribute("data-redirect") || "thank-you.html";
        const submitButton = form.querySelector('button[type="submit"]');
        const status = form.querySelector(".form-status");
        const originalLabel = submitButton ? submitButton.textContent : "";

        if (!webhookUrl) {
          if (status) {
            status.textContent = "Webhook URL missing. Add it in assets/js/site-config.js.";
            status.classList.add("error");
          }
          return;
        }

        if (submitButton) {
          submitButton.disabled = true;
          submitButton.textContent = "Sending...";
        }
        if (status) {
          status.textContent = "Sending...";
          status.classList.remove("error", "success");
        }

        const formData = new FormData(form);

        try {
          const response = await fetch(webhookUrl, {
            method: "POST",
            body: formData
          });

          if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`);
          }

          if (status) {
            status.textContent = "Sent successfully.";
            status.classList.add("success");
          }

          window.location.href = redirectTarget;
        } catch (error) {
          console.error(error);
          if (status) {
            status.textContent = "Something went wrong. Please try again.";
            status.classList.add("error");
          }
          if (submitButton) {
            submitButton.disabled = false;
            submitButton.textContent = originalLabel || "Submit";
          }
        }
      });
    });
  }

  function autoClientId() {
    const clientIdField = document.querySelector('input[name="client_id"]');
    const businessNameField = document.querySelector('input[name="business_name"]');

    if (!clientIdField || !businessNameField) return;

    businessNameField.addEventListener("blur", () => {
      if (clientIdField.value.trim()) return;
      const slug = businessNameField.value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "")
        .slice(0, 24);

      if (slug) {
        clientIdField.value = `bb-${slug}`;
      }
    });
  }

  function init() {
    setStripeLinks();
    updateMissingLinkLabels();
    handleWebhookForms();
    autoClientId();
  }

  document.addEventListener("DOMContentLoaded", init);
})();

(function () {
  const config = window.BITBYTES_CONFIG || { webhooks: {}, stripe: {}, booking: {} };

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

        if (!webhookUrl || webhookUrl.startsWith("#ADD_")) {
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

  function buildInputField(field) {
    const wrapper = document.createElement("label");
    const requiredMark = field.required ? ' <span class="required-star">*</span>' : '';
    wrapper.innerHTML = `${field.label}${requiredMark}`;

    let input;
    if (field.type === "textarea") {
      input = document.createElement("textarea");
      input.rows = field.rows || 4;
    } else if (field.type === "select") {
      input = document.createElement("select");
      const placeholderOption = document.createElement("option");
      placeholderOption.value = "";
      placeholderOption.textContent = field.placeholder || "Select one";
      input.appendChild(placeholderOption);
      (field.options || []).forEach((optionValue) => {
        const option = document.createElement("option");
        option.value = optionValue;
        option.textContent = optionValue;
        input.appendChild(option);
      });
    } else {
      input = document.createElement("input");
      input.type = field.type || "text";
      if (field.placeholder) {
        input.placeholder = field.placeholder;
      }
    }

    input.name = field.name;
    if (field.required) input.required = true;
    wrapper.appendChild(input);

    if (field.note) {
      const note = document.createElement("span");
      note.className = "field-note";
      note.textContent = field.note;
      wrapper.appendChild(note);
    }

    return wrapper;
  }

  function renderBookingServices(client) {
    const container = document.querySelector("[data-booking-services]");
    if (!container) return;
    container.innerHTML = "";

    (client.services || []).forEach((service, index) => {
      const label = document.createElement("label");
      label.className = "service-choice";
      label.innerHTML = `
        <input type="radio" name="service_requested" value="${service}" ${index === 0 ? "checked" : ""} required />
        <span>${service}</span>
      `;
      container.appendChild(label);
    });
  }

  function renderBookingIntake(client) {
    const container = document.querySelector("[data-booking-intake]");
    if (!container) return;
    container.innerHTML = "";

    (client.intakeFields || []).forEach((field) => {
      container.appendChild(buildInputField(field));
    });
  }

  function updateBookingText(clientId, client) {
    document.querySelectorAll("[data-booking-business]").forEach((node) => {
      node.textContent = client.businessName || "this business";
    });
    document.querySelectorAll("[data-booking-category]").forEach((node) => {
      node.textContent = client.category || "Service business";
    });
    document.querySelectorAll("[data-booking-hours]").forEach((node) => {
      node.textContent = client.businessHours || "Set in the client configuration";
    });
    document.querySelectorAll("[data-booking-areas]").forEach((node) => {
      node.textContent = client.serviceAreas || "Configured per client";
    });
    document.querySelectorAll("[data-booking-reminders]").forEach((node) => {
      node.textContent = client.reminderTiming || "Based on client settings";
    });
    document.querySelectorAll("[data-booking-contact-method]").forEach((node) => {
      const method = client.contactMethod || "email";
      node.textContent = method === "both" ? "email and text" : method;
    });
    document.querySelectorAll("[data-booking-hero-title]").forEach((node) => {
      node.textContent = client.heroTitle || "Book your appointment online";
    });
    document.querySelectorAll("[data-booking-hero-copy]").forEach((node) => {
      node.textContent = client.heroCopy || "Fill out the form below and we will follow up with the next steps.";
    });
    document.querySelectorAll("[data-booking-confirmation-copy]").forEach((node) => {
      node.textContent = client.confirmationCopy || "After booking, the customer and business can both be notified automatically.";
    });
    document.querySelectorAll("[data-booking-accent]").forEach((node) => {
      node.textContent = client.accentLabel || "Universal booking flow";
    });

    const clientIdField = document.querySelector('input[name="client_id"]');
    if (clientIdField) clientIdField.value = clientId;

    const pageClientNode = document.querySelector("[data-booking-client-id]");
    if (pageClientNode) pageClientNode.textContent = clientId;
  }

  function initBookingPage() {
    const form = document.getElementById("bookingForm");
    if (!form) return;

    const params = new URLSearchParams(window.location.search);
    const requestedClientId = params.get("client") || config.booking?.defaultClientId;
    const clients = config.booking?.clients || {};
    const client = clients[requestedClientId] || clients[config.booking?.defaultClientId] || {};
    const resolvedClientId = clients[requestedClientId] ? requestedClientId : config.booking?.defaultClientId || requestedClientId;

    updateBookingText(resolvedClientId, client);
    renderBookingServices(client);
    renderBookingIntake(client);

    const emailLabel = document.querySelector("[data-customer-email-label]");
    const emailInput = document.querySelector('input[name="customer_email"]');
    const phoneLabel = document.querySelector("[data-customer-phone-label]");
    const phoneInput = document.querySelector('input[name="customer_phone"]');

    if (client.requireCustomerEmail === false && emailLabel && emailInput) {
      emailInput.required = false;
      emailLabel.innerHTML = 'Customer email';
    }

    if (client.requireCustomerPhone !== true && phoneLabel && phoneInput) {
      phoneInput.required = false;
      phoneLabel.innerHTML = 'Customer phone';
    }

    const embedCode = document.querySelector("[data-embed-code]");
    if (embedCode) {
      embedCode.textContent = `<iframe
  src="https://yourdomain.com/booking.html?client=${resolvedClientId}"
  width="100%"
  height="920"
  style="border:0;border-radius:24px;overflow:hidden"
  loading="lazy">
</iframe>`;
    }
  }

  function init() {
    setStripeLinks();
    updateMissingLinkLabels();
    handleWebhookForms();
    autoClientId();
    initBookingPage();
  }

  document.addEventListener("DOMContentLoaded", init);
})();

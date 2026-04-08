const BITBYTES_SHEETS = [
  {
    name: "BitBytes - Client Tracker",
    description: "Main client tracking workspace.",
    url: "https://docs.google.com/spreadsheets/d/18C7ZOhlaqHFmLLed6jnvXl7lOqdr6qeM5pum8in9d2o/edit?usp=sharing"
  },
  {
    name: "BitBytes - Contact Leads",
    description: "Lead capture and outreach tracking.",
    url: "https://docs.google.com/spreadsheets/d/1MnWNGXcPNaB_crD4xdJEu5IibTbUCCKwGRHPp8tlwnI/edit?usp=sharing"
  },
  {
    name: "BitBytes - Fulfillment Tracker",
    description: "Client fulfillment progress and delivery tracking.",
    url: "https://docs.google.com/spreadsheets/d/1KpTj5P8vkvRj9CotIFZOdWnZZLyFv8y2JVmf7kJSeMo/edit?usp=sharing"
  },
  {
    name: "BitBytes - Onboarding Responses",
    description: "Submitted onboarding details and intake information.",
    url: "https://docs.google.com/spreadsheets/d/11ZxrREItYacX4CYERsI8kwVopowzFjYjmjO9RKxsqQU/edit?usp=sharing"
  },
  {
    name: "BitBytes - Payments Tracker",
    description: "Payment and billing tracking workspace.",
    url: "https://docs.google.com/spreadsheets/d/1NQ2g3R26i6N09IIggzQxOXjmR9575kJM9Vq9WgpmEMs/edit?usp=sharing"
  },
  {
    name: "BitBytes - Team / Rep Tracker",
    description: "Internal rep assignments and team tracking.",
    url: "https://docs.google.com/spreadsheets/d/18HV-nX1v2uNuZ8TVtiY3Na5q1PwikzyavE9_R2qmJ40/edit?usp=sharing"
  }
];

document.addEventListener("DOMContentLoaded", () => {
  const sheetNav = document.getElementById("sheetNav");
  const sheetCards = document.getElementById("sheetCards");
  const searchInput = document.getElementById("sheetSearch");
  const titleEl = document.getElementById("sheetTitle");
  const descEl = document.getElementById("sheetDescription");
  const openBtn = document.getElementById("openSheetBtn");
  const countEl = document.getElementById("sheetCount");

  if (!sheetNav || !sheetCards || !titleEl || !descEl || !openBtn) return;

  if (countEl) countEl.textContent = String(BITBYTES_SHEETS.length);

  let activeIndex = 0;

  function setActive(index) {
    activeIndex = index;
    const sheet = BITBYTES_SHEETS[index];
    titleEl.textContent = sheet.name;
    descEl.textContent = sheet.description;
    openBtn.href = sheet.url;

    document.querySelectorAll(".sheet-nav-btn").forEach((btn, i) => {
      btn.classList.toggle("active", i === index);
    });
  }

  function render(filter = "") {
    const query = filter.trim().toLowerCase();
    const filtered = BITBYTES_SHEETS
      .map((sheet, originalIndex) => ({ ...sheet, originalIndex }))
      .filter(sheet => sheet.name.toLowerCase().includes(query));

    sheetNav.innerHTML = "";
    sheetCards.innerHTML = "";

    filtered.forEach((sheet, visibleIndex) => {
      const navBtn = document.createElement("button");
      navBtn.type = "button";
      navBtn.className = "sheet-nav-btn";
      navBtn.textContent = sheet.name;
      navBtn.addEventListener("click", () => setActive(sheet.originalIndex));
      sheetNav.appendChild(navBtn);

      const card = document.createElement("article");
      card.className = "launcher-card";
      card.innerHTML = `
        <div class="launcher-meta">Google Sheet</div>
        <h3>${sheet.name}</h3>
        <p>${sheet.description}</p>
        <a class="btn btn-secondary" href="${sheet.url}" target="_blank" rel="noopener noreferrer">Open Sheet</a>
      `;
      sheetCards.appendChild(card);
    });

    if (!filtered.length) {
      sheetNav.innerHTML = '<div class="sidebar-card"><p class="stage-copy">No sheets match that search.</p></div>';
      sheetCards.innerHTML = "";
      titleEl.textContent = "No matching sheet";
      descEl.textContent = "Try a different search term.";
      openBtn.removeAttribute("href");
      return;
    }

    if (!filtered.some(item => item.originalIndex === activeIndex)) {
      activeIndex = filtered[0].originalIndex;
    }
    setActive(activeIndex);
  }

  searchInput?.addEventListener("input", (e) => {
    render(e.target.value);
  });

  render();
});
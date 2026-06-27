/* STROKES — Main Script */

document.addEventListener("DOMContentLoaded", () => {
  const ig  = CONFIG.shubhangi_there;
  const wa  = CONFIG.7209743044;
  const msg = encodeURIComponent(CONFIG.whatsappMessage);

  const igUrl = `https://instagram.com/${ig}`;
  const waUrl = `https://wa.me/${wa}`;

  // Wire up all Instagram links
  document.querySelectorAll("#hero-instagram, #about-instagram, #contact-instagram, #footer-instagram")
    .forEach(el => { el.href = igUrl; });

  // Wire up all WhatsApp links
  document.querySelectorAll("#contact-whatsapp, #footer-whatsapp")
    .forEach(el => { el.href = waUrl; });

  // Footer year
  document.getElementById("footer-year").textContent = new Date().getFullYear();

  // ── Render painting grid ──────────────────────────────────
  const grid = document.getElementById("painting-grid");

  PAINTINGS.forEach(p => {
    const card = document.createElement("div");
    card.className = "card" + (p.sold ? " sold" : "");
    card.setAttribute("role", "button");
    card.setAttribute("tabindex", "0");
    card.setAttribute("aria-label", p.title);

    const imgContent = p.image
      ? `<img src="${p.image}" alt="${p.title}" loading="lazy" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'" /><div class="card-placeholder" style="display:none">${placeholderIcon()}${p.title}</div>`
      : `<div class="card-placeholder">${placeholderIcon()}Add image in paintings.js</div>`;

    card.innerHTML = `
      <div class="card-img-wrap">
        ${imgContent}
        ${p.sold ? '<span class="sold-badge">Sold</span>' : ''}
      </div>
      <div class="card-body">
        <p class="card-title">${p.title}</p>
        <p class="card-meta">${p.size} &nbsp;·&nbsp; ${p.medium}</p>
        <div class="card-footer">
          <span class="card-price">${p.price}</span>
          <span class="card-action">${p.sold ? 'Unavailable' : 'View &rsaquo;'}</span>
        </div>
      </div>`;

    if (!p.sold) {
      const open = () => openLightbox(p, waUrl);
      card.addEventListener("click", open);
      card.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") open(); });
    }

    grid.appendChild(card);
  });

  // ── Lightbox ──────────────────────────────────────────────
  const lb         = document.getElementById("lightbox");
  const lbBackdrop = document.getElementById("lightbox-backdrop");
  const lbClose    = document.getElementById("lightbox-close");
  const lbImg      = document.getElementById("lightbox-img");
  const lbTitle    = document.getElementById("lightbox-title");
  const lbMeta     = document.getElementById("lightbox-meta");
  const lbPrice    = document.getElementById("lightbox-price");
  const lbOrder    = document.getElementById("lightbox-order");

  function openLightbox(p, waUrl) {
    lbImg.src   = p.image || "";
    lbImg.alt   = p.title;
    lbTitle.textContent = p.title;
    lbMeta.textContent  = `${p.size}  ·  ${p.medium}`;
    lbPrice.textContent = p.price;
    lbOrder.href = `https://wa.me/${wa}?text=${encodeURIComponent(
      `Hi! I'm interested in "${p.title}" (${p.size}) — ${p.price}.`
    )}`;
    lb.classList.add("open");
    lbBackdrop.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    lb.classList.remove("open");
    lbBackdrop.classList.remove("open");
    document.body.style.overflow = "";
  }

  lbClose.addEventListener("click", closeLightbox);
  lbBackdrop.addEventListener("click", closeLightbox);
  document.addEventListener("keydown", e => { if (e.key === "Escape") closeLightbox(); });

  // ── Mobile nav ────────────────────────────────────────────
  const burger = document.querySelector(".nav-burger");
  const navLinks = document.querySelector(".nav-links");
  burger.addEventListener("click", () => {
    const open = navLinks.style.display === "flex";
    navLinks.style.display = open ? "" : "flex";
    navLinks.style.flexDirection = "column";
    navLinks.style.position = "absolute";
    navLinks.style.top = "60px";
    navLinks.style.right = "1.25rem";
    navLinks.style.background = "var(--bg-card)";
    navLinks.style.border = "1px solid var(--border)";
    navLinks.style.padding = "1rem 1.5rem";
    navLinks.style.borderRadius = "var(--radius)";
    navLinks.style.gap = "1rem";
    if (open) navLinks.removeAttribute("style");
  });
});

function placeholderIcon() {
  return `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>`;
}

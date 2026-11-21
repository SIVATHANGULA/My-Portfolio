/* ===========================
   SCRIPT.JS - Siva Thangula Portfolio
=========================== */

// ─── Name Typing Effect ───────────────────────────────────────────────────────
const heroNameEl = document.getElementById("heroName");
const fullName   = "Siva Thangula";
const accentFrom = 5; // characters 0-3 = "Siva" plain, 4 = space, 5+ = "Thangula" accent
let nameCharIndex = 0;

function typeName() {
  if (nameCharIndex <= fullName.length) {
    const plain  = fullName.substring(0, Math.min(nameCharIndex, 4));           // "Siva"
    const space  = nameCharIndex > 4 ? " " : "";
    const accent = nameCharIndex > 5 ? fullName.substring(5, nameCharIndex) : ""; // "Thangula"

    heroNameEl.innerHTML =
      `${plain}${space}<span class="accent">${accent}</span>` +
      `<span class="name-cursor">|</span>`;

    nameCharIndex++;
    setTimeout(typeName, 120);
  } else {
    // Remove cursor after name finishes typing, then start roles
    heroNameEl.innerHTML =
      `Siva <span class="accent">Thangula</span>`;
    setTimeout(typeRoles, 400);
  }
}

// ─── Roles Typing Effect ─────────────────────────────────────────────────────
const roles = [
  "Full Stack Developer",
  "UI/UX Enthusiast",
  "Problem Solver",
  "Open Source Contributor",
  "React Developer"
];
let roleIndex = 0, charIndex = 0, isDeleting = false;
const typedEl = document.getElementById("typedText");

function typeRoles() {
  const current = roles[roleIndex];
  if (isDeleting) {
    typedEl.textContent = current.substring(0, charIndex--);
    if (charIndex < 0) { isDeleting = false; roleIndex = (roleIndex + 1) % roles.length; }
    setTimeout(typeRoles, 60);
  } else {
    typedEl.textContent = current.substring(0, charIndex++);
    if (charIndex > current.length) { isDeleting = true; setTimeout(typeRoles, 1500); return; }
    setTimeout(typeRoles, 90);
  }
}

// Start name typing on load
typeName();

// ─── Navbar: Scroll & Hamburger ────────────────────────────────────────────
const navbar   = document.getElementById("navbar");
const hamburger = document.getElementById("hamburger");
const navLinks  = document.getElementById("navLinks");
const allLinks  = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 50);
  document.getElementById("backToTop").classList.toggle("show", window.scrollY > 400);
  updateActiveLink();
});

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("open");
  hamburger.classList.toggle("open");
});
navLinks.querySelectorAll("a").forEach(a => {
  a.addEventListener("click", () => { navLinks.classList.remove("open"); hamburger.classList.remove("open"); });
});

function updateActiveLink() {
  const sections = document.querySelectorAll("section[id]");
  let current = "";
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) current = s.id;
  });
  allLinks.forEach(a => {
    a.classList.toggle("active", a.getAttribute("href") === `#${current}`);
  });
}

// ─── Scroll Reveal ───────────────────────────────────────────────────────────
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add("visible"), i * 80);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll(
  ".skill-category, .project-card, .timeline-item, .about-stats, .contact-card, .tech-icon, .stat-card"
).forEach(el => {
  el.classList.add("reveal");
  revealObserver.observe(el);
});

// ─── Skill Bar Animation ─────────────────────────────────────────────────────
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll(".skill-fill").forEach(fill => {
        fill.style.width = fill.dataset.width + "%";
      });
      barObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll(".skill-category").forEach(cat => barObserver.observe(cat));

// ─── Counter Animation ────────────────────────────────────────────────────────
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll(".stat-number").forEach(el => {
        const target = +el.dataset.target;
        let count = 0;
        const step = Math.ceil(target / 50);
        const timer = setInterval(() => {
          count = Math.min(count + step, target);
          el.textContent = count;
          if (count >= target) clearInterval(timer);
        }, 30);
      });
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll(".about-stats").forEach(el => counterObserver.observe(el));

// ─── Project Filter ───────────────────────────────────────────────────────────
const filterBtns = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    filterBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    const filter = btn.dataset.filter;
    projectCards.forEach(card => {
      const match = filter === "all" || card.dataset.category === filter;
      card.style.opacity = match ? "1" : "0.2";
      card.style.transform = match ? "scale(1)" : "scale(0.95)";
      card.style.pointerEvents = match ? "auto" : "none";
      card.style.transition = "opacity 0.3s, transform 0.3s";
    });
  });
});

// ─── Contact Form ─────────────────────────────────────────────────────────────
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const btn = this.querySelector("button[type='submit']");
  btn.textContent = "Sending…";
  btn.disabled = true;
  setTimeout(() => {
    btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
    btn.disabled = false;
    this.reset();
    const success = document.getElementById("formSuccess");
    success.style.display = "block";
    setTimeout(() => success.style.display = "none", 5000);
  }, 1500);
});

// ─── Particle Generator ───────────────────────────────────────────────────────
function createParticles() {
  const container = document.getElementById("particles");
  for (let i = 0; i < 40; i++) {
    const p = document.createElement("div");
    p.className = "particle";
    p.style.cssText = `
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      width: ${Math.random() * 3 + 1}px;
      height: ${Math.random() * 3 + 1}px;
      animation-duration: ${Math.random() * 15 + 8}s;
      animation-delay: ${Math.random() * 8}s;
      opacity: ${Math.random() * 0.5};
    `;
    container.appendChild(p);
  }
}
createParticles();

// ─── Smooth Section Fade-In on Load ──────────────────────────────────────────
window.addEventListener("load", () => {
  document.querySelectorAll(".section").forEach((s, i) => {
    s.style.animation = `fadeIn 0.6s ease ${i * 0.05}s both`;
  });
});


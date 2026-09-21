// script da página de contato e detalhes. Separei para não ter chance de conflito caso eu bobeie.


const nav = document.querySelector(".site-nav");
const openButton = document.querySelector(".menu-toggle");
const closeButton = document.querySelector(".menu-close");
const overlay = document.querySelector(".menu-overlay");

function setMenu(open) {
  nav.classList.toggle("is-open", open);
  openButton.setAttribute("aria-expanded", String(open));
  overlay.setAttribute("aria-hidden", String(!open));
  document.body.style.overflow = open ? "hidden" : "";
}

openButton.addEventListener("click", () => setMenu(true));
closeButton.addEventListener("click", () => setMenu(false));
overlay.addEventListener("click", () => setMenu(false));

document.querySelectorAll(".menu-content a").forEach(link => {
  link.addEventListener("click", () => setMenu(false));
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape") setMenu(false);
});

const countdown = document.querySelector("#countdown");

if (countdown) {
  const target = new Date(countdown.dataset.target);

  const fields = {
    months: countdown.querySelector('[data-unit="months"]'),
    days: countdown.querySelector('[data-unit="days"]'),
    hours: countdown.querySelector('[data-unit="hours"]'),
    minutes: countdown.querySelector('[data-unit="minutes"]'),
    seconds: countdown.querySelector('[data-unit="seconds"]')
  };

  function diffCalendarMonths(from, to) {
    let months =
      (to.getFullYear() - from.getFullYear()) * 12 +
      (to.getMonth() - from.getMonth());

    const candidate = new Date(from);
    candidate.setMonth(candidate.getMonth() + months);

    if (candidate > to) {
      months--;
    }

    return Math.max(0, months);
  }

  function updateCountdown() {
    const now = new Date();

    if (now >= target) {
       
      Object.values(fields).forEach(field => field.textContent = "00");

    if (field.textContent)
      return;
    }

    const months = diffCalendarMonths(now, target);

    const afterMonths = new Date(now);
    afterMonths.setMonth(afterMonths.getMonth() + months);

    let remaining = target - afterMonths;

    const days = Math.floor(remaining / 86400000);
    remaining %= 86400000;

    const hours = Math.floor(remaining / 3600000);
    remaining %= 3600000;

    const minutes = Math.floor(remaining / 60000);
    remaining %= 60000;

    const seconds = Math.floor(remaining / 1000);

    fields.months.textContent = String(months).padStart(2, "0");
    fields.days.textContent = String(days).padStart(2, "0");
    fields.hours.textContent = String(hours).padStart(2, "0");
    fields.minutes.textContent = String(minutes).padStart(2, "0");
    fields.seconds.textContent = String(seconds).padStart(2, "0");
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
}








const videos = document.querySelectorAll("video");

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    const video = entry.target;

    if (entry.isIntersecting) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  });
}, {
  threshold: 0.05
});

videos.forEach(video => observer.observe(video));


document.querySelectorAll(".carousel").forEach(carousel => {
  const track = carousel.querySelector(".carousel-track");
  const slides = carousel.querySelectorAll(".carousel-slide");
  const prev = carousel.querySelector("[data-carousel-prev]");
  const next = carousel.querySelector("[data-carousel-next]");

  if (!track || slides.length === 0) return;

  let current = 0;

  function showSlide(index) {
    current = (index + slides.length) % slides.length;
    track.style.transform = `translateX(-${current * 100}%)`;
  }

  prev?.addEventListener("click", () => showSlide(current - 1));
  next?.addEventListener("click", () => showSlide(current + 1));
});



const contactForm = document.querySelector("#contact-form");
if (contactForm) {
  const status = document.querySelector("#form-status");
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!contactForm.checkValidity()) {
      contactForm.reportValidity();
      if (status) status.textContent = "Confira os campos obrigatórios.";
      return;
    }
    const data = new FormData(contactForm);
    const nome = String(data.get("nome") || "").trim();
    const email = String(data.get("email") || "").trim();
    const assunto = String(data.get("assunto") || "").trim();
    const mensagem = String(data.get("mensagem") || "").trim();
    const destino = "vasconcelosgustavo21312@gmail.com";
    const corpo = `Nome: ${nome}\nE-mail: ${email}\n\nMensagem:\n${mensagem}`;
    const mailto = `mailto:${destino}?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(corpo)}`;
    if (status) status.textContent = "Abrindo seu aplicativo de e-mail...";
    window.location.href = mailto;
  });
}
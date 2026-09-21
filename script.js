const nav = document.querySelector(".site-nav");
const openButton = document.querySelector(".menu-toggle");
const closeButton = document.querySelector(".menu-close");
const overlay = document.querySelector(".menu-overlay");
const panel = document.querySelector(".menu-panel");

function setMenu(open) {

  nav.classList.toggle("is-open", open);

  openButton.setAttribute(
    "aria-expanded",
    String(open)
  );

  overlay.setAttribute(
    "aria-hidden",
    String(!open)
  );

  panel.setAttribute(
    "aria-hidden",
    String(!open)
  );

  document.body.style.overflow =
    open ? "hidden" : "";
}




openButton.addEventListener("click", () => {
  setMenu(true);
});




closeButton.addEventListener("click", () => {
  setMenu(false);
});


overlay.addEventListener("click", () => {
  setMenu(false);
});


document.querySelectorAll(".menu-content a").forEach(link => {

  link.addEventListener("click", () => {
    setMenu(false);
  });

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

  const containers = {
    months: countdown.querySelector('[data-container="months"]'),
    days: countdown.querySelector('[data-container="days"]'),
    hours: countdown.querySelector('[data-container="hours"]'),
    minutes: countdown.querySelector('[data-container="minutes"]'),
    seconds: countdown.querySelector('[data-container="seconds"]')
  };

  const separators = [
    ...countdown.querySelectorAll(".countdown-separator")
  ];

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

  function updateVisibility() {
    const units = [
      "months",
      "days",
      "hours",
      "minutes",
      "seconds"
    ];

    
    units.forEach(unit => {
      if (fields[unit].textContent === "00") {
        containers[unit].classList.add("hidden");
      } else {
        containers[unit].classList.remove("hidden");
      }
    });

    
    const visibleUnits = units.filter(unit => {
      return !containers[unit].classList.contains("hidden");
    });

    
    separators.forEach(separator => {
      separator.classList.add("hidden");
    });

    for (let i = 0; i < visibleUnits.length - 1; i++) {
      const currentUnit = visibleUnits[i];

      const separator = countdown.querySelector(
        `[data-separator="${currentUnit}"]`
      );

      if (separator) {
        separator.classList.remove("hidden");
      }
    }
  }

  function updateCountdown() {
    const now = new Date();

    if (now >= target) {
      Object.values(fields).forEach(field => {
        field.textContent = "00";
      });

      updateVisibility();

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

    fields.months.textContent =
      String(months).padStart(2, "0");

    fields.days.textContent =
      String(days).padStart(2, "0");

    fields.hours.textContent =
      String(hours).padStart(2, "0");

    fields.minutes.textContent =
      String(minutes).padStart(2, "0");

    fields.seconds.textContent =
      String(seconds).padStart(2, "0");

    updateVisibility();
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
  const slides = carousel.querySelectorAll(".carousel-slide");
  const prev = carousel.querySelector("[data-carousel-prev]");
  const next = carousel.querySelector("[data-carousel-next]");

  if (slides.length === 0) return;

  const section = carousel.closest(".characters-section");

  const contents = section
    ? section.querySelectorAll("[data-character-content]")
    : [];

  const videos = section
    ? section.querySelectorAll("[data-character-video]")
    : [];

  let current = 0;

  function updateCharacterContent() {
    const character = slides[current].dataset.character;

    contents.forEach(content => {
      content.hidden = content.dataset.characterContent !== character;
    });

    videos.forEach(media => {
      const isActive = media.dataset.characterVideo === character;

      media.hidden = !isActive;

      const video = media.querySelector("video");

      if (!video) return;

      if (isActive) {
        video.currentTime = 0;
      } else {
        video.pause();
      }
    });
  }

  function showSlide(index) {
    current = (index + slides.length) % slides.length;

    slides.forEach((slide, i) => {
      slide.classList.toggle("is-active", i === current);
    });

    updateCharacterContent();
  }

  prev?.addEventListener("click", () => {
    showSlide(current - 1);
  });

  next?.addEventListener("click", () => {
    showSlide(current + 1);
  });

  showSlide(0);
});

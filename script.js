const cursor = document.getElementById("cursor");
const cursorTextLayer = document.getElementById("cursorTextLayer");
const liveMessage = document.getElementById("liveMessage");
const messageBloom = document.getElementById("messageBloom");
const bloomBackdrop = document.getElementById("bloomBackdrop");
const bloomClose = document.getElementById("bloomClose");
const bloomCard = document.getElementById("bloomCard");
const bloomTitle = document.getElementById("bloomTitle");
const bloomBody = document.getElementById("bloomBody");
const heartRain = document.getElementById("heartRain");
const heartOverlay = document.getElementById("heartOverlay");
const heartOverlayBackdrop = document.getElementById("heartOverlayBackdrop");
const heartClose = document.getElementById("heartClose");
const loveBurstLayer = document.getElementById("loveBurstLayer");
const finaleWhisper = document.getElementById("finaleWhisper");
const previewOverlay = document.getElementById("previewOverlay");
const previewBackdrop = document.getElementById("previewBackdrop");
const previewClose = document.getElementById("previewClose");
const pageTransition = document.createElement("div");
pageTransition.className = "page-transition";
document.body.appendChild(pageTransition);
const prefersCoarsePointer = window.matchMedia("(pointer: coarse)").matches;

function flashButton(button) {
  button.classList.remove("flash");
  void button.offsetWidth;
  button.classList.add("flash");
}

function spawnLoveBurst(x, y, word = "for you") {
  for (let index = 0; index < 8; index += 1) {
    const heart = document.createElement("span");
    heart.className = "burst-heart";
    heart.textContent = index % 2 === 0 ? "❤" : "♥";
    heart.style.left = `${x}px`;
    heart.style.top = `${y}px`;
    heart.style.setProperty("--dx", `${(Math.random() - 0.5) * 140}px`);
    heart.style.setProperty("--dy", `${-40 - Math.random() * 120}px`);
    heart.style.setProperty("--rot", `${-140 + Math.random() * 280}deg`);
    loveBurstLayer.appendChild(heart);
    setTimeout(() => heart.remove(), 950);
  }

  const burstWord = document.createElement("span");
  burstWord.className = "burst-word";
  burstWord.textContent = word;
  burstWord.style.left = `${x}px`;
  burstWord.style.top = `${y - 8}px`;
  loveBurstLayer.appendChild(burstWord);
  setTimeout(() => burstWord.remove(), 1250);
}

document.querySelectorAll("[data-action='open-heart']").forEach((button) => {
  button.addEventListener("click", () => {
    flashButton(button);
    const rect = button.getBoundingClientRect();
    spawnLoveBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, "open my heart");
    heartOverlay.classList.add("visible");
    document.body.style.overflow = "hidden";
  });
});

document.querySelectorAll("[data-action='open-preview']").forEach((button) => {
  button.addEventListener("click", () => {
    flashButton(button);
    const rect = button.getBoundingClientRect();
    spawnLoveBurst(
      rect.left + rect.width / 2,
      rect.top + rect.height / 2,
      "little feelings"
    );

    if (previewOverlay) {
      previewOverlay.classList.add("visible");
      document.body.style.overflow = "hidden";
    }
  });
});

document.querySelectorAll("[data-target]").forEach((button) => {
  button.addEventListener("click", () => {
    const target = document.querySelector(button.dataset.target);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

document.querySelectorAll(".page-link").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const href = link.getAttribute("href");
    if (!href) {
      return;
    }

    const rect = link.getBoundingClientRect();
    const burstText = link.dataset.burst || "for you";
    flashButton(link);
    spawnLoveBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, burstText);
    pageTransition.classList.add("visible");

    setTimeout(() => {
      window.location.href = href;
    }, 420);
  });
});

document.querySelectorAll(".chip-btn").forEach((button) => {
  button.addEventListener("click", () => {
    const { title, message, theme } = button.dataset;
    flashButton(button);
    const rect = button.getBoundingClientRect();
    spawnLoveBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, title);
    liveMessage.innerHTML = `
      <div class="live-message-title">${title}</div>
      <div>${message}</div>
    `;

    bloomCard.className = "bloom-card";
    if (theme) {
      bloomCard.classList.add(`theme-${theme}`);
    }

    bloomTitle.textContent = title;
    bloomBody.textContent = message;
    messageBloom.classList.add("visible");
    document.body.style.overflow = "hidden";

    button.animate(
      [
        { transform: "scale(1)" },
        { transform: "scale(1.1)" },
        { transform: "scale(1)" }
      ],
      {
        duration: 520,
        easing: "ease-out"
      }
    );
  });
});

document.querySelectorAll(".preview-note").forEach((button) => {
  button.addEventListener("click", () => {
    const { title, message, theme } = button.dataset;
    flashButton(button);
    const rect = button.getBoundingClientRect();
    spawnLoveBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, title);

    if (bloomCard) {
      bloomCard.className = "bloom-card";
      if (theme) {
        bloomCard.classList.add(`theme-${theme}`);
      }
    }

    if (bloomTitle) {
      bloomTitle.textContent = title;
    }
    if (bloomBody) {
      bloomBody.textContent = message;
    }
    if (messageBloom) {
      messageBloom.classList.add("visible");
      document.body.style.overflow = "hidden";
    }
  });
});

document.querySelectorAll("[data-action='finale-love']").forEach((button) => {
  button.addEventListener("click", () => {
    flashButton(button);
    const rect = button.getBoundingClientRect();
    spawnLoveBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, "miss you my boondi");
    finaleWhisper.textContent =
      "miss you my boondi, and I hope one day I can bring your smile back gently.";

    document.querySelectorAll(".laddoo").forEach((laddoo, index) => {
      laddoo.animate(
        [
          { transform: "translateY(0) scale(1)" },
          { transform: "translateY(-20px) scale(1.08)" },
          { transform: "translateY(0) scale(1)" }
        ],
        {
          duration: 650 + index * 70,
          easing: "ease-out"
        }
      );
    });
  });
});

function closeBloom() {
  if (!messageBloom) {
    return;
  }

  messageBloom.classList.remove("visible");
  if (!heartOverlay || !heartOverlay.classList.contains("visible")) {
    if (!previewOverlay || !previewOverlay.classList.contains("visible")) {
      document.body.style.overflow = "";
    }
  }
}

if (bloomClose) {
  bloomClose.addEventListener("click", closeBloom);
}
if (bloomBackdrop) {
  bloomBackdrop.addEventListener("click", closeBloom);
}

function closeHeart() {
  if (!heartOverlay) {
    return;
  }

  heartOverlay.classList.remove("visible");
  if (!messageBloom || !messageBloom.classList.contains("visible")) {
    if (!previewOverlay || !previewOverlay.classList.contains("visible")) {
      document.body.style.overflow = "";
    }
  }
}

function closePreview() {
  if (!previewOverlay) {
    return;
  }

  previewOverlay.classList.remove("visible");
  if (
    (!messageBloom || !messageBloom.classList.contains("visible")) &&
    (!heartOverlay || !heartOverlay.classList.contains("visible"))
  ) {
    document.body.style.overflow = "";
  }
}

if (heartClose) {
  heartClose.addEventListener("click", closeHeart);
}
if (heartOverlayBackdrop) {
  heartOverlayBackdrop.addEventListener("click", closeHeart);
}
if (previewClose) {
  previewClose.addEventListener("click", closePreview);
}
if (previewBackdrop) {
  previewBackdrop.addEventListener("click", closePreview);
}

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeBloom();
    closeHeart();
    closePreview();
  }
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  {
    threshold: 0.18
  }
);

document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));

let lastTrailTime = 0;

function spawnRainHeart() {
  const heart = document.createElement("span");
  heart.className = "rain-heart";
  const charms = ["❤", "♥", "🍣", "🍙", "🍱"];
  heart.textContent = charms[Math.floor(Math.random() * charms.length)];
  heart.style.left = `${Math.random() * 100}%`;
  heart.style.animationDuration = `${6 + Math.random() * 5}s`;
  heart.style.opacity = `${0.4 + Math.random() * 0.5}`;
  heart.style.fontSize = `${0.8 + Math.random() * 1.1}rem`;
  heartRain.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 11000);
}

for (let index = 0; index < 18; index += 1) {
  setTimeout(spawnRainHeart, index * 300);
}

setInterval(spawnRainHeart, 360);

function spawnTrail(x, y) {
  if (prefersCoarsePointer) {
    const word = document.createElement("span");
    word.className = "cursor-word";
    word.textContent = "sorry ankii";
    word.style.left = `${x}px`;
    word.style.top = `${y}px`;
    cursorTextLayer.appendChild(word);

    setTimeout(() => {
      word.remove();
    }, 1300);
    return;
  }

  const word = document.createElement("span");
  word.className = "cursor-word";
  word.textContent = "sorry ankii";
  word.style.left = `${x}px`;
  word.style.top = `${y}px`;
  cursorTextLayer.appendChild(word);

  setTimeout(() => {
    word.remove();
  }, 1400);
}

window.addEventListener("mousemove", (event) => {
  if (prefersCoarsePointer) {
    return;
  }

  const { clientX, clientY } = event;
  cursor.style.left = `${clientX}px`;
  cursor.style.top = `${clientY}px`;

  const now = performance.now();
  if (now - lastTrailTime > 45) {
    spawnTrail(clientX + 18, clientY - 10);
    lastTrailTime = now;
  }
});

window.addEventListener("touchstart", (event) => {
  const touch = event.touches[0];
  if (!touch) {
    return;
  }

  if (liveMessage) {
    liveMessage.textContent = "Every touch still carries one soft sorry ankii.";
  }
  spawnTrail(touch.clientX, touch.clientY);
});

window.addEventListener(
  "touchmove",
  (event) => {
    const touch = event.touches[0];
    if (!touch) {
      return;
    }

    const now = performance.now();
    if (now - lastTrailTime > 80) {
      spawnTrail(touch.clientX + 12, touch.clientY - 8);
      lastTrailTime = now;
    }
  },
  { passive: true }
);

/*
  PERSONALISE THIS BLOCK ONLY.
  Everything here is safe to change. Do not put private details here if your
  GitHub repository will be public.
*/
const birthdayConfig = {
  partnerName: "kuchupuchuku💕",
  yourName: "your pakna",
  secretCode: "2308", // Change this before publishing.
  musicFile: "assets/music/birthday-song.mp3",
  finalMessage:
    "May this year bring you soft days, loud laughter, brave dreams, and every beautiful thing you deserve.",
  loveNotes: [
    "You make ordinary days feel like little celebrations.",
    "You are the kindest part of so many of my thoughts.",
    "My favourite place is any moment that has you in it."
  ],
  heartMemories: [
    "Your smile is one of my safest places.",
    "I love the tiny, silly moments we get to share.",
    "You deserve to feel loved loudly, softly, and every day."
  ],
  photos: [
    "assets/photos/photo-1.jpg",
    "assets/photos/photo-2.jpg",
    "assets/photos/photo-3.jpg",
    "assets/photos/photo-4.jpg",
    "assets/photos/photo-5.jpg",
    "assets/photos/photo-6.jpg"
  ]
};

const screens = [...document.querySelectorAll(".screen")];
const progressText = document.querySelector("#progressText");
const progressFill = document.querySelector("#progressFill");
const music = document.querySelector("#birthdayMusic");
const musicSource = document.querySelector("#musicSource");
const soundButton = document.querySelector("#soundButton");
const passcodeInput = document.querySelector("#passcodeInput");
const passcodeMessage = document.querySelector("#passcodeMessage");
const birthdayCake = document.querySelector("#birthdayCake");
let hasStartedMusic = false;

const progressLabels = [
  "A tiny mystery",
  "Secret door",
  "A big question",
  "Love note",
  "Heart hunt",
  "Make a wish",
  "Birthday magic"
];

function setText(selector, value) {
  document.querySelectorAll(selector).forEach((element) => {
    element.textContent = value;
  });
}

function buildCharacterStage(stage) {
  const pose = stage.dataset.character || "wave";
  const pair = document.createElement("div");
  pair.className = `buddy-pair pose-${pose}`;

  ["peach", "cream"].forEach((colour, index) => {
    const cat = document.createElement("div");
    cat.className = `buddy buddy-${colour} buddy-${index + 1}`;
    cat.innerHTML = `
      <span class="cat-ear ear-left"></span><span class="cat-ear ear-right"></span>
      <span class="cat-tail"></span><span class="cat-face">
        <i class="cat-eye eye-left"></i><i class="cat-eye eye-right"></i>
        <i class="cat-blush blush-left"></i><i class="cat-blush blush-right"></i>
        <i class="cat-mouth"></i>
      </span><span class="cat-belly"></span>`;
    pair.append(cat);
  });

  const heart = document.createElement("span");
  heart.className = "pair-heart";
  heart.textContent = pose === "sad" ? "💔" : pose === "think" ? "💡" : "♥";
  pair.append(heart);
  stage.append(pair);
}

function makeFallingEffects() {
  const symbols = ["🌸", "💖", "✨", "🎀", "💕", "🌼"];
  const layer = document.querySelector("#fallingLayer");

  for (let index = 0; index < 24; index += 1) {
    const item = document.createElement("span");
    item.className = "falling-item";
    item.textContent = symbols[index % symbols.length];
    item.style.setProperty("--left", `${Math.random() * 100}%`);
    item.style.setProperty("--size", `${14 + Math.random() * 14}px`);
    item.style.setProperty("--duration", `${7 + Math.random() * 8}s`);
    item.style.setProperty("--delay", `${-Math.random() * 12}s`);
    layer.append(item);
  }
}

function createBurst(amount = 34) {
  const symbols = ["♥", "✦", "🌸", "✨", "🎀"];
  const layer = document.querySelector("#burstLayer");

  for (let index = 0; index < amount; index += 1) {
    const item = document.createElement("span");
    item.className = "burst-item";
    item.textContent = symbols[index % symbols.length];
    item.style.left = `${35 + Math.random() * 30}%`;
    item.style.top = `${30 + Math.random() * 35}%`;
    item.style.setProperty("--x", `${Math.random() * 100 - 50}vw`);
    item.style.setProperty("--y", `${Math.random() * 75 - 45}vh`);
    item.style.setProperty("--rotate", `${Math.random() * 720 - 360}deg`);
    item.style.animationDelay = `${Math.random() * 180}ms`;
    layer.append(item);
    window.setTimeout(() => item.remove(), 1800);
  }
}

function updateProgress(screen) {
  const step = Number(screen.dataset.step || 0);
  const totalSteps = progressLabels.length - 1;
  progressText.textContent = progressLabels[step];
  progressFill.style.width = `${(step / totalSteps) * 100}%`;
}

function showScreen(id) {
  const nextScreen = document.querySelector(`#${id}`);
  if (!nextScreen) return;

  screens.forEach((screen) => {
    const isActive = screen === nextScreen;
    screen.hidden = !isActive;
    screen.classList.toggle("is-active", isActive);
    screen.setAttribute("aria-hidden", String(!isActive));
  });

  updateProgress(nextScreen);
  window.scrollTo({ top: 0, behavior: "smooth" });

  const nextButton = nextScreen.querySelector("button, input");
  if (nextButton) {
    window.setTimeout(() => nextButton.focus({ preventScroll: true }), 250);
  }
}

function startMusic() {
  if (!hasStartedMusic) {
    music.volume = 0.32;
    hasStartedMusic = true;
  }
  music.play().then(() => {
    soundButton.classList.add("is-playing");
    soundButton.setAttribute("aria-label", "Pause background music");
  }).catch(() => {
    soundButton.classList.remove("is-playing");
  });
}

function toggleMusic() {
  if (music.paused) {
    startMusic();
  } else {
    music.pause();
    soundButton.classList.remove("is-playing");
    soundButton.setAttribute("aria-label", "Play background music");
  }
}

function checkPasscode() {
  if (passcodeInput.value === birthdayConfig.secretCode) {
    passcodeInput.value = "";
    passcodeMessage.textContent = "The door unlocked!";
    createBurst(18);
    window.setTimeout(() => showScreen("question"), 350);
    return;
  }

  passcodeInput.value = "";
  passcodeMessage.textContent = "That code did not open the door.";
  window.setTimeout(() => showScreen("wrong-code"), 380);
}

function setPhotoSources() {
  document.querySelectorAll("[data-photo]").forEach((image) => {
    const index = Number(image.dataset.photo);
    const photoCard = image.closest(".photo-card");
    const source = birthdayConfig.photos[index];

    image.addEventListener("load", () => photoCard.classList.add("has-image"));
    image.addEventListener("error", () => photoCard.classList.remove("has-image"));
    image.src = source;
  });
}

function setEnvelopeMessage(index) {
  const note = birthdayConfig.loveNotes[index];
  const reveal = document.querySelector("#noteReveal");
  const label = document.createElement("span");
  const message = document.createElement("p");
  label.textContent = "you found a note ✦";
  message.textContent = note;
  reveal.replaceChildren(label, message);
  document.querySelectorAll("[data-note]").forEach((button) => {
    button.classList.toggle("is-open", Number(button.dataset.note) === index);
  });
  document.querySelector("#envelopeNext").hidden = false;
  createBurst(12);
}

function revealMemory(button) {
  if (button.classList.contains("is-found")) return;

  const memory = birthdayConfig.heartMemories[Number(button.dataset.memory)];
  button.classList.add("is-found");
  button.textContent = "✦";
  button.setAttribute("aria-label", memory);
  button.title = memory;

  const found = document.querySelectorAll(".memory-heart.is-found").length;
  const message = document.querySelector("#memoryMessage");
  message.textContent = `${found} of 3 hearts collected — ${memory}`;
  createBurst(8);

  if (found === birthdayConfig.heartMemories.length) {
    document.querySelector("#memoryNext").disabled = false;
    message.textContent = "All three hearts found! You unlocked the final mystery. 💗";
  }
}

function blowCandle() {
  if (birthdayCake.classList.contains("is-blown")) return;
  birthdayCake.classList.add("is-blown");
  document.querySelector("#blowButton").disabled = true;
  document.querySelector("#wishMessage").textContent = "Your wish is safe with the stars. ✨";
  createBurst(70);
  window.setTimeout(() => showScreen("finale"), 1100);
}

function initialise() {
  setText("[data-partner-name]", birthdayConfig.partnerName);
  setText("[data-your-name]", birthdayConfig.yourName);
  setText("[data-final-message]", birthdayConfig.finalMessage);
  document.title = `Happy Birthday, ${birthdayConfig.partnerName}!`;
  musicSource.src = birthdayConfig.musicFile;
  music.load();

  document.querySelectorAll(".character-stage").forEach(buildCharacterStage);
  makeFallingEffects();
  setPhotoSources();
  updateProgress(document.querySelector(".screen.is-active"));
}

document.querySelectorAll("[data-go]").forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();
    const destination = button.dataset.go;
    if (destination === "start") {
      showScreen("start");
      return;
    }
    startMusic();
    showScreen(destination);
  });
});

document.querySelectorAll("[data-key]").forEach((button) => {
  button.addEventListener("click", () => {
    const key = button.dataset.key;
    if (key === "back") {
      passcodeInput.value = passcodeInput.value.slice(0, -1);
    } else if (key === undefined) {
      return;
    } else {
      passcodeInput.value = `${passcodeInput.value}${key}`.slice(0, passcodeInput.maxLength);
    }
    passcodeInput.focus();
  });
});

document.querySelector("#unlockButton").addEventListener("click", checkPasscode);
passcodeInput.addEventListener("input", () => {
  passcodeInput.value = passcodeInput.value.replace(/\D/g, "");
});
passcodeInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") checkPasscode();
});

document.querySelectorAll("[data-note]").forEach((button) => {
  button.addEventListener("click", () => setEnvelopeMessage(Number(button.dataset.note)));
});

document.querySelectorAll("[data-memory]").forEach((button) => {
  button.addEventListener("click", () => revealMemory(button));
});

document.querySelector("#blowButton").addEventListener("click", blowCandle);
document.querySelector("#replayButton").addEventListener("click", () => {
  birthdayCake.classList.remove("is-blown");
  document.querySelector("#blowButton").disabled = false;
  document.querySelector("#wishMessage").textContent = "";
  document.querySelector("#memoryNext").disabled = true;
  document.querySelector("#memoryMessage").textContent = "0 of 3 hearts collected";
  document.querySelectorAll(".memory-heart").forEach((heart) => {
    heart.classList.remove("is-found");
    heart.textContent = "♥";
    heart.removeAttribute("title");
    heart.setAttribute("aria-label", `Reveal memory ${Number(heart.dataset.memory) + 1}`);
  });
  const notePrompt = document.createElement("p");
  notePrompt.textContent = "Choose an envelope, birthday girl.";
  document.querySelector("#noteReveal").replaceChildren(notePrompt);
  document.querySelector("#envelopeNext").hidden = true;
  document.querySelectorAll("[data-note]").forEach((button) => button.classList.remove("is-open"));
  showScreen("start");
});

soundButton.addEventListener("click", toggleMusic);

initialise();

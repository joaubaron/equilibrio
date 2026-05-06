// ===== CONFIG =====
const TOTAL_PAGES = 4;

const tracks = [
  { src: "assets/musica1.mp3", name: "Música 1" },
  { src: "assets/musica2.mp3", name: "Música 2" }
];

// trava horizontal (quando suportado)
if (screen.orientation?.lock) {
  screen.orientation.lock("landscape").catch(() => {});
}

// ===== GERAR ENCARTES =====
const container = document.getElementById("container");

for (let i = 1; i <= TOTAL_PAGES; i++) {
  const div = document.createElement("div");
  div.className = "page";
  div.style.backgroundImage = `url('assets/encarte${i}.webp')`;
  container.appendChild(div);
}

// ===== PLAYER =====
let current = 0;
const audio = new Audio(tracks[current].src);
const trackName = document.getElementById("trackName");

function loadTrack(i) {
  audio.src = tracks[i].src;
  trackName.textContent = tracks[i].name;
  audio.play();
}

function toggle() {
  audio.paused ? audio.play() : audio.pause();
}

function next() {
  current = (current + 1) % tracks.length;
  loadTrack(current);
}

function prev() {
  current = (current - 1 + tracks.length) % tracks.length;
  loadTrack(current);
}

// autoplay no primeiro toque
document.body.addEventListener("click", () => {
  audio.play();
}, { once: true });

// ===== SINCRONIZAÇÃO SIMPLES =====
audio.addEventListener("timeupdate", () => {
  const t = audio.currentTime;
  const page = Math.floor(t / 20);

  container.scrollTo({
    left: page * window.innerWidth,
    behavior: "smooth"
  });
});

// ===== SERVICE WORKER =====
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js");
}

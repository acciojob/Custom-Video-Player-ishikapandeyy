const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const toggle = player.querySelector(".toggle");
const skipButtons = player.querySelectorAll("[data-skip]");
const ranges = player.querySelectorAll(".player__slider");


// Play / Pause
function togglePlay() {
	 video.paused ? video.play() : video.pause();
	 updateButton(); 
}


// Change Play / Pause button
function updateButton() {
    toggle.textContent = video.paused ? "►" : "❚ ❚";
}


// Progress Bar
function updateProgress() {
    if (!video.duration || !Number.isFinite(video.duration)) return;

    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.width = `${percent}%`;
}

// Volume / Playback Speed
function handleRange() {

    if (this.name === "volume") {
        video.volume = this.value;
    }

    if (this.name === "playbackRate") {
        video.playbackRate = this.value;
    }
}


function skip() {
    console.log("Skip button clicked:", this.dataset.skip);

    const skipAmount = Number(this.dataset.skip);
    console.log("Current time:", video.currentTime);

    video.currentTime += skipAmount;

    console.log("New time:", video.currentTime);
}

// Click progress bar
function scrub(e) {

    let scrubTime =
        (e.offsetX / progress.offsetWidth) * video.duration;

    video.currentTime = scrubTime;
}

player.addEventListener('click', (e) => {
  if (e.target.closest('.player__controls')) return; // ignore control clicks
  if (video.paused) {
    video.play().catch(err => console.error('Autoplay blocked:', err));
  }
});

// Events

toggle.addEventListener("click", togglePlay);
video.addEventListener('ended', updateButton)
video.addEventListener("timeupdate", updateProgress);
video.addEventListener("pause", updateButton);

video.addEventListener('loadedmetadata', () => { updateProgress(); });


ranges.forEach(function(range) {
    range.addEventListener("input", handleRange);
});

skipButtons.forEach(function(button) {
    button.addEventListener("click", skip);
});

progress.addEventListener("click", scrub);
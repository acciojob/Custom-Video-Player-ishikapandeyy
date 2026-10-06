const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const toggle = player.querySelector(".toggle");
const skipButtons = player.querySelectorAll("[data-skip]");
const ranges = player.querySelectorAll(".player__slider");


// Play / Pause
function togglePlay() {
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
}


// Change Play / Pause button
function updateButton() {
    toggle.textContent = video.paused ? "►" : "❚ ❚";
}


// Progress Bar
function updateProgress() {
  const percent = (video.currentTime / video.duration) * 100;

  progressBar.style.flexBasis = `${percent}%`;
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


// Skip
function skip() {
    video.currentTime += Number(this.dataset.skip);
}


// Click progress bar
function scrub(e) {

    let scrubTime =
        (e.offsetX / progress.offsetWidth) * video.duration;

    video.currentTime = scrubTime;
}


// Events

toggle.addEventListener("click", togglePlay);

video.addEventListener("play", updateButton);

video.addEventListener("pause", updateButton);

video.addEventListener("timeupdate", updateProgress);

ranges.forEach(function(range) {
    range.addEventListener("input", handleRange);
});

skipButtons.forEach(function(button) {
    button.addEventListener("click", skip);
});

progress.addEventListener("click", scrub);
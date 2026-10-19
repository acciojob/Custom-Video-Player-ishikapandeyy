/* ==== SELECTORS ==== */
const player      = document.querySelector('.player');
const video       = player.querySelector('.viewer');
const progress    = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle      = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges      = player.querySelectorAll('.player__slider');

/* ==== PLAY / PAUSE ==== */
function togglePlay() { 
	video.paused ? video.play() : video.pause(); 
	updateButton(); 
}

function updateButton() { 
	toggle.textContent = video.paused ? '►' : '❚❚'; 
}

toggle.addEventListener('click', togglePlay);
video.addEventListener('pause', updateButton);
video.addEventListener('play',  updateButton);
video.addEventListener('ended', updateButton);

function updateProgress() {
  if (!video.duration) return;               // safety net
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.width = `${percent}%`;
}

video.addEventListener('timeupdate', updateProgress);
video.addEventListener('loadedmetadata', () => {
  progressBar.style.width = '0%';
  updateProgress();         
});

/* ==== SCRUB ==== */
function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}
progress.addEventListener('click', scrub);

/* ==== SLIDERS (volume & speed) ==== */
function handleRange() {
  if (this.name === 'volume') video.volume = parseFloat(this.value);
  else if (this.name === 'playbackRate') video.playbackRate = parseFloat(this.value);
}
ranges.forEach(r => r.addEventListener('input', handleRange));

/* ==== SKIP BUTTONS ==== */
function skip(e) {
  const raw = e.currentTarget.dataset.skip;
  const amount = parseFloat(raw);
	
  if (isNaN(amount)) { 
	  console.warn('Invalid skip:', raw); return; 
  }
	
  let newTime = video.currentTime + amount;
  newTime = Math.max(0, Math.min(newTime, video.duration));
  video.currentTime = newTime;
  console.log(`Skipped ${amount}s → ${video.currentTime}s`);
}
skipButtons.forEach(btn => btn.addEventListener('click', skip));

/* ==== CLICK PLAYER TO PLAY (optional) ==== */
player.addEventListener('click', e => {
  if (e.target.closest('.player__controls')) return;
  if (video.paused) video.play().catch(err => console.error('Autoplay blocked:', err));
});
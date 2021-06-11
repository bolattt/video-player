const video = document.querySelector("video");
const progressRange = document.querySelector(".progress-range");
const progressBar = document.querySelector(".progress-bar");
const playBtn = document.getElementById("play-btn");
const volumeIcon = document.getElementById("volume-icon");
const volumeRange = document.querySelector(".volume-range");
const volumeBar = document.querySelector(".volume-bar");
const currentTime = document.querySelector(".time-elapsed");
const duration = document.querySelector(".time-duration");
const fullscreenBtn = document.querySelector(".fullscreen");

// Play & Pause ----------------------------------- //

function showPlayIcon() {
  playBtn.classList.replace("fa-pause", "fa-play");
  playBtn.setAttribute("title", "Play");
}
function togglePlay() {
  // if paused , play and show pause
  // if ended, pause and show play
  if (video.paused) {
    video.play();
    playBtn.classList.replace("fa-play", "fa-pause");
    playBtn.setAttribute("title", "Pause");
  } else {
    video.pause();
    showPlayIcon();
  }
}
// On Video End, show play button icon
video.addEventListener("ended", showPlayIcon);
// End of  Play & Pause ----------------------------------- //

// Progress Bar ---------------------------------- //
// Calculate display time format
function displayTime(time) {
  const minutes = Math.floor(time / 60);
  let sec = Math.floor(time % 60);
  sec < 10 ? (sec = `0${sec}`) : sec;
  return `${minutes}:${sec}`;
}
// Update progress bar as video plays
function updateProgress() {
  progressBar.style.width = `${(video.currentTime / video.duration) * 100}%`;
  duration.textContent = displayTime(video.duration);
  currentTime.textContent = displayTime(video.currentTime);
}

// Click to seek
function setProgress(e) {
  const newTime = e.offsetX / progressRange.offsetWidth;
  progressBar.style.width = `${newTime * 100}%`;
  video.currentTime = newTime * video.duration;
}

// Volume Controls --------------------------- //

let lastVolume = 1;

// Change icon depending on volume
function changeVolumeIcon(volume) {
  volumeIcon.className = "";
  if (volume > 0.7) {
    volumeIcon.classList.add("fas", "fa-volume-up");
  } else if (volume < 0.7 && volume > 0) {
    volumeIcon.classList.add("fas", "fa-volume-down");
  } else if (volume === 0) {
    volumeIcon.classList.add("fas", "fa-volume-off");
  }
}

// Volume Bar
function changeVolume(e) {
  let volume = e.offsetX / volumeRange.offsetWidth;
  // Rounding volume up or down
  if (volume < 0.1) {
    volume = 0;
  }
  if (volume > 0.9) {
    volume = 1;
  }
  volumeBar.style.width = `${volume * 100}%`;
  video.volume = volume;
  changeVolumeIcon(volume);

  lastVolume = volume;
}

// Mute Unmute
function toggleMute() {
  volumeIcon.className = "";
  if (video.muted) {
    video.muted = false;
    volumeBar.style.width = `${lastVolume * 100}%`;
    changeVolumeIcon(lastVolume);
    volumeIcon.setAttribute("title", "Mute");
  } else {
    lastVolume = video.volume;
    video.muted = true;
    volumeBar.style.width = 0;
    volumeIcon.classList.add("fas", "fa-volume-mute");
    volumeIcon.setAttribute("title", "Unmute");
  }
}

// Change Playback Speed -------------------- //

// Fullscreen ------------------------------- //

// Event Listeners
playBtn.addEventListener("click", togglePlay);
video.addEventListener("click", togglePlay);
video.addEventListener("timeupdate", updateProgress);
video.addEventListener("canplay", updateProgress);
progressRange.addEventListener("click", setProgress);
volumeRange.addEventListener("click", changeVolume);
volumeIcon.addEventListener("click", toggleMute);

const video = document.querySelector("video");
const progressRange = document.querySelector(".progress-range");
const progressBar = document.querySelector(".progress-bar");
const playBtn = document.getElementById("play-btn");
const volume = document.getElementById("volume-icon");
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
// Update progress bar as video plays
function changeIntoMinutes(seconds) {
  const minutes = (seconds / 60).toFixed(0);
  let sec = seconds.toString().split(".")[0];
  if (Number(sec) < 10) {
    sec = `0${sec}`;
  }
  return `${minutes}:${sec}`;
}

function updateProgress() {
  progressBar.style.width = `${(video.currentTime / video.duration) * 100}%`;
  //   const minutes = (video.duration / 60).toFixed(0);
  //   const sec = (video.duration % 60).toFixed(2).toString().split(".")[1];
  duration.textContent = changeIntoMinutes(video.duration);
  currentTime.textContent = changeIntoMinutes(video.currentTime);
}

// Volume Controls --------------------------- //

// Change Playback Speed -------------------- //

// Fullscreen ------------------------------- //

// Event Listeners
playBtn.addEventListener("click", togglePlay);
video.addEventListener("click", togglePlay);
video.addEventListener("timeupdate", updateProgress);
video.addEventListener("canplay", updateProgress);

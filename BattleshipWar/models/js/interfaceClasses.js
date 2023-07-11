class showMute {
  constructor() {
    this.mute = mute;
    if (mute) {
      let muteButton = document.querySelector(".showSound");
      muteButton.addEventListener("click", () => {
        mute.classList.toggle("activo");
      });
    }
  }
}

window.showmute = new showMute();
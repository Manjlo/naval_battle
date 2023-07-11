// clase sonido y mute
class showMute {
  constructor() {
    this.mute = mute;

    if (mute) {
      let muteButton = document.querySelector(".showSound");
      muteButton.addEventListener("click", () => {
        mute.classList.toggle("activo");
        let miAudio = document.querySelector("#warSound");
        if (mute.classList.contains("activo")) {
          miAudio.pause();
        } else {
          miAudio.play();
        }
      });
    }
  }
}


window.showmute = new showMute();

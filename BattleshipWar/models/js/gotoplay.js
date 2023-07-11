class gotoPlay {
  constructor() {
    this.gotoPlay = document.getElementById("play");
    this.playPage = document.getElementById("playPage");

    if (this.gotoPlay) {
      this.gotoPlay.addEventListener("click", () => {
        console.log("se esta ejecutando el metodo showPlayPage");
        this.playPage.style.display = "block";
      });
    }
  }
}

window.gotoplay = new gotoPlay();

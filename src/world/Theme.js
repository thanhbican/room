import { EventEmitter } from "events";
// import Viewer from "../Viewer";

export default class Theme extends EventEmitter {
  constructor() {
    super();
    // this.viewer = new Viewer();
    // this.scene = this.viewer.scene;
    // this.resources = this.viewer.resources;
    // this.camera = this.viewer.camera;
    // this.sizes = this.viewer.sizes;
    // this.room = this.viewer.world.room.actualRoom;

    this.theme = "light";
    this.buttonToggle = document.querySelector("#button-toggle");

    this.switchTheme();
  }

  switchTheme() {
    this.buttonToggle.addEventListener("click", () => {
      this.theme = this.theme === "light" ? "dark" : "light";
      this.emit("switch", this.theme);

      if (this.theme === "light") {
        document.body.classList.add("light-theme");
        document.body.classList.remove("dark-theme");
      } else {
        document.body.classList.remove("light-theme");
        document.body.classList.add("dark-theme");
      }
    });
  }
}

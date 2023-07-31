import { EventEmitter } from "events";
import Viewer from "../Viewer";
import gsap from "gsap";

export default class Preloader extends EventEmitter {
  constructor() {
    super();

    this.viewer = new Viewer();
    this.world = this.viewer.world;
    this.sizes = this.viewer.sizes;
    this.camera = this.viewer.camera;
    this.device = this.viewer.sizes.device;

    this.world.on("worldReady", () => {
      this.setAssets();
      this.playIntro();
    });

    this.sizes.on("switchDevice", (device) => {
      this.device = device;
    });
  }

  setAssets() {
    this.room = this.viewer.world.room.actualRoom;
    this.roomChildren = this.viewer.world.room.roomChildren;
    console.log(this.roomChildren);
  }

  firstIntro() {
    return new Promise((resolve) => {
      this.timeline = new gsap.timeline();

      if (this.device === "desktop") {
        this.timeline
          .to(this.roomChildren.cube.scale, {
            x: 1.4,
            y: 1.4,
            z: 1.4,
            ease: "back.out(2.5)",
            duration: 0.7,
          })
          .to(this.room.position, {
            x: -1,
            ease: "power1.out",
            duration: 0.7,
            onComplete: resolve,
          });
      } else {
        this.timeline
          .to(this.roomChildren.cube.scale, {
            x: 1.4,
            y: 1.4,
            z: 1.4,
            duration: 0.7,
            ease: "back.out(2.5)",
          })
          .to(this.room.position, {
            z: -1,
            ease: "power1.out",
            duration: 0.7,
            onComplete: resolve,
          });
      }
    });
  }
  secondIntro() {
    return new Promise((resolve) => {
      this.secondTimeline = new gsap.timeline();

      if (this.device === "desktop") {
        this.secondTimeline
          .to(this.room.position, {
            x: 0,
            y: 0,
            z: 0,
            ease: "power1.out",
            // onComplete: resolve,
          })
          .to(
            this.roomChildren.cube.rotation,
            {
              y: 2 * Math.PI - Math.PI / 4,
            },
            "same"
          )
          .to(
            this.roomChildren.cube.scale,
            {
              x: 5,
              y: 5,
              z: 5,
            },
            "same"
          )
          .to(
            this.camera.orthographicCamera.position,
            {
              y: 1,
            },
            "same"
          )
          .to(
            this.roomChildren.cube.position,
            {
              x: -0.144767 ,
              y: 5.81947,
              z: -0.962498 ,
            },
            "same"
          );
      } else {
        this.timeline.to(this.room.position, {
          x: 0,
          y: 0,
          z: 0,
          ease: "power1.out",
          onComplete: resolve,
        });
      }
    });
  }

  onScroll(e) {
    if (e.deltaY > 0) {
      window.removeEventListener("wheel", this.scrollOnceEvent);
      this.playSecondIntro();
    }
  }

  async playIntro() {
    await this.firstIntro();
    this.scrollOnceEvent = this.onScroll.bind(this);
    window.addEventListener("wheel", this.scrollOnceEvent);
  }
  async playSecondIntro() {
    await this.secondIntro();
  }
}

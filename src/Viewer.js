import * as THREE from "three";
import Sizes from "./utils/Sizes";
import Camera from "./utils/Camera";
import Renderer from "./utils/Renderer";
import Time from "./utils/Time";
import World from "./world/World";
import Resources from "./utils/Resources";
import assets from "./utils/assets";
import Controls from "./world/Controls";
import Preloader from "./utils/Preloader";

export default class Viewer {
  static instance;

  constructor(canvas) {
    if (Viewer.instance) {
      return Viewer.instance;
    }
    Viewer.instance = this;

    this.canvas = canvas;
    this.scene = new THREE.Scene();
    this.sizes = new Sizes();
    this.time = new Time();
    this.camera = new Camera();
    this.renderer = new Renderer();
    this.resources = new Resources(assets);

    this.world = new World();
    this.preloader = new Preloader();

    this.time.on("update", () => {
      this.update();
    });
    this.sizes.on("resize", () => {
      this.resize();
    });
  }

  update() {
    this.camera.update();
    this.renderer.update();
    this.world.update();
  }
  resize() {
    this.camera.resize();
    this.renderer.resize();
    this.world.resize();
  }
}

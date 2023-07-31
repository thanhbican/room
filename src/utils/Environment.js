import * as THREE from "three";
import Viewer from "../Viewer";
import gsap from "gsap";
import GUI from "lil-gui";

export default class Environment {
  constructor() {
    this.viewer = new Viewer();
    this.scene = this.viewer.scene;
    this.resources = this.viewer.resources;

    this.setSunLight();
    // this.setGUI();
  }

  setGUI() {
    const obj = {
      color: { r: 0, g: 0, b: 0 },
      intensity: 3,
    };
    const gui = new GUI();
    gui.addColor(obj, "color").onChange(() => {
      this.sunLight.color.copy(obj.color);
      this.ambientLight.color.copy(obj.color);
    });
    gui.add(obj, "intensity", 0, 10).onChange(() => {
      this.sunLight.intensity = obj.intensity;
      // this.ambientLight.intensity = obj.intensity;
    });
  }

  setSunLight() {
    this.sunLight = new THREE.DirectionalLight("#aa8888", 3);
    this.sunLight.castShadow = true;
    this.sunLight.shadow.camera.far = 20;
    this.sunLight.shadow.mapSize.set(2048, 2048);
    this.sunLight.shadow.normalBias = 0.05;
    // const helper = new THREE.CameraHelper(this.sunLight.shadow.camera);
    // this.scene.add(helper);
    this.sunLight.position.set(1.5, 7, 3);
    this.scene.add(this.sunLight);

    this.ambientLight = new THREE.AmbientLight("#aa8888", 1);
    this.scene.add(this.ambientLight);
  }

  switchTheme(theme) {
    if (theme === "dark") {
      gsap.to(this.sunLight.color, {
        b: 0.3686274509803922,
        g: 0.13333333333333333,
        r: 0.1607843137254902,
      });
      gsap.to(this.ambientLight.color, {
        b: 0.3686274509803922,
        g: 0.13333333333333333,
        r: 0.1607843137254902,
      });
      gsap.to(this.sunLight, {
        intensity: 0.47,
      });
      gsap.to(this.ambientLight, {
        intensity: 0.47,
      });
    } else {
      gsap.to(this.sunLight.color, { r: 0.4019777798219466, g: 0.24620132669705552, b: 0.24620132669705552 });
      gsap.to(this.ambientLight.color, { r: 0.4019777798219466, g: 0.24620132669705552, b: 0.24620132669705552 });
      gsap.to(this.sunLight, {
        intensity: 3,
      });
      gsap.to(this.ambientLight, {
        intensity: 1,
      });
    }
  }
}

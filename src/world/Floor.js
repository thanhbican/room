import * as THREE from "three";
import Viewer from "../Viewer";

export default class Floor {
  constructor() {
    this.viewer = new Viewer();
    this.scene = this.viewer.scene;
    this.sizes = this.viewer.sizes;

    this.setFloor();
    this.setCircles();
  }

  setFloor() {
    this.geometry = new THREE.PlaneGeometry(100, 100);
    this.material = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      side: THREE.BackSide,
    });
    this.plane = new THREE.Mesh(this.geometry, this.material);
    this.scene.add(this.plane);
    this.plane.rotation.x = Math.PI / 2;
    this.plane.position.y = -0.3;
  }

  setCircles() {
    const geometry = new THREE.CircleGeometry(5, 32);
    const material1 = new THREE.MeshBasicMaterial({ color: 0xe5a1aa });
    const material2 = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    const material3 = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    this.circle1 = new THREE.Mesh(geometry, material1);
    this.circle2 = new THREE.Mesh(geometry, material2);
    this.circle3 = new THREE.Mesh(geometry, material3);
    this.circle1.position.y = -0.29;
    this.circle2.position.y = -0.28;
    this.circle3.position.y = -0.27;
    this.circle1.scale.set(0, 0, 0);
    this.circle2.scale.set(0, 0, 0);
    this.circle3.scale.set(0, 0, 0);

    this.circle2.position.x = this.sizes.width * 0.001;

    this.circle1.rotation.x = this.circle2.rotation.x = this.circle3.rotation.x = -Math.PI / 2;
    this.circle1.receiveShadow = this.circle2.receiveShadow = this.circle3.receiveShadow = true;
    this.scene.add(this.circle1);
    this.scene.add(this.circle2);
    this.scene.add(this.circle3);
  }

  resize() {}

  update() {}
}

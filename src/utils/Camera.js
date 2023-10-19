import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

import Viewer from '../Viewer'

export default class Camera {
  constructor() {
    this.viewer = new Viewer()
    this.sizes = this.viewer.sizes
    this.canvas = this.viewer.canvas
    this.scene = this.viewer.scene

    this.createPerspectiveCamera()
    this.createOrthographicCamera()
    this.setOrbitControls()
  }

  createPerspectiveCamera() {
    this.perspectiveCamera = new THREE.PerspectiveCamera(
      35,
      this.sizes.aspect,
      0.1,
      1000
    )
    this.scene.add(this.perspectiveCamera)
    this.perspectiveCamera.position.x = 29
    this.perspectiveCamera.position.y = 14
    this.perspectiveCamera.position.z = 12
  }
  createOrthographicCamera() {
    this.orthographicCamera = new THREE.OrthographicCamera(
      (-this.sizes.aspect * this.sizes.frustum) / 2,
      (this.sizes.aspect * this.sizes.frustum) / 2,
      this.sizes.frustum / 2,
      -this.sizes.frustum / 2,
      -50,
      50
    )

    this.orthographicCamera.position.y = 0
    this.orthographicCamera.position.z = 0
    this.orthographicCamera.rotation.x = -Math.PI / 6

    this.scene.add(this.orthographicCamera)

    // this.helper = new THREE.CameraHelper(this.orthographicCamera);
    // this.scene.add(this.helper);

    // const size = 20;
    // const divisions = 20;

    // const gridHelper = new THREE.GridHelper(size, divisions);
    // this.scene.add(gridHelper);

    // const axesHelper = new THREE.AxesHelper(5);
    // this.scene.add(axesHelper);
  }

  setOrbitControls() {
    this.controls = new OrbitControls(this.perspectiveCamera, this.canvas)
    this.controls.enableZoom = false
    this.controls.enableDamping = true
  }

  resize() {
    // Updating Perspective Camera on Resize
    this.perspectiveCamera.aspect = this.sizes.aspect
    this.perspectiveCamera.updateProjectionMatrix()

    // Updating Orthographic Camera on Resize
    this.orthographicCamera.left = (-this.sizes.aspect * this.sizes.frustum) / 2
    this.orthographicCamera.right = (this.sizes.aspect * this.sizes.frustum) / 2
    this.orthographicCamera.top = this.sizes.frustum / 2
    this.orthographicCamera.bottom = -this.sizes.frustum / 2
    this.orthographicCamera.updateProjectionMatrix()
  }

  update() {
    this.controls.update()
    // this.helper.matrixWorldNeedsUpdate = true;
    // this.helper.update();
    // this.helper.position.copy(this.perspectiveCamera.position);
    // this.helper.rotation.copy(this.perspectiveCamera.rotation);
  }
}

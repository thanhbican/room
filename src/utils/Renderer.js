import * as THREE from 'three'

import Viewer from '../Viewer'

export default class Renderer {
  constructor() {
    this.viewer = new Viewer()
    this.sizes = this.viewer.sizes
    this.canvas = this.viewer.canvas
    this.scene = this.viewer.scene
    this.camera = this.viewer.camera

    this.setRenderer()
  }
  setRenderer() {
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
    })
    // this.renderer.useLegacyLights  = true;
    // this.renderer.outputColorSpace  = THREE.sRGBEncoding;
    this.renderer.toneMapping = THREE.CineonToneMapping
    this.renderer.toneMappingExposure = 1.75
    this.renderer.shadowMap.enabled = true
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap
    this.renderer.setSize(this.sizes.width, this.sizes.height)
    this.renderer.setPixelRatio(this.sizes.pixelRatio)
  }
  resize() {
    this.renderer.setSize(this.sizes.width, this.sizes.height)
    this.renderer.setPixelRatio(this.sizes.pixelRatio)
  }
  update() {
    this.renderer.setViewport(0, 0, this.sizes.width, this.sizes.height)
    this.renderer.render(this.scene, this.camera.orthographicCamera)

    // this.renderer.setScissorTest(true);
    // this.renderer.setViewport(
    //   this.sizes.width - this.sizes.width / 3,
    //   this.sizes.height - this.sizes.height / 3,
    //   this.sizes.width / 3,
    //   this.sizes.height / 3
    // );
    // this.renderer.setScissor(
    //   this.sizes.width - this.sizes.width / 3,
    //   this.sizes.height - this.sizes.height / 3,
    //   this.sizes.width / 3,
    //   this.sizes.height / 3
    // );
    // this.renderer.render(this.scene, this.camera.perspectiveCamera);

    // this.renderer.setScissorTest(false);
  }
}

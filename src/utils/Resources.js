import { EventEmitter } from 'events'
import * as THREE from 'three'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

import Viewer from '../Viewer'

export default class Resources extends EventEmitter {
  constructor(assets) {
    super()
    this.viewer = new Viewer()
    this.renderer = this.viewer.renderer

    this.assets = assets

    this.items = {}
    this.queue = this.assets.length
    this.loaded = 0

    this.setLoaders()
    this.startLoading()
  }

  setLoaders() {
    this.loaders = {}
    this.loaders.gltfLoader = new GLTFLoader()
    this.loaders.dracoLoader = new DRACOLoader()
    this.loaders.dracoLoader.setDecoderPath('/draco/')
    this.loaders.gltfLoader.setDRACOLoader(this.loaders.dracoLoader)
  }
  startLoading() {
    for (const asset of this.assets) {
      if (asset.type === 'glbModel') {
        this.loaders.gltfLoader.load(asset.path, (file) => {
          this.singleAssetLoaded(asset, file)
        })
      } else if (asset.type === 'videoTexture') {
        this.video = {}
        this.videoTexture = {}
        this.video[asset.name] = document.createElement('video')
        this.video[asset.name].src = asset.path
        this.video[asset.name].muted = true
        this.video[asset.name].playsInline = true
        this.video[asset.name].autoplay = true
        this.video[asset.name].loop = true
        let x = this.video[asset.name].play();

        this.video[asset.name] = new THREE.VideoTexture(this.video[asset.name])
        this.video[asset.name].flipY = false
        // this.video[asset.name].minFilter = THREE.NearestFilter;
        // this.video[asset.name].magFilter = THREE.NearestFilter;
        // this.video[asset.name].generateMipmaps = false;
        // this.video[asset.name].encoding = THREE.sRGBEncoding
        this.singleAssetLoaded(asset, this.video[asset.name])
      }
    }
  }
  singleAssetLoaded(asset, file) {
    this.items[asset.name] = file
    this.loaded++
    if (this.loaded === this.queue) {
      this.emit('ready')
    }
  }
}

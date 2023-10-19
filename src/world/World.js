import { EventEmitter } from 'events'

import Environment from '../utils/Environment'
import Viewer from '../Viewer'
import Controls from './Controls'
import Floor from './Floor'
import Room from './Room'
import Theme from './Theme'

export default class World extends EventEmitter {
  constructor() {
    super()
    this.viewer = new Viewer()
    this.canvas = this.viewer.canvas
    this.scene = this.viewer.scene
    this.sizes = this.viewer.sizes
    this.camera = this.viewer.camera
    this.resources = this.viewer.resources
    this.theme = new Theme()

    this.resources.on('ready', () => {
      this.environment = new Environment()
      this.room = new Room()
      this.floor = new Floor()
      // this.controls = new Controls()
      this.emit('worldReady')
    })

    this.theme.on('switch', (theme) => {
      this.switchTheme(theme)
    })
  }

  switchTheme(theme) {
    this.environment.switchTheme(theme)
    this.room.switchLight(theme)
  }

  resize() {}

  update() {
    if (this.room) {
      this.room.update()
    }
    if (this.controls) {
      this.controls.update()
    }
  }
}

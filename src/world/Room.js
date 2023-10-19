import gsap from 'gsap'
import * as THREE from 'three'

import Viewer from '../Viewer'

export default class Room {
  constructor() {
    this.viewer = new Viewer()
    this.scene = this.viewer.scene
    this.resources = this.viewer.resources
    this.room = this.resources.items['room']
    this.roomChildren = {}
    this.actualRoom = this.room.scene

    this.lerp = {
      current: 0,
      target: 0,
      ease: 0.1,
    }

    this.setShadow()
    this.setAreaLight()
    this.setModel()
    this.onMouseMove()
  }

  setShadow() {
    this.actualRoom.children.forEach((child) => {
      child.castShadow = true
      child.receiveShadow = true

      if (child instanceof THREE.Group) {
        child.children.forEach((groupChild) => {
          groupChild.castShadow = true
          groupChild.receiveShadow = true
        })
      }

      if (child.name === 'Computer_screen') {
        child.material = new THREE.MeshBasicMaterial({
          map: this.resources.items.screen,
        })
        child.visible = false
        // console.log(this.resources.items.screen)
      }
      if (child.name === 'Dupe_floor') {
        child.position.x = 0.011029
        child.position.z = 0.930317
        // child.position.x = -3.39357
        // child.position.z = -4.19884
      }
      // if (
      //   [
      //     'Floor1',
      //     'Floor2',
      //     'Floor3',
      //     'Flower1',
      //     'Flower2',
      //     'Land',
      //     'Image',
      //     'Image_deck',
      //   ].includes(child.name)
      // ) {
      //   child.scale.set(0, 0, 0)
      // }
      child.scale.set(0, 0, 0)

      if (child.name === 'Cube') {
        // child.scale.set(1, 1, 1);
        child.position.set(0, 0, 0)
        child.rotation.y = -Math.PI / 4
      }
      this.roomChildren[child.name] = child
    })
  }

  setAreaLight() {
    const width = 0.5
    const height = 0.5
    const intensity = 3
    this.rectLight = new THREE.RectAreaLight(0xffffff, intensity, width, height)
    this.rectLight.position.set(-6, 9, -1.23202)
    this.rectLight.rotation.x = -Math.PI / 2
    this.rectLight.rotation.z = Math.PI / 4
    // this.rectLight.lookAt(0, 0, 0)
    this.rectLight.visible = false
    this.actualRoom.add(this.rectLight)
    this.roomChildren['rectLight'] = this.rectLight
  }

  switchLight(theme) {
    if (theme === 'dark') {
      this.rectLight.visible = true
    } else {
      this.rectLight.visible = false
    }
  }

  setModel() {
    this.scene.add(this.actualRoom)
    this.actualRoom.scale.set(0.16, 0.16, 0.16)
  }

  onMouseMove() {
    window.addEventListener('mousemove', (e) => {
      this.rotation =
        ((e.clientX - window.innerWidth / 2) * 2) / window.innerWidth
      this.lerp.target = this.rotation * 0.1
    })
  }

  resize() {}

  update() {
    this.lerp.current = gsap.utils.interpolate(
      this.lerp.current,
      this.lerp.target,
      this.lerp.ease
    )
    this.actualRoom.rotation.y = this.lerp.current
  }
}

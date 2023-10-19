import { EventEmitter } from 'events'
import gsap from 'gsap'

import Viewer from '../Viewer'
import textAnimation from './TextAnimation'

export default class Preloader extends EventEmitter {
  constructor() {
    super()

    this.viewer = new Viewer()
    this.world = this.viewer.world
    this.sizes = this.viewer.sizes
    this.camera = this.viewer.camera
    this.device = this.viewer.sizes.device

    this.world.on('worldReady', () => {
      this.setAssets()
      this.playIntro()
    })

    this.sizes.on('switchDevice', (device) => {
      this.device = device
    })
  }

  setAssets() {
    textAnimation(document.querySelector('#text-loading'))
    textAnimation(document.querySelector('#text-showcase1'))
    textAnimation(document.querySelector('#text-showcase2'))
    textAnimation(document.querySelector('#text-showcase3'))
    textAnimation(document.querySelector('#text-showcase4'))

    this.room = this.viewer.world.room.actualRoom
    this.roomChildren = this.viewer.world.room.roomChildren
  }

  firstIntro() {
    return new Promise((resolve) => {
      this.timeline = new gsap.timeline()
      this.timeline.to('#loading-spinner', {
        autoAlpha: 0,
        pointerEvents: 'none',
        delay: 1,
      })

      if (this.device === 'desktop') {
        this.timeline
          .to(this.roomChildren.Cube.scale, {
            x: 1.4,
            y: 1.4,
            z: 1.4,
            ease: 'back.out(2.5)',
            duration: 0.7,
          })
          .to(this.room.position, {
            x: -1,
            ease: 'power1.out',
            duration: 0.7,
          })
      } else {
        this.timeline
          .to(this.roomChildren.Cube.scale, {
            x: 1.4,
            y: 1.4,
            z: 1.4,
            duration: 0.7,
            ease: 'back.out(2.5)',
          })
          .to(this.room.position, {
            z: -1,
            ease: 'power1.out',
            duration: 0.7,
          })
      }

      this.timeline
        .to('#text-loading span', {
          y: 0,
          stagger: 0.07,
        })
        .to('#scroll-icon', {
          opacity: 1,
          ease: 'linear',
          duration: 1,
          onComplete: resolve,
        })
    })
  }
  secondIntro() {
    return new Promise((resolve) => {
      this.secondTimeline = new gsap.timeline()

      this.secondTimeline
        .to(
          Array.from(document.querySelectorAll('#text-loading span')).reverse(),
          {
            y: '100%',
            stagger: 0.03,
          },
          'sameTime'
        )
        .to(
          '#scroll-icon',
          {
            opacity: 0,
          },
          'sameTime'
        )
        .to(this.room.position, {
          x: 0,
          y: 0,
          z: 0,
          ease: 'power1.out',
        })
        .to(
          this.roomChildren.Cube.rotation,
          {
            y: 2 * Math.PI - Math.PI / 4,
          },
          'same'
        )
        .to(
          this.roomChildren.Cube.scale,
          {
            x: 8.1,
            y: 8.1,
            z: 8.1,
          },
          'same'
        )
        .to(
          this.camera.orthographicCamera.position,
          {
            y: 1,
          },
          'same'
        )
        .to(
          this.roomChildren.Cube.position,
          {
            x: 0,
            y: 8.09186,
            z: 0,
          },
          'same'
        )
        .set(this.roomChildren['Room_body'].scale, {
          x: 1,
          y: 1,
          z: 1,
        })
        .to(
          this.roomChildren.Cube.scale,
          {
            x: 0,
            y: 0,
            z: 0,
            duration: 1,
          },
          'text-intro'
        )
        .to(
          '#text-showcase1 span',
          {
            y: 0,
            stagger: 0.07,
          },
          'text-intro'
        )
        .to(
          '#text-showcase2 span',
          {
            y: 0,
            stagger: 0.07,
          },
          'text-intro'
        )
        .to(
          '#text-showcase3 span',
          {
            y: 0,
            stagger: 0.07,
          },
          'text-intro'
        )
        .to(
          '#text-showcase4 span',
          {
            y: 0,
            stagger: 0.07,
            ease: 'back.out(1.7)',
          },
          'text-intro'
        )
        .to(
          [
            this.roomChildren['Clock_face'].scale,
            this.roomChildren['Clock_hour'].scale,
            this.roomChildren['Clock_minute'].scale,
          ],
          {
            x: 1,
            y: 1,
            z: 1,
            ease: 'back.out(2.2)',
            duration: 0.5,
          },
          '>-1'
        )
        .to(
          this.roomChildren['Bed'].scale,
          {
            x: 1,
            y: 1,
            z: 1,
            ease: 'back.out(2.2)',
            duration: 0.5,
          },
          '>-1'
        )
        .set(
          [
            this.roomChildren['Desk1'].scale,
            this.roomChildren['Desk2'].scale,
            this.roomChildren['Book1'].scale,
            this.roomChildren['Book2'].scale,
            this.roomChildren['Book3'].scale,
            this.roomChildren['Book4'].scale,
          ],
          {
            x: 1,
            y: 1,
            z: 1,
          }
        )
        .from(
          this.roomChildren['Desk1'].position,
          {
            x: 100,
            ease: 'power3.out',
            duration: 0.5,
          },
          '>-0.2'
        )

        .from(
          this.roomChildren['Desk2'].position,
          {
            x: 100,
            ease: 'power3.out',
            duration: 0.5,
          },
          '>-0.2'
        )
        .from(
          this.roomChildren['Book1'].position,
          {
            x: -10,
            z: -10,
            ease: 'power3.out',
            duration: 0.2,
          },
          '>-0.1'
        )
        .from(
          this.roomChildren['Book2'].position,
          {
            x: -10,
            z: -10,
            ease: 'power3.out',
            duration: 0.2,
          },
          '>-0.1'
        )
        .from(
          this.roomChildren['Book3'].position,
          {
            x: -10,
            z: -10,
            ease: 'power3.out',
            duration: 0.2,
          },
          '>-0.1'
        )
        .from(
          this.roomChildren['Book4'].position,
          {
            x: -10,
            z: -10,
            ease: 'power3.out',
            duration: 0.2,
          },
          '>-0.1'
        )
        .to(
          this.roomChildren['Book5'].scale,
          {
            x: 1,
            y: 1,
            z: 1,
            ease: 'power3.out',
            duration: 0.5,
          },
          '>-0.1'
        )
        .to(
          this.roomChildren['Book6'].scale,
          {
            x: 1,
            y: 1,
            z: 1,
            ease: 'power3.out',
            duration: 0.5,
          },
          '>-0.1'
        )
        .to(
          this.roomChildren['Lamp'].scale,
          {
            x: 1,
            y: 1,
            z: 1,
            ease: 'power3.out',
            duration: 0.5,
          },
          '>-0.1'
        )
        .to(
          this.roomChildren['Table'].scale,
          {
            x: 1,
            y: 1,
            z: 1,
            ease: 'power3.out',
            duration: 0.5,
          },
          '>-0.1'
        )
        .to(
          [
            this.roomChildren['Keyboard'].scale,
            this.roomChildren['Mouse'].scale,
            this.roomChildren['Tree'].scale,
            this.roomChildren['Computer'].scale,
            this.roomChildren['Computer_screen'].scale,
            this.roomChildren['Chair_bottom'].scale,
            this.roomChildren['Chair_top'].scale,
            this.roomChildren['Image_deck'].scale,
          ],
          {
            x: 1,
            y: 1,
            z: 1,
            ease: 'power3.out',
            duration: 0.5,
          },
          '>-0.1'
        )
        .to(
          this.roomChildren['Chair_top'].rotation,
          {
            y: 16 * Math.PI - Math.PI / 2,
            duration: 2,
          },
          '>-0.1'
        )
        .set(
          this.roomChildren['Image'].scale,
          {
            x: 1,
            y: 1,
            z: 1,
          },
          '<-.1'
        )
        .from(
          this.roomChildren['Image'].position,
          {
            z: 10,
            x: 10,
            ease: 'power1.out',
            duration: 1,
          },
          '<-.1'
        )
        .to('#scroll-icon, #header', {
          opacity: 1,
          pointerEvents: 'auto',
          onComplete: resolve,
        })
    })
  }

  async onScroll(e) {
    if (e.deltaY > 0) {
      this.removeEventListeners()
      await this.playSecondIntro()
      this.emit('enableScroll')
    }
  }

  onTouch(e) {
    this.initalY = e.touches[0].clientY
  }

  async onTouchMove(e) {
    let currentY = e.touches[0].clientY
    let difference = this.initalY - currentY
    if (difference > 0) {
      this.removeEventListeners()
      await this.playSecondIntro()
      this.emit('enableScroll')
    }
    this.intialY = null
  }

  removeEventListeners() {
    window.removeEventListener('wheel', this.scrollOnceEvent)
    window.removeEventListener('touchstart', this.touchStart)
    window.removeEventListener('touchmove', this.touchMove)
  }

  async playIntro() {
    await this.firstIntro()
    this.scrollOnceEvent = this.onScroll.bind(this)
    this.touchStart = this.onTouch.bind(this)
    this.touchMove = this.onTouchMove.bind(this)
    window.addEventListener('wheel', this.scrollOnceEvent)
    window.addEventListener('touchstart', this.touchStart)
    window.addEventListener('touchmove', this.touchMove)
  }
  async playSecondIntro() {
    await this.secondIntro()
    document.querySelector('#app').style.overflow = 'visible'
  }
}

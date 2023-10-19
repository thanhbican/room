import ASScroll from '@ashthornton/asscroll'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import Viewer from '../Viewer'

export default class Controls {
  constructor() {
    this.viewer = new Viewer()
    this.scene = this.viewer.scene
    this.resources = this.viewer.resources
    this.camera = this.viewer.camera
    this.sizes = this.viewer.sizes
    this.room = this.viewer.world.room.actualRoom
    this.rectLight = this.room.children.find(
      (child) => child.type === 'RectAreaLight'
    )

    this.circle1 = this.viewer.world.floor.circle1
    this.circle2 = this.viewer.world.floor.circle2
    this.circle3 = this.viewer.world.floor.circle3

    gsap.registerPlugin(ScrollTrigger)

    if (
      !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      this.setSmoothScroll()
    }
    this.setScrollTrigger()
  }

  setupASScroll() {
    // https://github.com/ashthornton/asscroll
    const asscroll = new ASScroll({
      disableRaf: true,
    })

    gsap.ticker.add(asscroll.update)

    ScrollTrigger.defaults({
      scroller: asscroll.containerElement,
    })

    ScrollTrigger.scrollerProxy(asscroll.containerElement, {
      scrollTop(value) {
        if (arguments.length) {
          asscroll.currentPos = value
          return
        }
        return asscroll.currentPos
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        }
      },
      fixedMarkers: true,
    })

    asscroll.on('update', ScrollTrigger.update)
    ScrollTrigger.addEventListener('refresh', asscroll.resize)

    requestAnimationFrame(() => {
      asscroll.enable({
        newScrollElements: document.querySelectorAll(
          '.gsap-marker-start, .gsap-marker-end, [asscroll]'
        ),
      })
    })
    return asscroll
  }

  setSmoothScroll() {
    this.asscroll = this.setupASScroll()
  }

  setScrollTrigger() {
    this.mm = gsap.matchMedia()

    // Desktop
    this.mm.add('(min-width: 768px)', () => {
      // First timeline
      this.firstTimeline = new gsap.timeline({
        scrollTrigger: {
          trigger: '#first-margin',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      })

      this.firstTimeline.to(this.room.position, {
        x: () => this.sizes.width * 0.001,
      })

      // Second timeline
      this.secondTimeline = new gsap.timeline({
        scrollTrigger: {
          trigger: '#second-margin',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      })

        .to(
          this.room.position,
          {
            x: () => 0,
            z: () => this.sizes.height * 0.003,
          },
          'same'
        )

        .to(
          this.room.scale,
          {
            x: 0.5,
            y: 0.5,
            z: 0.5,
          },
          'same'
        )

        .to(
          this.rectLight,
          {
            width: 0.5 * 5,
            height: 0.5 * 5,
          },
          'same'
        )

      // Third timeline
      this.thirdTimeline = new gsap.timeline({
        scrollTrigger: {
          trigger: '#third-margin',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      }).to(this.camera.orthographicCamera.position, {
        x: -4.5,
        y: 3,
        z: 10.1,
      })
    })

    // Mobile

    this.mm.add('(max-width: 767px)', () => {
      console.log('z')
      // Reset
      // this.room.scale.set(0.08, 0.08, 0.08)
      this.rectLight.width = 0.3
      this.rectLight.height = 0.3
      // First timeline
      this.firstTimeline = new gsap.timeline({
        scrollTrigger: {
          trigger: '#first-margin',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      }).to(this.room.scale, {
        x: 0.11,
        y: 0.11,
        z: 0.11,
      })

      // Third timeline
      this.secondTimeline = new gsap.timeline({
        scrollTrigger: {
          trigger: '#second-margin',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      })

        .to(
          this.room.position,
          {
            x: () => 0,
            z: () => this.sizes.height * 0.003,
          },
          'same'
        )

        .to(
          this.room.scale,
          {
            x: 0.5,
            y: 0.5,
            z: 0.5,
          },
          'same'
        )

        .to(
          this.rectLight,
          {
            width: 0.5 * 5,
            height: 0.5 * 5,
          },
          'same'
        )
        .to(
          this.camera.orthographicCamera.position,
          {
            x: -3,
            y: 6,
            z: 7.1,
          },
          'same'
        )

      // Third timeline
      this.thirdTimeline = new gsap.timeline({
        scrollTrigger: {
          trigger: '#third-margin',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      }).to(this.camera.orthographicCamera.position, {
        x: -2,
        y: 3,
        z: 13.1,
      })
    })

    // ALl
    this.mm.add('', () => {
      // circle
      this.firstTimeline = new gsap.timeline({
        scrollTrigger: {
          trigger: '#first-margin',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      }).to(this.circle1.scale, {
        x: 3,
        y: 3,
        z: 3,
      })

      // Second timeline
      this.secondTimeline = new gsap.timeline({
        scrollTrigger: {
          trigger: '#second-margin',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      }).to(this.circle2.scale, {
        x: 3,
        y: 3,
        z: 3,
        onComplete: () => {
          const screen = this.room.children.find(
            (child) => child.name === 'Computer_screen'
          )
          if (screen) {
            screen.visible = true
          }
        },
      })

      // Third timeline
      this.thirdTimeline = new gsap.timeline({
        scrollTrigger: {
          trigger: '#third-margin',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      }).to(this.circle3.scale, {
        x: 3,
        y: 3,
        z: 3,
      })
    })

    // progress bar
    this.sections = document.querySelectorAll('section#content')
    this.sections.forEach((section) => {
      this.progressWrapper = section.querySelector('#progress-wrapper')
      this.progress = section.querySelector('#progress')
      if (section.classList.contains('ml-auto')) {
        gsap.to(section, {
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'top top',
            scrub: 0.6,
          },
          borderTopLeftRadius: '10',
        })
        gsap.to(section, {
          scrollTrigger: {
            trigger: section,
            start: 'bottom bottom',
            end: 'bottom top',
            scrub: 0.6,
          },
          borderBottomLeftRadius: '650',
        })
        gsap.from(this.progress, {
          scaleY: 0,
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.4,
            pin: this.progressWrapper,
            pinSpacing: false,
          },
        })
      } else {
        gsap.to(section, {
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'top top',
            scrub: 0.6,
          },
          borderTopRightRadius: '10',
        })
        gsap.to(section, {
          scrollTrigger: {
            trigger: section,
            start: 'bottom bottom',
            end: 'bottom top',
            scrub: 0.6,
          },
          borderBottomRightRadius: '650',
        })
        gsap.from(this.progress, {
          scaleY: 0,
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.4,
            pin: this.progressWrapper,
            pinSpacing: false,
          },
        })
      }

      // Dudes timeline
      this.dudeTimeline = new gsap.timeline({
        scrollTrigger: {
          trigger: '#third-margin',
          start: 'center center',
        },
      })

      const dupe = this.room.children.find(
        (child) => child.name === 'Dupe_floor'
      )

      if (dupe) {
        this.dudeTimeline
          .set(dupe.scale, {
            x: 1,
            y: 1,
            z: 1,
          })
          .to(dupe.position, {
            x: -3.3935699462890625,
            z: 4.198840141296387,
            duration: 0.3,
          })
      }

      const orders = [
        'Image_deck',
        'Image',
        'Floor1',
        'Floor2',
        'Floor3',
        'Land',
        'Flower1',
        'Flower2',
      ]
      const ordersAnimation = orders.map((order) => {
        const child = this.room.children.find((child) => child.name === order)
        if (child) {
          return gsap.to(child.scale, {
            x: 1,
            y: 1,
            z: 1,
            duration: 0.3,
            ease: 'back.out(3)',
          })
        }
      })

      ordersAnimation.forEach((child) => {
        this.dudeTimeline.add(child, '-=0.2')
      })
    })
  }

  resize() {}

  update() {}
}

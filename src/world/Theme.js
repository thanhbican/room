import { EventEmitter } from 'events'
import gsap from 'gsap'

export default class Theme extends EventEmitter {
  constructor() {
    super()

    this.theme = 'light'
    this.buttonToggle = document.querySelector('#button-toggle')
    this.lightButton = document.querySelector('#light')
    this.darkButton = document.querySelector('#dark')
    this.circleToggle = document.querySelector('#toggle-circle')

    this.switchTheme()
  }

  switchTheme() {
    this.buttonToggle.addEventListener('click', () => {
      this.theme = this.theme === 'light' ? 'dark' : 'light'
      this.emit('switch', this.theme)

      if (this.theme === 'light') {
        this.lightTheme()
      } else {
        this.darkTheme()
      }
    })

    this.lightButton.addEventListener('click', () => {
      this.emit('switch', 'light')
      this.lightTheme()
    })
    this.darkButton.addEventListener('click', () => {
      this.emit('switch', 'dark')
      this.darkTheme()
    })
  }

  lightTheme() {
    document.body.classList.add('light-theme')
    document.body.classList.remove('dark-theme')
    this.circleToggle.classList.remove('bg-background')
    this.circleToggle.classList.add('bg-yellow')
    gsap.to(this.circleToggle, {
      left: '0.5rem',
    })
  }
  darkTheme() {
    document.body.classList.remove('light-theme')
    document.body.classList.add('dark-theme')
    this.circleToggle.classList.remove('bg-yellow')
    this.circleToggle.classList.add('bg-background')
    gsap.to(this.circleToggle, {
      left: '1.8rem',
    })
  }
}

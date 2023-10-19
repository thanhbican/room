const textAnimation = (element) => {
  element.innerHTML = element.innerText
    .split('')
    .map((char) => {
      if (char === ' ') {
        return `<span>&nbsp;</span>`
      }
      return `<span style="transform: translateY(100%)">${char}</span>`
    })
    .join('')
}

export default textAnimation

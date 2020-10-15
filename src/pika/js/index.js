import styleString from './style.js'

class Player {
  constructor(options){
    this.timer = null
    this.inteveral = 100
    this.currentIndex = 0

    this.styleEle = document.querySelectorAll(options.styleQuery)[0]
    this.sourceCodeEle = document.querySelectorAll(options.sourceCodeQuery)[0]

    this.btnPause = document.querySelectorAll(options.btnPause)[0]
    this.btnPlay = document.querySelectorAll(options.btnPlay)[0]
    this.btnSlow = document.querySelectorAll(options.btnSlow)[0]
    this.btnNormal = document.querySelectorAll(options.btnNormal)[0]
    this.btnFast = document.querySelectorAll(options.btnFast)[0]

    this.init()
  }
  init() {
    this.bindEvents()
    this.timer = setInterval(() => {
      this.play()
    }, this.inteveral);
  }
  bindEvents() {
    this.btnPause.onclick = () => this.pause()
    this.btnPlay.onclick = () => this.play()
    this.btnSlow.onclick = () => this.slowSpeed()
    this.btnNormal.onclick = () => this.normalSpeed()
    this.btnFast.onclick = () => this.fastSpeed()
  }
  play() {
    if( this.currentIndex === styleString.length ) {
      clearInterval(this.timer)
      this.timer = null
      return
    }
    if(!this.timer) {
      this.init()
    }
    this.sourceCodeEle.innerText += styleString.charAt(this.currentIndex)
    this.styleEle.innerHTML += styleString.charAt(this.currentIndex)

    this.sourceCodeEle.scrollTop = this.sourceCodeEle.scrollHeight

    this.currentIndex++
  }
  pause() {
    clearInterval(this.timer)
    this.timer = null
  }
  slowSpeed() {
    this.pause()
    this.inteveral = 300
    this.play()
  }
  normalSpeed() {
    if(this.timer === 100) return
    this.pause()
    this.inteveral = 100
    this.play()
  }
  fastSpeed() {
    this.pause()
    this.inteveral = 1
    this.play()
  }


}

export default new Player({
  styleQuery: '#demo2',
  sourceCodeQuery: '#demo',

  btnPause: '#btnPause',
  btnPlay: '#btnPlay',
  btnSlow: '#btnSlow',
  btnNormal: '#btnNormal',
  btnFast: '#btnFast',
})
import styleString from './style.js'

const INTERVAL = {
  FAST: 1,
  NORMAL: 100,
  SLOW: 200,
}
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
    if(this.timer === INTERVAL.SLOW) return
    this.pause()
    this.inteveral = INTERVAL.SLOW
    this.play()
  }
  normalSpeed() {
    if(this.timer === INTERVAL.NORMAL) return
    this.pause()
    this.inteveral = INTERVAL.NORMAL
    this.play()
  }
  fastSpeed() {
    if(this.timer === INTERVAL.FAST) return
    this.pause()
    this.inteveral = INTERVAL.FAST
    this.play()
  }


}

export default new Player({
  styleQuery: '#styleTag',
  sourceCodeQuery: '#code',

  btnPause: '#btnPause',
  btnPlay: '#btnPlay',
  btnSlow: '#btnSlow',
  btnNormal: '#btnNormal',
  btnFast: '#btnFast',
})
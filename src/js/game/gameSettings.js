import gameMaps from './gameMaps'

class GameSettings {
  constructor() {
    this.width = 640
    this.height = 480
    this.blockSize = 40
    this.canvasDataAttr = 'gametable'
    this.gameMaps = gameMaps
    this.barrierColor = 'black'
    this.halfBlockSize = this.blockSize / 2
    this.canvas = document.querySelector(`[data-${this.canvasDataAttr}]`)
    this.ctx = this.canvas.getContext('2d')
  }
}

export default GameSettings

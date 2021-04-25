class GameTable {
  constructor(game) {
    this.game = game
    this.width = this.game.gameSettings.width
    this.height = this.game.gameSettings.height
    this.barrier = undefined
    this.gameMaps = this.game.gameSettings.gameMaps
    this.blockSize = this.game.gameSettings.blockSize
    this.barrierColor = this.game.gameSettings.barrierColor
    this.halfBlockSize = this.game.gameSettings.halfBlockSize
    this.canvas = this.game.gameSettings.canvas
    this.ctx = this.game.gameSettings.ctx
    this.Coins = this.game.Coins
    this.initGameTable()
  }

  initGameTable() {
    this.choseBarrier()
    this.canvas.height = this.height
    this.canvas.width = this.width
    this.coins = new this.Coins(this)
    this.render()
  }

  choseBarrier() {
    const gameMapsLength = this.gameMaps.length
    const randomMapIndex = Math.floor(Math.random() * gameMapsLength)
    this.barrier = this.gameMaps[randomMapIndex]
  }

  render() {
    let isAllCoinsReached = true
    for (let i = 0; i < this.barrier.length; i += 1) {
      for (let j = 0; j < this.barrier[0].length; j += 1) {
        if (this.barrier[i][j]) {
          this.ctx.fillStyle = this.barrierColor
          this.ctx.fillRect(j * this.blockSize, i * this.blockSize, this.blockSize, this.blockSize)
        } else {
          const currentCoinAvailable = this.coins.render({ i, j })
          if (isAllCoinsReached && currentCoinAvailable) isAllCoinsReached = false
        }
      }
    }
    return isAllCoinsReached
  }

  clear() {
    this.ctx.clearRect(0, 0, this.width, this.height)
  }
}

export default GameTable

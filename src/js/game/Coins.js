import { getDistanceBetweenTwoUnits } from '../helpers/helpers'

class Coins {
  constructor(gameTable) {
    this.gameTable = gameTable
    this.coinsSizes = {
      smal: 0.10,
      big: 0.3,
    }
    this.coinsMap = []
    this.coinsColor = 'gold'
    this.bigCoinRandom = 0.8
    this.startAngle = 0
    this.counterclockwise = 2 * Math.PI
    this.animationSpeed = 2
    this.init()
  }

  init() {
    const { barrier } = this.gameTable

    for (let i = 0; i < barrier.length; i += 1) {
      for (let j = 0; j < barrier[0].length; j += 1) {
        if (!this.coinsMap[i]) this.coinsMap[i] = []
        if (!barrier[i][j]) {
          const isActive = true
          const x = j * this.gameTable.blockSize + this.gameTable.halfBlockSize
          const y = i * this.gameTable.blockSize + this.gameTable.halfBlockSize
          const big = this.isBig({ x, y })
          const radius = this.gameTable.halfBlockSize * (big ? this.coinsSizes.big : this.coinsSizes.smal)

          this.coinsMap[i][j] = {
            isActive, x, y, big, radius,
          }
        }
      }
    }
  }

  isBig(currentCoin) {
    return Math.random() > this.bigCoinRandom
    && this.coinsMap.every((row) => row.every((col) => {
      if (!col.big) return true
      return getDistanceBetweenTwoUnits(col, currentCoin) > this.gameTable.blockSize * 3
    }))
  }

  render({ i, j }) {
    this.gameTable.ctx.fillStyle = this.coinsColor
    const currentCoin = this.coinsMap[i][j]

    if (currentCoin.isActive) {
      if (this.coinIsReached(currentCoin)) {
        // eslint-disable-next-line no-param-reassign
        currentCoin.isActive = false
      }
      if (!currentCoin.big || (currentCoin.big && this.animation())) {
        this.gameTable.ctx.beginPath()
        this.gameTable.ctx.moveTo(currentCoin.x, currentCoin.y)
        this.gameTable.ctx.arc(currentCoin.x, currentCoin.y, currentCoin.radius, this.startAngle, this.counterclockwise)
        this.gameTable.ctx.fill()
      }
    }
    return currentCoin.isActive
  }

  animation() {
    const animationDuration = Math.floor(60 / (this.animationSpeed * 2))
    if (Math.floor(this.gameTable.game.countOfFrame / animationDuration) % 2 === 0) return true
    return false
  }

  coinIsReached(currentCoin) {
    if (!this.gameTable.game.hero) return false
    if (getDistanceBetweenTwoUnits(this.gameTable.game.hero, currentCoin) < currentCoin.radius) {
      if (currentCoin.big) {
        this.gameTable.game.makeHeroForce()
        this.gameTable.game.gamePanel.updateScore(50)
        return true
      }
      this.gameTable.game.gamePanel.updateScore(10)
      return true
    }
    return false
  }
}

export default Coins

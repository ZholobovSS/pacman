class GameUnit {
  constructor({ game, power = 'weak', type }) {
    this.game = game
    this.dx = 0
    this.dy = 0
    this.speed = 2
    this.startAngle = 0
    this.x = undefined
    this.y = undefined
    this.canMove = false
    this.direction = undefined
    this.counterclockwise = Math.PI * 2
    this.radius = (this.game.gameTable.blockSize / 2) * 0.8
    this.flashingThreshold = 60
    this.power = power
    this.type = type
    this.weakColor = 'blue'
  }

  render() {
    this.game.gameTable.ctx.fillStyle = this.color
    this.game.gameTable.ctx.beginPath()
    this.game.gameTable.ctx.moveTo(this.x, this.y)
    this.game.gameTable.ctx.arc(this.x, this.y, this.radius, this.startAngle, this.counterclockwise)
    this.game.gameTable.ctx.lineTo(this.x, this.y)
    this.game.gameTable.ctx.closePath()
    this.game.gameTable.ctx.fill()
  }

  makeWeak() {
    if (this.type === 'enemy' && this.power !== 'weak') {
      this.color = this.weakColor
      if (this.speed === 2) this.speed /= 2
    }
    this.power = 'weak'
  }

  makeStrong() {
    if (this.type === 'enemy' && this.type !== 'strong') {
      this.color = this.originalColor
      if (this.speed === 1) this.speed *= 2
    }
    this.power = 'strong'
  }

  shouldCalcNewDirection() {
    const centerX = Math.floor(this.x / this.game.gameTable.blockSize)
      * this.game.gameTable.blockSize
      + this.game.gameTable.halfBlockSize
    const centerY = Math.floor(this.y / this.game.gameTable.blockSize)
      * this.game.gameTable.blockSize
      + this.game.gameTable.halfBlockSize
    if (this.x === centerX && this.y === centerY) {
      return true
    }
    return false
  }

  calcNewCoordinates() {
    switch (this.direction) {
      case 'up':
        this.y -= this.speed
        break
      case 'down':
        this.y += this.speed
        break
      case 'left':
        this.x -= this.speed
        break
      case 'right':
        this.x += this.speed
        break
      default:
        break
    }
    this.coordinateCorrection()
  }

  coordinateCorrection() {
    if (this.speed % 2 === 0) {
      if (this.x % 2 === 1) {
        if (this.direction === 'left') this.x += 1
        if (this.direction === 'right') this.x -= 1
      }
      if (this.y % 2 === 1) {
        if (this.direction === 'up') this.y += 1
        if (this.direction === 'down') this.y -= 1
      }
    }
  }

  detectWalls() {
    const { blockSize } = this.game.gameTable
    const halfBlockSize = this.game.gameTable.halfBlockSize + 1

    const up = [
      Math.floor(this.x / blockSize),
      Math.floor((this.y - halfBlockSize) / blockSize),
    ]
    const down = [
      Math.floor(this.x / blockSize),
      Math.floor((this.y + halfBlockSize) / blockSize),
    ]
    const left = [
      Math.floor((this.x - halfBlockSize) / blockSize),
      Math.floor(this.y / blockSize),
    ]
    const right = [
      Math.floor((this.x + halfBlockSize) / blockSize),
      Math.floor(this.y / blockSize),
    ]

    const wallInfo = {
      up: !this.game.gameTable.barrier[up[1]][up[0]],
      down: !this.game.gameTable.barrier[down[1]][down[0]],
      left: !this.game.gameTable.barrier[left[1]][left[0]],
      right: !this.game.gameTable.barrier[right[1]][right[0]],
    }

    return wallInfo
  }

  possibleDirections() {
    const wallInfo = this.detectWalls()
    return Object.keys(wallInfo).filter((el) => wallInfo[el])
  }
}

export default GameUnit

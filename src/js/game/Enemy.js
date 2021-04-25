import Eyes from './Eyes'
import GameUnit from './GameUnit'

class Enemy extends GameUnit {
  constructor(game) {
    super({ game, power: 'strong', type: 'enemy' })
    this.colorsList = [
      'red',
      'pink',
      'purple',
      'cyan',
      'silver',
    ]
    this.originalColor = this.colorsList[Math.floor(Math.random() * this.colorsList.length)]
    this.color = this.originalColor
    this.eyes = new Eyes(this)
    this.initEnemy()
  }

  // eslint-disable-next-line consistent-return
  initEnemy() {
    for (let i = 0; i < this.game.gameTable.barrier.length; i += 1) {
      for (let j = 0; j < this.game.gameTable.barrier[0].length; j += 1) {
        if (!this.game.gameTable.barrier[i][j] && Math.random() > 0.95) {
          this.x = j * this.game.gameTable.blockSize + this.game.gameTable.halfBlockSize
          this.y = i * this.game.gameTable.blockSize + this.game.gameTable.halfBlockSize
          return this.renderEnemy()
        }
        if (i + 1 === this.game.gameTable.barrier.length
          && j + 1 === this.game.gameTable.barrier[0].length
          && (this.x === undefined && this.y === undefined)) {
          this.initEnemy()
        }
      }
    }
  }

  flashing() {
    if (this.game.superiority < this.flashingThreshold && this.game.superiority && this.power === 'weak') {
      const flashSection = Math.floor(this.game.superiority / 10)
      if (flashSection % 2 === 1) this.color = this.originalColor
      else this.color = this.weakColor
    }
  }

  renderEnemy() {
    this.calcNewDirection()
    this.calcNewCoordinates()
    this.flashing()
    this.render()
    this.eyes.render()
  }

  calcNewDirection() {
    if (this.shouldCalcNewDirection() || !this.direction) {
      let newDirections = this.possibleDirections()
      if (newDirections.length === 1) {
        // eslint-disable-next-line prefer-destructuring
        this.direction = newDirections[0]
        return
      }
      this.swapCurrentDirection()
      newDirections = newDirections.filter((el) => el !== this.direction)
      this.direction = newDirections[Math.floor(Math.random() * newDirections.length)]
    }
  }

  static killEnemy(enemyArmy, index) {
    enemyArmy.splice(index, 1)
  }

  swapCurrentDirection() {
    switch (this.direction) {
      case 'up':
        this.direction = 'down'
        break
      case 'down':
        this.direction = 'up'
        break
      case 'left':
        this.direction = 'right'
        break
      case 'right':
        this.direction = 'left'
        break
      default:
        break
    }
  }
}

export default Enemy

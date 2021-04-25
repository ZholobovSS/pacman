import GameUnit from './GameUnit'
import { getDistanceBetweenTwoUnits, isArrayHasIntersection } from '../helpers/helpers'
import HeroMouth from './HeroMouth'

class Hero extends GameUnit {
  constructor(game, lifesCount = 3) {
    super({ game, power: 'weak', type: 'hero' })
    this.color = 'yellow'
    this.heroMoveHandler = this.heroMoveHandler.bind(this)
    this.directionList = []
    this.startAngle = 0
    this.killStreak = 1
    this.counterclockwise = Math.PI * 2
    this.lifes = lifesCount
    this.heroMouth = new HeroMouth(this)
    this.initHero()
  }

  takeLifeAway() {
    this.lifes -= 1
    this.game.gamePanel.renderLifes()
  }

  // eslint-disable-next-line consistent-return
  initHero() {
    for (let i = 0; i < this.game.gameTable.barrier.length; i += 1) {
      for (let j = 0; j < this.game.gameTable.barrier[0].length; j += 1) {
        if (!this.game.gameTable.barrier[i][j] && Math.random() > 0.95) {
          this.x = j * this.game.gameTable.blockSize + this.game.gameTable.halfBlockSize
          this.y = i * this.game.gameTable.blockSize + this.game.gameTable.halfBlockSize
          if (this.detectEnemysAround()) {
            this.addEventListeners()
            return this.renderHero()
          }
          return this.initHero()
          // return this.renderEnemy()
        }
        if (i + 1 === this.game.gameTable.barrier.length
          && j + 1 === this.game.gameTable.barrier[0].length
          && (this.x === undefined && this.y === undefined)) {
          return this.initHero()
        }
      }
    }
  }

  renderHero() {
    this.calcNewDirection()
    this.calcNewCoordinates()
    this.heroMouth.changeMouth()
    this.render()
  }

  calcNewDirection() {
    if (this.shouldCalcNewDirection() || !this.direction) {
      const newDirections = this.possibleDirections()
      if (!this.directionList.length) {
        this.direction = undefined
        return
      }
      if (isArrayHasIntersection(this.directionList, newDirections)) {
        if (!this.direction) {
          // eslint-disable-next-line prefer-destructuring
          this.direction = this.directionList[0]
          return
        }
        if (newDirections.includes(this.directionList[1])) {
          this.directionList.shift()
          // eslint-disable-next-line prefer-destructuring
          this.direction = this.directionList[0]
        }
      } else {
        this.direction = undefined
        this.directionList = []
      }
    }
  }

  detectEnemysAround() {
    // eslint-disable-next-line max-len
    return this.game.enemyArmy.every((enemy) => getDistanceBetweenTwoUnits(this, enemy) > this.game.gameTable.blockSize * 3)
  }

  isDead() {
    const isDead = this.game.enemyArmy.some((enemy, i) => {
      const criticalDistance = getDistanceBetweenTwoUnits(this, enemy)
      if (this.game.superiority) {
        if (enemy.power === 'strong') return criticalDistance < this.radius
        if (criticalDistance < this.radius) {
          this.game.gamePanel.killScoreBonus()
          this.game.hero.killStreak += 1
          this.game.Enemy.killEnemy(this.game.enemyArmy, i)
        }

        return false
      }
      return criticalDistance < this.radius
    })

    if (isDead) this.removeEventListeners()

    return isDead
  }

  addEventListeners() {
    window.addEventListener('keydown', this.heroMoveHandler)
  }

  updateDirrectionList(newDirection) {
    if (this.directionList.length === 4) return
    if (!this.directionList.length && this.possibleDirections().includes(newDirection)) {
      this.directionList.push(newDirection)
      return
    }
    if (this.directionList[this.directionList.length - 1] === newDirection) return
    this.directionList.push(newDirection)
  }

  heroMoveHandler(e) {
    const arrowButtons = ['ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight']
    if (arrowButtons.includes(e.key)) {
      const newDirection = e.key.replace(/^(Arrow)(.*)$/i, '$2').toLowerCase()
      this.updateDirrectionList(newDirection)
    }
  }

  removeEventListeners() {
    window.removeEventListener('keydown', this.heroMoveHandler)
  }
}

export default Hero

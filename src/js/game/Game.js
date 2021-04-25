class Game {
  constructor(options) {
    this.enemyArmy = []
    this.Hero = options.Hero
    this.Enemy = options.Enemy
    this.gameMaps = options.gameMaps
    this.GameTable = options.GameTable
    this.update = this.update.bind(this)
    this.Coins = options.Coins
    this.GamePanel = options.GamePanel
    this.GameSettings = options.GameSettings
    this.Ee = options.Ee
    this.countOfEnemies = 4
    this.countOfFrame = 0
    this.superiority = 0
    this.checkEnemyArmyPopulation = this.checkEnemyArmyPopulation.bind(this)
  }

  start() {
    this.gameSettings = new this.GameSettings()
    this.gameTable = new this.GameTable(this)
    this.enemyArmy = new Array(this.countOfEnemies).fill().map(() => new this.Enemy(this))
    this.hero = new this.Hero(this)
    this.ee = new this.Ee()
    this.gamePanel = new this.GamePanel(this)
    this.ee.on('checkEnemyArmyPopulation', this.checkEnemyArmyPopulation)
    this.update()
  }

  restart() {
    this.hero.takeLifeAway()

    if (!this.hero.lifes) {
      this.gamePanel.endGame()
      this.ee.clearAll()
      return
    }
    this.enemyArmy = new Array(this.countOfEnemies).fill().map(() => new this.Enemy(this))
    this.hero = new this.Hero(this, this.hero.lifes)
    this.update()
  }

  nextLvl() {
    this.gamePanel.nextLvl()
  }

  startNextLvl() {
    this.gameTable = new this.GameTable(this)
    this.enemyArmy = new Array(this.countOfEnemies).fill().map(() => new this.Enemy(this))
    this.hero = new this.Hero(this, this.hero.lifes)
    this.update()
  }

  checkEnemyArmyPopulation() {
    const enemyDamage = this.countOfEnemies - this.enemyArmy.length
    if (enemyDamage) {
      for (let index = 0; index < enemyDamage; index += 1) {
        setTimeout(() => {
          this.enemyArmy.push(new this.Enemy(this))
        }, Math.floor(Math.random() * 2e3 + 1e3))
      }
    }
  }

  makeHeroForce() {
    if (!this.superiority) {
      this.enemyArmy.forEach((enemy) => enemy.makeWeak())
    }
    this.superiority += 200
  }

  checkForceBalance() {
    if (this.superiority && this.superiority - 1 === 0) {
      this.superiority -= 1
      this.hero.killStreak = 1
      this.restoreForceBalance()
    }
    if (this.superiority) this.superiority -= 1
  }

  restoreForceBalance() {
    this.ee.emit('checkEnemyArmyPopulation')
    this.enemyArmy.forEach((enemy) => enemy.makeStrong())
  }

  update() {
    this.countOfFrame = this.countOfFrame > 60 ? 0 : this.countOfFrame += 1
    this.gameTable.clear()
    const isAllCoinsReached = this.gameTable.render()
    this.checkForceBalance()
    this.hero.renderHero()
    this.enemyArmy.forEach((enemy) => enemy.renderEnemy())
    const endGame = this.endGame()
    if (!endGame && !isAllCoinsReached) requestAnimationFrame(this.update)
    else if (endGame) this.restart()
    else this.nextLvl()
  }

  endGame() {
    return this.hero.isDead()
  }
}

export default Game

const classLists = {
  flipBack: 'flip-horizontal-bottom-fwd',
  flipFwd: 'flip-horizontal-bottom-rvs',
  fadeTop: 'fade-top',
}

const endGameTemplate = `<div class="info">
<span>
  End Game
</span>
<span class="addInfo mt-1 mb-3">
  <span>Score:</span>&nbsp;<span data-finalScore></span>
</span>
<button data-newGameBtn>Start new</button>
</div>`

const nextLvlTemplate = `<div class="info">
<span class="mb-2">
  LVL UP
</span>
<span class="addInfo mb-1">
  <span>Score:</span>&nbsp;<span data-finalScore></span>
</span>
<span class="addInfo mb-3 d-flex align-items-center">
  <span data-prevLvl class="fs-2"></span>
  <i class="fas fa-chevron-right fa-xs lvlDelimiter"></i>
  <span data-nextLvl class="fs-4"></span>
</span>
<button data-nextLvlBtn>Next lvl</button>
</div>`

class GamePanel {
  constructor(game) {
    this.game = game
    this.$gamePanel = document.querySelector('[data-controlPanel]')
    this.$score = document.querySelector('[data-score]')
    this.$lifes = document.querySelector('[data-lifeWr]')
    this.$gameTableWr = document.querySelector('[data-gameTableWr]')
    this.$gameTableBack = document.querySelector('[data-gameTableBack]')
    this.templates = {
      endGameTemplate,
      nextLvlTemplate,
    }
    this.classLists = classLists
    this.level = 1
    this.score = 0
    this.killEnemyBonus = 200
    this.init()
  }

  init() {
    this.render()
    this.startNewGameHandler = this.startNewGameHandler.bind(this)
    this.startNewLvl = this.startNewLvl.bind(this)
  }

  addEventListeners() {
    this.$newGameBtn?.addEventListener('click', this.startNewGameHandler)
    this.$nextLvlBtn?.addEventListener('click', this.startNewLvl)
  }

  startNewGameHandler() {
    this.addClass(this.$gameTableWr, this.classLists.flipFwd)
    setTimeout(() => {
      this.removeClass(this.$gamePanel, this.classLists.fadeTop)
      this.removeClass(this.$gameTableWr, this.classLists.flipBack)
      this.removeClass(this.$gameTableWr, this.classLists.flipFwd)
      this.$gameTableBack.innerHTML = ''
      this.game.start()
      this.removeEventListeners()
    }, 1e3)
  }

  startNewLvl() {
    this.addClass(this.$gameTableWr, this.classLists.flipFwd)
    setTimeout(() => {
      this.removeClass(this.$gamePanel, this.classLists.fadeTop)
      this.removeClass(this.$gameTableWr, this.classLists.flipBack)
      this.removeClass(this.$gameTableWr, this.classLists.flipFwd)
      this.$gameTableBack.innerHTML = ''
      this.game.startNextLvl()
      this.removeEventListeners()
    }, 1e3)
  }

  removeEventListeners() {
    this.$newGameBtn?.removeEventListener('click', this.startNewGameHandler)
    this.$nextLvlBtn?.removeEventListener('click', this.startNewLvl)
  }

  render() {
    this.renderScore()
    this.renderLifes()
  }

  prettyScore() {
    return this.score.toLocaleString('ru-RU')
  }

  renderScore(type = 'regular') {
    switch (type) {
      case 'final':
        this.$finalScore.innerText = this.prettyScore()
        break
      default:
        this.$score.innerText = this.prettyScore()
    }
  }

  renderLifes() {
    const lifesCount = this.game.hero.lifes
    this.$lifes.innerHTML = ''
    for (let i = 0; i < lifesCount; i += 1) {
      this.$lifes.insertAdjacentHTML('beforeend', '<i class="fas fa-heart fa-2x"></i>')
    }
  }

  updateScore(count = 1) {
    this.score += count
    this.renderScore()
  }

  killScoreBonus() {
    this.score += this.killEnemyBonus * this.game.hero.killStreak
    this.renderScore()
  }

  // eslint-disable-next-line class-methods-use-this
  removeClass(el, className) {
    el.classList.remove(className)
  }

  // eslint-disable-next-line class-methods-use-this
  addClass(el, className) {
    el.classList.add(className)
  }

  endGameInit() {
    this.$gameTableBack.insertAdjacentHTML('beforeend', this.templates.endGameTemplate)
    this.$finalScore = document.querySelector('[data-finalScore]')
    this.$newGameBtn = document.querySelector('[data-newGameBtn]')
    this.addClass(this.$gamePanel, this.classLists.fadeTop)
    setTimeout(() => {
      this.addClass(this.$gameTableWr, this.classLists.flipBack)
      this.renderScore('final')
      this.addEventListeners()
    }, 5e2)
  }

  endGame() {
    this.endGameInit()
  }

  nextLvlInit() {
    this.level += 1
    this.$gameTableBack.insertAdjacentHTML('beforeend', this.templates.nextLvlTemplate)
    this.$prevLvl = document.querySelector('[data-prevLvl]')
    this.$finalScore = document.querySelector('[data-finalScore]')
    this.$nextLvl = document.querySelector('[data-nextLvl]')
    this.$nextLvlBtn = document.querySelector('[data-nextLvlBtn')
    this.addClass(this.$gamePanel, this.classLists.fadeTop)
    setTimeout(() => {
      this.addClass(this.$gameTableWr, this.classLists.flipBack)
      this.renderScore('final')
      this.$prevLvl.innerText = this.level - 1
      this.$nextLvl.innerText = this.level
      this.addEventListeners()
    }, 5e2)
  }

  nextLvl() {
    this.nextLvlInit()
  }
}

export default GamePanel

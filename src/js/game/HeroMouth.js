import { getPercent } from '../helpers/helpers'

class HeroMouth {
  constructor(hero) {
    this.hero = hero
    this.maoutAnimationPosition = 1
    this.mouthAnimationKoef = 0.25
    this.threshold = 2
    this.mouth = {
      left: {
        start: () => Math.PI * (1 + this.mouthAnimationKoef * this.maoutAnimationPosition),
        end: () => Math.PI * (3 - this.mouthAnimationKoef * this.maoutAnimationPosition),
      },
      right: {
        start: () => Math.PI * (0 + this.mouthAnimationKoef * this.maoutAnimationPosition),
        end: () => Math.PI * (2 - this.mouthAnimationKoef * this.maoutAnimationPosition),
      },
      up: {
        start: () => Math.PI * (1.5 + this.mouthAnimationKoef * this.maoutAnimationPosition),
        end: () => Math.PI * (3.5 - this.mouthAnimationKoef * this.maoutAnimationPosition),
      },
      down: {
        start: () => Math.PI * (0.5 + this.mouthAnimationKoef * this.maoutAnimationPosition),
        end: () => Math.PI * (2.5 - this.mouthAnimationKoef * this.maoutAnimationPosition),
      },
      all: {
        start: 0,
        end: Math.PI * 2,
      },
    }
  }

  changeMouth() {
    if (!this.hero.direction) {
      this.hero.startAngle = this.mouth.all.start
      this.hero.counterclockwise = this.mouth.all.end
      this.maoutAnimationPosition = 1
      return
    }
    this.mouthAnimation()
    this.hero.startAngle = this.mouth[this.hero.direction].start()
    this.hero.counterclockwise = this.mouth[this.hero.direction].end()
  }

  mouthAnimation() {
    let mouthAnimationKoef
    let currentPosition
    let currentSector
    if (['left', 'right'].includes(this.hero.direction)) {
      currentSector = Math.floor(this.hero.x / this.hero.game.gameTable.blockSize)
      currentPosition = this.hero.x - currentSector * this.hero.game.gameTable.blockSize
      mouthAnimationKoef = getPercent(this.hero.game.gameTable.blockSize, this.threshold, currentPosition)
    }
    if (['up', 'down'].includes(this.hero.direction)) {
      currentSector = Math.floor(this.hero.y / this.hero.game.gameTable.blockSize)
      currentPosition = this.hero.y - currentSector * this.hero.game.gameTable.blockSize
      mouthAnimationKoef = getPercent(this.hero.game.gameTable.blockSize, this.threshold, currentPosition)
    }
    if (!this.hero.direction) {
      mouthAnimationKoef = 1
    }
    this.maoutAnimationPosition = mouthAnimationKoef
  }
}

export default HeroMouth

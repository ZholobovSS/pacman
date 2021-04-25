class Eyes {
  constructor(gamePerson) {
    this.gamePerson = gamePerson
    this.iris = {
      color: 'white',
      size: 0.3,
      offset: 0.37,
      radius: this.gamePerson.radius * 0.3,
    }
    this.pupil = {
      color: 'black',
      radius: this.iris.radius * 0.6,
    }
    this.startAngle = 0
    this.counterclockwise = 2 * Math.PI
  }

  render() {
    // iris left Render
    const { gameTable } = this.gamePerson.game
    gameTable.ctx.fillStyle = this.iris.color
    gameTable.ctx.beginPath()
    const irisLeftX = this.gamePerson.x - this.gamePerson.radius * this.iris.offset
    const irisLeftY = this.gamePerson.y - this.gamePerson.radius * this.iris.offset
    gameTable.ctx.arc(irisLeftX, irisLeftY, this.iris.radius, this.startAngle, this.counterclockwise)
    gameTable.ctx.fill()

    // pupil left Render
    gameTable.ctx.fillStyle = this.pupil.color
    gameTable.ctx.beginPath()

    const deltaPupilX = this.deltaPupilPosition(this.gamePerson.direction).x
    const deltaPupilY = this.deltaPupilPosition(this.gamePerson.direction).y

    const pupilLeftX = irisLeftX + deltaPupilX
    const pupilLeftY = irisLeftY + deltaPupilY
    gameTable.ctx.arc(pupilLeftX, pupilLeftY, this.pupil.radius, this.startAngle, this.counterclockwise)
    gameTable.ctx.fill()

    // iris right Render
    gameTable.ctx.fillStyle = this.iris.color
    gameTable.ctx.beginPath()
    const irisRightX = this.gamePerson.x + this.gamePerson.radius * this.iris.offset
    const irisRightY = this.gamePerson.y - this.gamePerson.radius * this.iris.offset
    gameTable.ctx.arc(irisRightX, irisRightY, this.iris.radius, this.startAngle, this.counterclockwise)
    gameTable.ctx.fill()

    // pupil right Render
    gameTable.ctx.fillStyle = this.pupil.color
    gameTable.ctx.beginPath()
    const pupilRightX = irisRightX + deltaPupilX
    const pupilRightY = irisRightY + deltaPupilY
    gameTable.ctx.arc(pupilRightX, pupilRightY, this.pupil.radius, this.startAngle, this.counterclockwise)
    gameTable.ctx.fill()
  }

  deltaPupilPosition(direction) {
    switch (direction) {
      case 'left':
        return {
          x: -(this.iris.radius - this.pupil.radius),
          y: 0,
        }
      case 'right':
        return {
          x: this.iris.radius - this.pupil.radius,
          y: 0,
        }
      case 'up':
        return {
          x: 0,
          y: -(this.iris.radius - this.pupil.radius),
        }
      case 'down':
        return {
          x: 0,
          y: this.iris.radius - this.pupil.radius,
        }
      default:
        return {
          x: 0,
          y: 0,
        }
    }
  }
}

export default Eyes

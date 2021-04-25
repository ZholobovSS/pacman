const events = Symbol('event')

class EventEmitter {
  constructor() {
    this[events] = {}
  }

  get event() {
    return this[events]
  }

  // eslint-disable-next-line class-methods-use-this
  set event(_event) {
    throw new Error('Please set event via "on" method')
  }

  on(event, listener) {
    if (!this[events][event]) this[events][event] = []
    this[events][event].push(listener)

    return () => {
      this.removeListener(event, listener)
    }
  }

  removeListener(event, removeListener) {
    if (this[events][event]) {
      this[events][event] = this[events][event].filter((listener) => listener !== removeListener)
    }
  }

  emit(event, ...data) {
    if (Array.isArray(this[events][event])) {
      this[events][event].forEach((listener) => listener.apply(this, data))
    }
  }

  once(event, listener) {
    const remove = this.on(event, (...data) => {
      listener.apply(this, data)
      remove()
    })
  }

  clearAll() {
    Object.keys(this[events]).forEach((key) => delete this[events][key])
  }
}

export default EventEmitter

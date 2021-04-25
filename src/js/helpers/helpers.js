function debounce(cb, ms) {
  let flag = false
  let timeoutID

  return function inner(...args) {
    if (flag) {
      clearTimeout(timeoutID)
      timeoutID = setTimeout(() => {
        flag = false
        inner.apply(this, args)
      }, ms)
      return
    }

    cb.apply(this, args)

    flag = true
    timeoutID = setTimeout(() => {
      flag = false
    }, ms)
  }
}

function isArrayHasIntersection(arr1, arr2) {
  return !!arr1.filter((el) => arr2.includes(el)).length
}

function getCurrentSection(sectorsCount, currentPosition) {
  return Math.floor(currentPosition / sectorsCount)
}

function getDistanceBetweenTwoUnits(unit1, unit2) {
  return Math.hypot(unit1.x - unit2.x, unit1.y - unit2.y)
}

function getPercent(total, thresholdCount, currentPosition) {
  const sectorsCount = thresholdCount * 2
  const sectorsLength = total / sectorsCount
  const currentSection = getCurrentSection(sectorsLength, currentPosition)
  if (currentSection % 2 === 0) {
    const leftBoundary = sectorsLength * currentSection + sectorsLength
    return (leftBoundary - currentPosition) / sectorsLength
  }
  const rightBoundary = sectorsLength * currentSection + sectorsLength
  return 1 - ((rightBoundary - currentPosition) / sectorsLength)
}

export {
  debounce,
  isArrayHasIntersection,
  getPercent,
  getDistanceBetweenTwoUnits,
}

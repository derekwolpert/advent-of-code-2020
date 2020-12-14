const fs = require('fs').promises
const path = require('path')

const parseInput = async file =>
  (
    await fs.readFile(path.resolve(__dirname, file), { encoding: 'utf-8' })
  ).split('\n')

const partTwo = async file => {
  const plane = [...new Array(128)].map(() => new Array(8))
  const seatId = async row => {
    let minRow = 0
    let maxRow = 127
    let minSeat = 0
    let maxSeat = 7
    for (const char of row) {
      const rowChange = Math.ceil((maxRow - minRow) / 2)
      if (char === 'F') maxRow -= rowChange
      if (char === 'B') minRow += rowChange
      const seatChange = Math.ceil((maxSeat - minSeat) / 2)
      if (char === 'L') maxSeat -= seatChange
      if (char === 'R') minSeat += seatChange
    }
    plane[minRow][minSeat] = true
    return minRow * 8 + minSeat
  }
  const allSeatIds = (await parseInput(file)).map(row => seatId(row))
  const seatSet = new Set(await Promise.all(allSeatIds))
  for (let i = 0; i < plane.length; i++) {
    for (let j = 0; j < plane[i].length; j++) {
      if (
        !plane[i][j] &&
        seatSet.has(i * 8 + j - 1) &&
        seatSet.has(i * 8 + j + 1)
      ) {
        return i * 8 + j
      }
    }
  }
}

partTwo('5_input.txt').then(result => {
  console.log(result)
})

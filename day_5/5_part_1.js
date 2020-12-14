const fs = require('fs').promises
const path = require('path')

const parseInput = async file =>
  (
    await fs.readFile(path.resolve(__dirname, file), { encoding: 'utf-8' })
  ).split('\n')

const partOne = async file => {
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
    return minRow * 8 + minSeat
  }
  const allSeatIds = (await parseInput(file)).map(row => seatId(row))
  return Math.max(...(await Promise.all(allSeatIds)))
}

partOne('5_input.txt').then(result => {
  console.log(result)
})

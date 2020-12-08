const fs = require('fs').promises
const path = require('path')

const parseInput = async (file) => (
  (await fs.readFile(path.resolve(__dirname, file), { encoding: 'utf-8' }))
    .split('\n').map(Number)
)

const partOne = async (file) => {
  const nums = await parseInput(file)
  const set = new Set()
  for (const num of nums) {
    if (set.has(2020 - num)) {
      return num * (2020 - num)
    }
    set.add(num)
  }
}

partOne('1_input.txt')
  .then(result => {
    console.log(result)
  })

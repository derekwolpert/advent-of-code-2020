const fs = require('fs').promises
const path = require('path')

const parseInput = async (file) => (
  (await fs.readFile(path.resolve(__dirname, file), { encoding: 'utf-8' }))
    .split('\n').map(Number)
)

const partTwo = async (file) => {
  const nums = await parseInput(file)
  const obj = {}
  for (let i = 0; i < nums.length - 1; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      obj[nums[i] + nums[j]] = nums[i] * nums[j]
    }
  }
  for (const num of nums) {
    if ((2020 - num) in obj) {
      return num * obj[2020 - num]
    }
  }
}

partTwo('1_input.txt')
  .then(result => {
    console.log(result)
  })

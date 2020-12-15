const fs = require('fs').promises
const path = require('path')

const parseInput = async file =>
  (
    await fs.readFile(path.resolve(__dirname, file), { encoding: 'utf-8' })
  ).split('\n\n')

const partTwo = async file => {
  const customGroup = async group =>
    group
      .split('\n')
      .reduce((a, b) => b.split('').filter(char => a.includes(char))).length
  const sharedAnswers = (await parseInput(file)).map(group =>
    customGroup(group)
  )
  return (await Promise.all(sharedAnswers)).reduce((a, b) => a + b)
}

partTwo('6_input.txt').then(result => {
  console.log(result)
})

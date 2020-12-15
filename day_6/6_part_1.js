const fs = require('fs').promises
const path = require('path')

const parseInput = async file =>
  (await fs.readFile(path.resolve(__dirname, file), { encoding: 'utf-8' }))
    .split('\n\n')
    .map(group => group.split('\n').join(''))

const partOne = async file => {
  const customGroup = async group => new Set(group.split('\n').join('')).size
  const uniqueAnswers = (await parseInput(file)).map(group =>
    customGroup(group)
  )
  return (await Promise.all(uniqueAnswers)).reduce((a, b) => a + b)
}

partOne('6_input.txt').then(result => {
  console.log(result)
})

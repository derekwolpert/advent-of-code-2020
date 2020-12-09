const fs = require('fs').promises
const path = require('path')

const parseInput = async (file) => (
  (await fs.readFile(path.resolve(__dirname, file), { encoding: 'utf-8' }))
    .split('\n')
)

const partOne = async (file) => {
  const rows = await parseInput(file)
  let currentIdx = 0
  let treeCount = 0
  for (const row of rows) {
    if (row[currentIdx] === '#') treeCount++
    currentIdx = (currentIdx + 3) % row.length
  }
  return treeCount
}

partOne('3_input.txt')
  .then(result => {
    console.log(result)
  })

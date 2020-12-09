const fs = require('fs').promises
const path = require('path')

const parseInput = async (file) => (
  (await fs.readFile(path.resolve(__dirname, file), { encoding: 'utf-8' }))
    .split('\n')
)

const partTwo = async (file) => {
  const rows = await parseInput(file)
  const countTrees = async (right, down) => {
    let currentIdx = 0
    let treeCount = 0
    for (let i = 0; i < rows.length; i += down) {
      if (rows[i][currentIdx] === '#') treeCount++
      currentIdx = (currentIdx + right) % rows[i].length
    }
    return treeCount
  }
  const treeCounts = [
    countTrees(1, 1),
    countTrees(3, 1),
    countTrees(5, 1),
    countTrees(7, 1),
    countTrees(1, 2)
  ]
  return (await Promise.all(treeCounts)).reduce((a, b) => a * b)
}

partTwo('3_input.txt')
  .then(result => {
    console.log(result)
  })

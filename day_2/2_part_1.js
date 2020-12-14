const fs = require('fs').promises
const path = require('path')

const parseInput = async (file) => (
  (await fs.readFile(path.resolve(__dirname, file), { encoding: 'utf-8' }))
    .split('\n').map(password => (password.split(/-|\s|:\s/)))
)

const partOne = async (file) => {
  const passwords = await parseInput(file)
  let valid = 0
  for (const password of passwords) {
    const min = Number(password[0])
    const max = Number(password[1])
    const char = password[2]
    let count = 0
    for (const el of password[3]) {
      if (el === char) count++
    }
    if ((count >= min) && (count <= max)) {
      valid++
    }
  }
  return valid
}

partOne('2_input.txt')
  .then(result => {
    console.log(result)
  })

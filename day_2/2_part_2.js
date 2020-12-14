const fs = require('fs').promises
const path = require('path')

const parseInput = async (file) => (
  (await fs.readFile(path.resolve(__dirname, file), { encoding: 'utf-8' }))
    .split('\n').map(password => (password.split(/-|\s|:\s/)))
)

const partTwo = async (file) => {
  const passwords = await parseInput(file)
  let valid = 0
  for (const password of passwords) {
    const first = password[3][Number(password[0]) - 1]
    const second = password[3][Number(password[1]) - 1]
    const char = password[2]
    if (((first === char) || (second === char)) && (first !== second)) {
      valid++
    }
  }
  return valid
}

partTwo('2_input.txt')
  .then(result => {
    console.log(result)
  })

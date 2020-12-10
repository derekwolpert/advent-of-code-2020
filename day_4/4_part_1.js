const fs = require('fs').promises
const path = require('path')

const parseInput = async file =>
  (await fs.readFile(path.resolve(__dirname, file), { encoding: 'utf-8' }))
    .split('\n\n')
    .map(data => new Set(data.split(/:.*?\s|:.*?\n|:.*/).filter(Boolean)))

const partOne = async file => {
  const passportCheck = async passport =>
    ['byr', 'ecl', 'eyr', 'hcl', 'hgt', 'iyr', 'pid'].every(field =>
      passport.has(field)
    )
  const checkPassports = (await parseInput(file)).map(passport =>
    passportCheck(passport)
  )
  return (await Promise.all(checkPassports)).filter(Boolean).length
}

partOne('4_input.txt').then(result => {
  console.log(result)
})

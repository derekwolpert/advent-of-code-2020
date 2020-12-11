const fs = require('fs').promises
const path = require('path')

const parseInput = async file =>
  (await fs.readFile(path.resolve(__dirname, file), { encoding: 'utf-8' }))
    .split('\n\n')
    .map(data => {
      const obj = {}
      data.split(/\s|\n/).forEach(datum => {
        obj[datum.split(':')[0]] = datum.split(':')[1]
      })
      return obj
    })

const partOne = async file => {
  const passportCheck = async passport => {
    const between = (val, min, max) => val >= min && val <= max
    if (!between(Number(passport.byr), 1920, 2002)) return false
    if (!between(Number(passport.iyr), 2010, 2020)) return false
    if (!between(Number(passport.eyr), 2020, 2030)) return false
    if (passport.hgt && passport.hgt.endsWith('cm')) {
      if (!between(Number(passport.hgt.split('cm')[0]), 150, 193)) return false
    } else if (passport.hgt && passport.hgt.endsWith('in')) {
      if (!between(Number(passport.hgt.split('in')[0]), 59, 76)) return false
    } else {
      return false
    }
    if (
      !(
        RegExp(/^[a-f0-9]+$/).test(passport.hcl.split('#')[1]) &&
        passport.hcl.split('#')[1].length === 6
      )
    ) {
      return false
    }
    if (
      !new Set(['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth']).has(
        passport.ecl
      )
    ) {
      return false
    }
    if (!(RegExp(/^[0-9]+$/).test(passport.pid) && passport.pid.length === 9)) {
      return false
    }
    return true
  }
  const checkPassports = (await parseInput(file)).map(passport =>
    passportCheck(passport)
  )
  return (await Promise.all(checkPassports)).filter(Boolean).length
}

partOne('4_input.txt').then(result => {
  console.log(result)
})

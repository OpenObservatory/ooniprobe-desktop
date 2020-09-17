/* global require */

const path = require('path')
const { execSync } = require('child_process')
const { readFileSync, existsSync } = require('fs')
const pkgJson = require('../package.json')

const probeVersion = pkgJson['probeVersion']
const baseURL = `https://github.com/ooni/probe-cli/releases/download/v${probeVersion}`

const appRoot = path.resolve(path.join(__dirname, '..'))
const dstDir = path.join(appRoot, 'build', 'probe-cli')

const download = () => {
  let checksums = {}

  execSync(`mkdir -p ${dstDir}`)

  execSync(`curl -#f -L -o ${dstDir}/ooniprobe_checksums.txt ${baseURL}/ooniprobe_checksums.txt`)
  const checksumsData = readFileSync(`${dstDir}/ooniprobe_checksums.txt`)
  checksumsData.toString().split('\n').forEach(line => {
    if (line === '') {
      return
    }
    const [sum, tarPath] = line.split('  ')
    checksums[tarPath] = sum
    const re = /^ooniprobe_v[0-9.a-z-]+_((darwin|linux|windows)_amd64).(tar.gz|zip)$/
    const result = tarPath.match(re)
    if (!result) {
      throw Error(`The path '${tarPath}' does not match our expectations`)
    }
    const d = result[1]
    const downloadURL = `${baseURL}/${tarPath}`

    if (path.extname(tarPath) !== '.gz') {
      return // we only care about downloading the .tar.gz files here
    }
    if (existsSync(`${dstDir}/${tarPath}`) === false) {
      console.log(`Downloading ${downloadURL}`)
      execSync(`mkdir -p ${dstDir}/${d}`)
      execSync(`curl -#f -L -o ${dstDir}/${tarPath} ${downloadURL}`)
    }
    const shasum = execSync(`shasum -a 256 ${dstDir}/${tarPath}`).toString().split(' ')[0]
    if (shasum !== checksums[tarPath]) {
      throw Error(`Invalid checksum ${shasum} ${checksums[tarPath]}`)
    }
    console.log(`Verified ${dstDir}/${tarPath}`)
    execSync(`cd ${dstDir}/${d} && tar xzf ../${tarPath}`)
  })
}

download()

const Application = require('spectron').Application
// Require Electron from the binaries included in node_modules.
const electronPath = require('electron')
const path = require('path')
const fs = require('fs')

const screenshotsDir = path.resolve('.', 'test', 'screenshots')

const execHardReset = (app) => {
  return app.client.executeAsync(done => {
    require('electron')
      .remote.require('./actions')
      .hardReset()
      .then(() => {
        done()
      }, (err) => {
        console.log('err')
        console.log(done(err))
      })
  })
}

module.exports = {
  async startApp() {
    const app = await new Application({
      path: electronPath,
      args: [path.join(__dirname, '..')],
      env: {
        NODE_ENV: 'test',
        ELECTRON_IS_DEV: false
      },
      startTimeout: 30000,
      waitTimeout: 30000,
      chromeDriverArgs: ['–remote-debugging-port=12209']
    })

    return app.start()
  },

  async stopApp(app) {
    if (app && app.isRunning()) {
      await app.stop()
    }
  },

  async resetData(app) {
    await app.client.waitUntilWindowLoaded()
    await execHardReset(app)
  },

  async screenshotApp(app, label) {
    if (app && app.isRunning) {
      const screenshotBuffer = await app.browserWindow.capturePage()
      if (screenshotBuffer) {
        const filename = path.resolve(screenshotsDir, `${label}.png`)
        fs.writeFileSync(filename, screenshotBuffer)
      }
    }
  }
}

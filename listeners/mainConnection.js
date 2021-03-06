const socketLib = require('socket.io')
const clientListenerSetup = require('./client')
const hardwareListenerSetup = require('./hardware')

module.exports = server => {
  const io = socketLib(server)

  let state = {
    lamps: [],
    hardwareHandler: null
  }

  io.on('connection', socket => {
    socket.on('general/specifyClient', data => {
      const params = [io, socket, state]
      if (data && data.type === 'hardwareHandler') {
        hardwareListenerSetup(...params)
      } else {
        clientListenerSetup(...params)
      }
    })
  })
}

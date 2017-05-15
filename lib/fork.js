'use strict'

const debug = require('debug')('worker-farm')
const childProcess = require('child_process')
const childModule = require.resolve('./child/index')

function fork (module) {
  const child = childProcess.fork(childModule, {
    env: process.env,
    cwd: process.cwd()
  })

  debug(`fork#${child.pid}`, module)
  child.send({module})

  // return a send() function for this child
  return {
    child,
    send (data) {
      try {
        child.send(data)
      } catch (e) {
        // this *should* be picked up by onExit and the operation requeued
      }
    }
  }
}

module.exports = fork

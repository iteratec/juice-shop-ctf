'use strict'
var Promise = require('bluebird')
var fs = require('fs')
Promise.promisifyAll(fs)
var path = require('path')

function writeToFile (sql) {
  return new Promise(function (resolve, reject) {
    fs.writeFileAsync('fbctf-game.json', sql).then(function () {
      resolve(path.resolve('fbctf-game.json').green)
    }).catch(function (error) {
      reject('Failed to write output to file! ' + error)
    })
  })
}

module.exports = writeToFile

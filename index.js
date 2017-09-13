'use strict'
var inquirer = require('inquirer')
var colors = require('colors') // eslint-disable-line no-unused-vars
var Promise = require('bluebird')
var secretKey = require('./lib/secretKey')
var fetchChallenges = require('./lib/fetchChallenges')
var generateFbctfImport = require('./lib/generateFbctfImport')
var writeToFile = require('./lib/writeToFile')

var printError = function (err) {
  console.log(err.red)
}

var juiceShopCtfCli = function () {
  var questions = [
    {
      type: 'input',
      name: 'juiceShopUrl',
      message: 'Juice Shop URL to retrieve challenges? \n' +
       'The Challenges will need to have a country and countryCode attribute. \n' +
       'Start the iteraCTF branch of the iteratec/juice-shop repository to get a juice-shop version which supports this. \n',
      default: 'http://localhost:3000'
    },
    {
      type: 'input',
      name: 'ctfKey',
      message: 'Secret key <or> URL to ctf.key file?',
      default:
              'https://raw.githubusercontent.com/bkimminich/juice-shop/master/ctf.key'
    }
  ]
  console.log()
  console.log(
      'Generate a Import File for ' +
          'fbctf'.bold +
          ' with the ' +
          'OWASP Juice Shop'.bold +
          ' challenges'
  )
  inquirer.prompt(questions)
  .then(function (answers) {
    return Promise.all([
      secretKey(answers.ctfKey),
      fetchChallenges(answers.juiceShopUrl)
    ])
  }, printError)
  .then(function ([hmacKey, challenges]) {
    return generateFbctfImport(challenges, hmacKey)
  }, printError)
  .then(function (exportJson) {
    return writeToFile(JSON.stringify(exportJson))
  }, printError)
  .then(function (file) {
    console.log('Export File written to ' + file)
    console.log()
    console.log('Have fun!'.bold + ' 🎉🎉🎉 ')
  }, printError)
}

module.exports = juiceShopCtfCli

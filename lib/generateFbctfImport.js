'use strict'
var Promise = require('bluebird')
var striptags = require('striptags')
var entities = require('entities')
var hmac = require('./hmac')

function generateFbctfImport (challenges, hmacKey) {
  var template = require('../data/fbctfImportTemplate')
  return new Promise(function (resolve, reject) {
    try {
      template.levels.levels = challenges.map(function (challenge) {
        // Strip Tags from the String as they can't be displayed by fbctf anyway
        var description = striptags(challenge.description)
        // Unencode html entities into the proper chars so the xss script injection challenges are displayed in a better way
        description = entities.decode(description)

        if (!challenge.countryCode) { console.log('Warning: '.yellow + 'Challenge ' + challenge.name + ' does not have a country code') }

        return {
          type: 'flag',
          title: challenge.name,
          active: true,
          description: description,
          entity_iso_code: challenge.countryCode,
          category: 'Difficulty ' + challenge.difficulty, // challenge.category,
          points: challenge.difficulty * 5,
          bonus: challenge.difficulty * 3,
          bonus_dec: challenge.difficulty,
          bonus_fix: 30,
          flag: hmac(challenge.name, hmacKey), // Challenge Key
          hint: '',
          penalty: 0,
          links: [],
          attachments: []
        }
      })

      resolve(template)
    } catch (error) {
      reject('Failed to generate fbctf export file! ' + error)
    }
  })
}

module.exports = generateFbctfImport

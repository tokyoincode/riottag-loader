
const assert = require('assert')
const fsp = require('fs-promise')
const wrap = require('co').wrap;
const path = require('path')
const webpack = require('../index.js')

describe('riottag-loader', function() {

  const compiledDir =  path.join(__dirname, 'compiled')
  const tagDir =  path.join(__dirname, 'tag')

  function normalize(str) {
    return str.trim().replace(/[\n\r]+/g, '')
  }

  function tagFiles(name) {
    return fsp.readFile(path.join(tagDir, name), 'utf-8')
      .then(res => webpack(res))
      .then(res => normalize(res))
  }

  function getFile(name) {
    return fsp.readFile(path.join(compiledDir, name), 'utf8')
      .then(res => normalize(res))
  }

  it('returns the file', wrap(function* () {
    const filename = 'another-ext.js'
    assert.equal(yield getFile(filename), yield tagFiles(filename))
  }));
});
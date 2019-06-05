const test = require('tape'),
    _ = require('underscore'),
    _s = require('underscore.string')


const Nightmare = require('nightmare'),
      nightmare = new Nightmare()
      .on('console', (type, msg) => console.log(msg))

test('Test opens', (t) => {
  t.plan(1)

  nightmare
  .goto('file://' + process.cwd() + '/test/test.html')
  .evaluate(() => document.title)
  .then((result) => {
    t.equals(result, 'ejs-element Test', 'Test page opens and title is correct')
  })
  .catch((err) => {
    console.log(err)
  })
})

test('Basic ejs-element features work as expected', (t) => {
  t.plan(3)

  nightmare
  .goto('file://' + process.cwd() + '/test/basic.html')
  .evaluate(() => {
    return [document.getElementsByTagName("my-element")[0].innerHTML,
    document.getElementsByTagName("another-element")[0].innerHTML,
    document.getElementsByTagName("my-crate")[0].innerHTML]
  })
  .then((results) => {
    results = _.map(results, (result) => {
      return _s(result).replaceAll('\n', '').clean().value()
    })
    t.equals(results[0], 'This is an ejs-element. It can have apples.', 'ejs-element renders with a variable OK')
    t.equals(results[1], 'This is another ejs-element. It can do logic.', 'ejs-element renders logic OK')

    t.ok(_s.include(results[2], ('apples'))  && _s.include(results[2], 'oranges') && _s.include(results[2], 'raisins'), 'Iteratable list renders OK' )
  })
  .catch((err) => {
    console.log(err)
  })
})

test('Single element with renderAll', (t) => {
  t.plan(1)

  nightmare
  .goto('file://' + process.cwd() + '/test/single-element-render-all.html')
  .evaluate(() => {
    return document.getElementsByTagName("my-element")[0].innerHTML
  })
  .then((result) => {
    console.log(result)
    result = _s(result).replaceAll('\n', '').clean().value()
    t.equals(result, 'This is an ejs-element. It can have apples.', 'ejs-element renders with a variable OK')
  })

})

test('Two elements with renderAll', (t) => {
  t.plan(2)
  nightmare
  .goto('file://' + process.cwd() + '/test/two-elements-render-all.html')
  .evaluate(() => {
    return [document.getElementsByTagName("my-element")[0].innerHTML,
      document.getElementsByTagName("another-element")[0].innerHTML]
  })
  .then((results) => {
    console.log(results)
    results = _.map(results, (result) => {
      return _s(result).replaceAll('\n', '').clean().value()
    })
    t.equals(results[0], 'This is an ejs-element. It can have apples.', 'ejs-element renders first element OK')
    t.equals(results[1], 'This is another ejs-element. It can have apples and cherries.', 'ejs-element renders 2nd element OK')
  })
})


test('Can use raw HTML / JS objects instead of element name / DOM', (t) => {
  t.plan(2)
  let results = {}
  nightmare
  .goto('file://' + process.cwd() + '/test/raw-objects.html')
  .evaluate((results, done) => {
    results.dom = document.body.innerHTML
    results.window = window
    done(null, results)
  }, results)
  .end()
  .then((results) => {
    var expectedRenderedOutput = `
<my-element>
  hello world
</my-element>
`
    t.equals( results.window.ejsElem.ents[0].rendered, expectedRenderedOutput , 'element is rendered in state as expected')
    t.equals( results.window.renderedElement, expectedRenderedOutput, 'rendered output was returned to generic variable OK' )
  })
})

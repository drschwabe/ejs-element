var test = require('tape'), 
    Nightmare = require('nightmare'), 
    nightmare = new Nightmare({
      show: true, 
      alwaysOnTop : false
    })

test('Test opens', (t) => {
  t.plan(1)

  nightmare
  .on('console', (type, msg, errorStack) => { 
    console.log(msg) 
    if(errorStack) console.log(errorStack)  
  })   
  .goto('file://' + process.cwd() + '/test/test.html')
  .evaluate(() => {
    return document.title
  })
  .end()
  .then((result) => {
    t.equals(result, 'ejs-element Test', 'Test page opens and title is correct')
  })
  .catch((err) => {
    console.log(err)
  }) 
})


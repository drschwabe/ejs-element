var ejsElem = require('../ejs-element.js')

console.log('hello world')

ejsElem.init('my-element')
ejsElem.render('my-element', { variable : 'apples' })

ejsElem.init('another-element', { canDoLogic : true }, true)

ejsElem.init('my-crate', {
  payload : ['apples', 'oranges', 'raisins'], 
  ready : true
})

ejsElem.render('my-crate')

setTimeout(() => {
  ejsElem.renderAll({
    payload : ['cashews', 'almonds', 'pine nuts'], 
    ready: false, 
    variable : 'bananas'
  })
}, 1000)

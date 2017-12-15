var ejsElem = require('../ejs-element.js')

console.log('hello world')

ejsElem.init('my-element')
ejsElem.render('my-element', { variable : 'apples' })

ejsElem.init('another-element')
ejsElem.render('another-element', { canDoLogic : true })

var ejsElem = require('../ejs-element.js')

ejsElem.init('my-element')
ejsElem.init('another-element')

//renderAll (2 elements) 
ejsElem.renderAll({ variable : 'apples', another_variable : 'cherries' })

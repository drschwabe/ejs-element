var ejsElem = require('../ejs-element.js')

ejsElem.init('my-element')

//render all (even though there is only a single element)
ejsElem.renderAll({ variable : 'apples' })

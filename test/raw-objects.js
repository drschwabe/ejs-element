global.ejsElem = require('../ejs-element.js')

var message = 'hello world'

var html = `
<my-element>
  <?= state.message ?>
</my-element>
`

ejsElem.init(html)
global.renderedElement = ejsElem.render('my-element', { message : message })

# EJS Element

### usage

From your terminal: 
```bash
npm install ejs-element --save
```

In your script: 
```javascript
var ejsElem = require('ejs-element') 
ejsElem.init('my-crate', {
  payload : ['apples', 'oranges', 'raisins'], 
  ready : true
})
ejsElem.render('my-crate', state)
```

In your HTML page: 
```html
<my-crate>
  <h1 class="<?= state.ready ? 'blue' : 'red' ?>">Crate contents:</h4>
  <ul>
    <? state.payload.forEach( function(item) { ?>
      <li><?= item ?></li>
    <? }) ?>
  </ul>
  <? if(state.ready) { ?>
    <h2>READY</h2>
  <? } ?>
</my-crate>
```

alternatively, render in-memory without needing anything in DOM :
```javascript
var ejsElem = require('ejs-element')
var message = 'hello world'
var html = `
<my-element>
  <?= state.message ?>
</my-element>
`

ejsElem.init(html)
var renderedElem = ejsElem.render('my-element', { message : message })

```

### api

#### init(elementNameOrHTMLstring, state*, render*)
```javascript
ejsElem.init('element-name', { victory : true })
```
Finds your element (ie- 'element-name') in the DOM, parses it for EJS, and stores it in ejsElem.elems array. Optionally provide an initial state for the element, the properties of which are stored on the element in that array and used as default state for future renders (ie- so that providing an explicit state with each render is not required).  Pass true as third param to immediately render.

#### render(name, state*)
```javascript
ejsElem.render('element-name', { color : 'orange' })
```
Render the element's EJS.  Provide optional state; the properties of which will be assigned as children of a 'state' object you will need to reference to access them ex: `<h1 class="<?= state.color ?>GO</?>`

If the element does not exist in the DOM the function simply returns the rendered output. 

#### renderAll(state*)
```javascript
ejsElem.renderAll({ everything : 'awesome' , over : 9000 })
```
Render all initialized ejs elements with the optional state provided (shortcut for calling .render on them all) 


MIT

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
ejsElem.render('my-crate-element', state)
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

### api

#### init(name, [state], render)
```
ejsElem.init('element-name', { victory : true })
```
Finds your element (ie- 'element-name'), parses it for EJS, and stores it in the ejsElem.elems array. Optionally provide an initial state for the element, the properties of which are stored on the element itself and used as default state for future renders (ie- so that providing an explicit state with each render is not required).  Pass true as third param to render without having to call .render

#### render(name, [state])
```
ejsElem.render('element-name', { color : 'ornage' })
```
Render the element's EJS.  Provide optional state; the properties of which will be assigned as children of a 'state' object you will need to reference to access them ex: `<h1 class="<?= state.color ?>GO</?>` 

MIT

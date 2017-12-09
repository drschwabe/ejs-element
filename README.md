# EJS Element

### usage

From your terminal: 
```bash
npm install ejs-element --save
```

In your script: 
```javascript
var ejsElem = require('ejs-elements') 
ejsElem.init('my-crate', {
  payload : ['apples, 'oranges', 'raisins'], 
  ready : true
})
```

In your HTML page: 
```html
<my-crate>
  <h1 class="<?= state.ready ? 'blue' : 'red' ?>">Crate contents:</h4>
  <ul>
    <?= state.payload.forEach((function(item) { ?>
      <li><?= item ?></li>
    <? })) ?>
  </ul>
  <? if(state.ready) { ?>
    <h2>READY</h2>
  <? } ?>
</my-crate>
```


```javascript
ejsElem.render('my-crate-element', state)
```

### api

#### init(name, [state])
```
ejsElem.init('element-name', { victory : true })
```

Finds your element (ie- 'element-name'), parses it for EJS, and stores it in the ejsElem.elems array. Optionally provide an initial state for the element, the properties of which are stored on the element itself and used as default state for future renders (ie- so that providing an explicit state with each render is not required). 

 
MIT

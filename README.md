# EJS Element

### usage

From your terminal: 
```bash
npm install ejs-element
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
<my-crate-element>
  <h1 class="<?= state.ready ? 'blue' : 'red' ?>">Crate contents:</h4>
  <ul>
    <?= state.payload.forEach((function(item) { ?>
      <li><?= item ?></li>
    <? })) ?>
  </ul>
  <? if(state.ready) { ?>
    <h2>READY</h2>
  <? } ?>
</my-crate-element
```


```javascript
ejsElem.render('my-crate-element', state)
```

### how it works
The init function simply finds your element and parses it for EJS.  

 

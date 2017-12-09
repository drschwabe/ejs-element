const ejs = require('ejs')
ejs.delimiter = '?'

const $ = require('jquery'), 
      _ = require('underscore')

var ejsElem = { 
  ent : null, 
  ents : [],
  init : (elementName, state, render) => {
    var elem = {
      template : ejsElem.parse(elementName),
      name :  elementName
    }
    if(state) elem = _.extend(elem, state) //< Apply initial state if provided.
    ejsElem.ents.push(elem)
    if(render) ejsElem.render(elementName)
  },
  parse : (elementName) => { 
    let element =  $(elementName)[0]  
    let template = _.unescape(element.outerHTML) 
    while(template.indexOf("<!--?") >= 0) { template = template.replace("<!--?", "<?")} 
    while(template.indexOf("?-->") >= 0) { template = template.replace("?-->", "?>")}      
    while(template.indexOf("-->") >= 0) { template = template.replace("-->", ">")}  
    if(template.indexOf("<!--") >= 0) { 
      template = template.replace("!>", "-->") 
    } 
    while(template.indexOf("<!--?-") >= 0) { template = template.replace("<!--?-", "<?") }  
    while(template.indexOf("?-->") >= 0) { template = template.replace("?-->", "?>") }  
    return _.unescape(template) 
  }, 
  render : (elementName, state) => { 
    //debugger
    var elem = _.findWhere(ejsElem.ents, { name: elementName})
    if(!state) state = elem //< If no state is provided, use the element itself:     
    state.element = elem //< Reference to the element obj; so templates can use a generic 
    //obj path to access the current element state ie: <? state.element ?>
    var renderedTemplate = ejs.render(elem.template, { state: state }) 
    $(elementName)[0].outerHTML = renderedTemplate   
    $(elementName).removeClass('invisible')
  }, 
  renderAll : (state) => {
    ejsElem.ents.forEach((elem) => {
      if(!state) state = elem 
      var renderedTemplate = ejs.render(elem.template, { state: state })
      $(elem.name).each((index, elem) => {
        elem.outerHTML = renderedTemplate
      }).removeClass('invisible')
    })
  }
}

module.exports = ejsElem

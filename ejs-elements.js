const ejs = require('ejs')
ejs.delimiter = '?'

const $ = require('jquery'), 
      _ = require('underscore')

var ejsElem = { 
  ent : null, 
  ents : [],
  init : (elementName) => {
    var elem = {
      template : ejsElem.parse(elementName) , 
      name :  elementName
    }
    ejsElem.ents.push(elem)
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
    var elem = _.findWhere(ejsElem.ents, { name: elementName})
    var renderedTemplate = ejs.render(elem.template, { state: state }) 
    $(elementName)[0].outerHTML = renderedTemplate   
    $(elementName).removeClass('invisible')
  } 
}

module.exports = ejsElem

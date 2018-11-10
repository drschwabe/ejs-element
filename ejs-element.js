const ejs = require('ejs')
ejs.delimiter = '?'

const _ = require('underscore')

var ejsElem = {
  ent : null,
  ents : [],
  init : (elementName, state, render) => {
    var elem = {
      template : ejsElem.parse(elementName),
      name :  elementName
    }
    if(!elem.template) return console.warn('cannot init, no element with tag name: ' + elementName)
    if(state) elem = _.extend(elem, state) //< Apply initial state if provided.
    ejsElem.ents.push(elem)
    if(render) ejsElem.render(elementName)
  },
  parse : (elementName) => {
    let element = document.getElementsByTagName(elementName)[0]
    if(!element) return console.warn('cannot parse, no element with tag name: ' + elementName)
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
    if(!elem) return console.warn('cannot render, no element with tag name: ' + elementName)
    if(!state) state = elem //< If no state is provided, use the element itself:
    state.element = elem //< Reference to the element obj; so templates can use a generic
    //obj path to access the current element state ie: <? state.element ?>
    var renderedTemplate = ejs.render(elem.template, { state: state })
    document.getElementsByTagName(elementName)[0].outerHTML = renderedTemplate
    document.getElementsByTagName(elementName)[0].classList.remove("invisible")
  },
  renderAll : (state) => {
    ejsElem.ents.forEach((elem) => {
      if(!state) state = elem
      var renderedTemplate = ejs.render(elem.template, { state: state })
      var children = [document.getElementsByTagName(elem.name)]
      if(!children) return console.warn('cannot render, no element with tag name: ' + elem.name)
      children.forEach((elem,index)=>{
          elem[0].outerHTML = renderedTemplate
          elem[0].classList.remove("invisible")
      })
    })
  }
}

module.exports = ejsElem

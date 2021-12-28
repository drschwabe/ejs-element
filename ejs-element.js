const ejs = require('ejs')
ejs.delimiter = '?'

const _ = require('underscore')

var ejsElem = {
  ent : null,
  ents : [],
  init : (elementNameOrHTML, state, render) => {
    //accommodate for simply element name ie- 'my-element' or an HTML string
    let isHTML = elementNameOrHTML.search('<') > -1  ? true : false
    let name
    if(isHTML) {
      let tagFirstCharacter = elementNameOrHTML.search('<'),
          tagLastCharacter = elementNameOrHTML.search('>')
      name = elementNameOrHTML.slice(tagFirstCharacter + 1, tagLastCharacter)
    } else {
      name = elementNameOrHTML
    }
    var elem = {
      template : isHTML ? elementNameOrHTML : ejsElem.parse(elementNameOrHTML),
      name :  name
    }
    if(!elem.template) return console.warn('cannot init, no element in DOM with tag name: ' + name + '(and no HTML string was provided)')
    if(state) elem = _.extend(elem, state) //< Apply initial state if provided.
    ejsElem.ents.push(elem)
    if(render) ejsElem.render(name)
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
  render : (elementNameOrHTML, state, renderDom) => {
    let isHTML = elementNameOrHTML.search('<') > -1  ? true : false
    if(isHTML) {
      return ejs.render(elementNameOrHTML, { state: state })
    }
    var elem = _.findWhere(ejsElem.ents, { name: elementNameOrHTML})
    if(!elem) return console.warn('cannot render, no element yet established with tag name: ' + elementNameOrHTML)
    if(!state) state = elem //< If no state is provided, use the element itself:
    state.element = elem //< Reference to the element obj; so templates can use a generic
    //obj path to access the current element state ie: <? state.element ?>
    var renderedTemplate = ejs.render(elem.template, { state: state })
    if(renderDom === false) {
      elem.rendered = renderedTemplate
      return renderedTemplate
    }
    if(document.getElementsByTagName(elementNameOrHTML).length) {
      //otherwise find the element in the DOM and render it there:
      document.getElementsByTagName(elementNameOrHTML)[0].outerHTML = renderedTemplate
      document.getElementsByTagName(elementNameOrHTML)[0].classList.remove("invisible")
      document.getElementsByTagName(elementNameOrHTML)[0].classList.remove("hide")
    } else { //if the element is not found in DOM, just render it as property:
      elem.rendered = renderedTemplate
      return renderedTemplate
    }

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
          elem[0].classList.remove("hide")
      })
    })
  }, 
  get : (elementName) => {
    //find the element
    var elem = _.findWhere(ejsElem.ents, { name: elementName})
    return elem //< (includes template and state)
  }
}

module.exports = ejsElem

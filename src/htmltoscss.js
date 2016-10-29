//bug- extraction functions:  nested extractions
//hide functions hide target without removing el.
//if no tag ID or class, then no output.
//function: hideTags -done
//function: hideIds -done
//function: hideClasses -done
//hide el functions remove the target from the heirarchy
//function: hideElementsByClass - done
//function: hideElementsById - done
//remove el functions remove the el with children
//function: removeElementsByClass -done
//function: removeElementsById -done
//tract el pull target and childrenfrom heirarchy to top level
//function: extractByClass - done
//function: extractById - done
//reduce siblings to single representations
//function reduceSiblings -done
//function: combineSimilarParents -done

//htmlToScss working good for now.  Just need to figure out the react implemenation.

//ToAdd:
//removeSiblingIteratingClasses
//removeClassesPartial - for iterating or random
//remove classes

export default class HtmlToScss {
  constructor() {
    this.newDom = null
    this.output = null
  }

  hideTags(dom, include = [], exclude = [], hideAll = false) {
    let newDom = this.deepCopy(dom)

    newDom.forEach(el => {
      let isInExcludeList = (exclude.indexOf(el.tag) !== -1)
      let isInIncludeList = (include.indexOf(el.tag) !== -1)

      if ((!isInExcludeList && hideAll) || (isInIncludeList && !hideAll)) el.tag = ''

      el.children = this.hideTags(el.children, include, exclude, hideAll)
    })

    return newDom
  }

  //todo fix this hit
  hideIds(dom, include = [], exclude = [], hideAll = false) {
    let newDom = this.deepCopy(dom)

    newDom.forEach(el => {
      el.ids = el.ids.filter(id => {
        let isInExcludeList = (exclude.indexOf(id) !== -1)
        let isInIncludeList = (include.indexOf(id) !== -1)
        return !((hideAll && isInExcludeList) || (!hideAll && isInIncludeList))
      })

      el.children = this.hideIds(el.children, include, exclude, hideAll)
    })
    return newDom
  }

  //todo fix this hit
  hideClasses(dom, include = [], exclude = [], hideAll = false) {
    let newDom = this.deepCopy(dom)

    newDom.forEach(el => {
      el.classes = el.classes.filter(theClass => {
        let isInExcludeList = (exclude.indexOf(theClass) !== -1)
        let isInIncludeList = (include.indexOf(theClass) !== -1)
        return !((hideAll && isInExcludeList) || (!hideAll && isInIncludeList))
      })

      el.children = this.hideClasses(el.children, include, exclude, hideAll)
    })

    return newDom
  }

  hideElementsByClass(dom, hideList = []) {
    let newDom = this.deepCopy(dom)

    newDom.forEach(el => {
      el.classes.forEach(theClass => {
        if (hideList.indexOf(theClass) !== -1) {
          el.tag = ''
          el.ids = []
          el.classes = []
        }
      })
      el.children = this.hideElementsByClass(el.children, hideList)
    })
    return newDom
  }

  hideElementsById(dom, hideList = []) {
    let newDom = this.deepCopy(dom)
    newDom.forEach(el => {
      el.ids.forEach(id => {
        if (hideList.indexOf(id) !== -1) {
          el.tag = ''
          el.ids = []
          el.classes = []
        }
      })
      el.children = this.hideElementsById(el.children, hideList)
    })
    return newDom
  }

  removeElementsByClass(dom, removeList = []) {
    let newDom = this.deepCopy(dom)
    let remove = false
    newDom = newDom.filter((el) => {
      let keep = true
      el.classes.forEach(theClass => {
        if (removeList.indexOf(theClass) !== -1) {
          keep = false
        }
      })
      return keep
    })
    newDom.forEach((el, index) => {
      el.children = this.removeElementsByClass(el.children, removeList)

    })
    return newDom
  }

  removeElementsById(dom, removeList = []) {
    let newDom = this.deepCopy(dom)
    let remove = false
    newDom = newDom.filter((el) => {
      let keep = true
      el.ids.forEach(id => {
        if (removeList.indexOf(id) !== -1) {
          keep = false
        }
      })
      return keep
    })
    newDom.forEach((el, index) => {
      el.children = this.removeElementsById(el.children, removeList)

    })
    return newDom
  }

  extractByClass(dom, extractList = []) {
    let newDom = this.deepCopy(dom)
    let domLength = newDom.length - 1
    let extracted = []

    function extract(dom, extractList) {
      let extracted = []
      dom.forEach((el) => {
        el.classes.forEach(theClass => {
          if (extractList.indexOf(theClass) !== -1) {
            extracted.push(el)
          }
        })
        extracted = extracted.concat(extract(el.children, extractList))
      })
      return extracted;
    }

    extracted = extracted.concat(extract(newDom, extractList))
    newDom = this.removeElementsByClass(newDom, extractList)
    newDom = newDom.concat(extracted)
    newDom.forEach((el, index) => {
      if (index > domLength) {
        el.children = this.removeElementsByClass(el.children, extractList)
      }
    })
    return newDom
  }
  extractById(dom, extractList = []) {
    let newDom = this.deepCopy(dom)
    let domLength = newDom.length - 1
    let extracted = []

    function extract(dom, extractList) {
      let extracted = []
      dom.forEach((el) => {
        el.ids.forEach(id => {
          if (extractList.indexOf(id) !== -1) {
            extracted.push(el)
          }
        })
        extracted = extracted.concat(extract(el.children, extractList))
      })
      return extracted;
    }

    extracted = extracted.concat(extract(newDom, extractList))
    newDom = this.removeElementsById(newDom, extractList)
    newDom = newDom.concat(extracted)
    newDom.forEach((el, index) => {
      if (index > domLength) {
        el.children = this.removeElementsById(el.children, extractList)
      }
    })
    return newDom
  }

  reduceSiblings(dom) {
    let newDom = this.deepCopy(dom)
    let removeIndexes = []
    if (newDom.length > 1) {
      newDom = newDom.filter((el, index, arr) => {
        let filter = true
        for (var i = index; i < arr.length; i++) {
          if (i + 1 !== arr.length && this.compareElements(el, arr[i + 1])) {
            filter = false
          }
        }
        return filter
      })
    }
    newDom.forEach(el => {
      el.children = this.reduceSiblings(el.children)
    })

    return newDom
  }

  combineSimilarParents(dom) {
    let newDom = this.deepCopy(dom)
    if (newDom.length > 1) {
      newDom = newDom.filter((el, index, arr) => {
        let filter = true
        for (var i = index; i < arr.length; i++) {
          if (i + 1 !== arr.length && this.compareElementsWithoutChildren(el, arr[i + 1])) {
            arr[i + 1].children = arr[i + 1].children.concat(el.children)
            filter = false
          }
        }
        return filter
      })
    }
    newDom.forEach(el => {
      el.children = this.combineSimilarParents(el.children)
    })

    return newDom

  }

  convertBEM(dom, parentString) {

    let newDom = this.deepCopy(dom)

    newDom = newDom.map((el) => this.convertBEMRecursive(el))

    return newDom
  }

  convertBEMRecursive(parent) {

    parent.children = parent.children.map((el) => this.convertBEMRecursive(el))

    let bemParentClassIndex = -1
    parent.children.forEach((child) => {
      let isBemChild = false
      let bemClassIndex = -1
      child.classes = child.classes.map((childClass, childClassIndex) => {
        let childClassOutput = childClass
        parent.classes.forEach((parentClass, index) => {
          if (childClassOutput.indexOf(parentClass + '__') !== -1) {
            isBemChild = true
            childClassOutput = childClassOutput.replace(parentClass + '__', '&__')
            bemParentClassIndex = index
            bemClassIndex = childClassIndex
          }
        })
        return childClassOutput
      })

      if (isBemChild) {
        child.tag = ''
        if (bemClassIndex > 0) {
          let bemClass = child.classes[bemClassIndex]
          let newClasses = []
          child.classes = child.classes.slice(bemClassIndex, bemClassIndex)

          newClasses.push(bemClass)
          // newClasses.concat(child.classes)
          child.classes = newClasses
        }

      }
    })
    //move bem parent to end of array
    if (bemParentClassIndex > 0) {
      let bemParent = parent.classes[bemParentClassIndex]
      parent.classes = parent.classes.slice(bemParentClassIndex, bemParentClassIndex)
      parent.classes.push(bemParent)
    }

    return parent
  }

  compareElements(el1, el2) {

    if (JSON.stringify(el1) === JSON.stringify(el2)) {
      return true;
    } else {
      return false
    }
  }
  compareElementsWithoutChildren(el1, el2) {

    let tagsMatch = (el1.tag === el2.tag)
    let idsMatch = (JSON.stringify(el1.ids) === JSON.stringify(el2.ids))
    let classesMatch = (JSON.stringify(el1.classes) === JSON.stringify(el2.classes))
    if (tagsMatch && idsMatch && classesMatch) {
      return true;
    } else {
      return false
    }

  }

  emptyElementValues(el) {
    let newElement = this.deepCopy(el)
    newElement.tag = ''
    newElement.ids = []
    newElement.classes = []
    return newElement
  }

  toArray(obj) {
    var array = [];
    // iterate backwards ensuring that length is an UInt32
    for (var i = obj.length >>> 0; i--;) {
      array[i] = obj[i];
    }
    return array;
  }

  deepCopy(obj) {
    return JSON.parse(JSON.stringify(obj))
  }

  extractHtml(inputHtml) {
    let parsedHtml = (typeof inputHtml === 'string') ? $.parseHTML(inputHtml) : inputHtml
    let nodes = []
    $.each(parsedHtml, (i, el) => {
      if (el.nodeName !== '#text') {

        let ids = (el.id === "") ? [] : el.id.split(' ')
        nodes.push({
          tag: el.nodeName.toLowerCase(),
          classes: this.toArray(el.classList),
          ids: ids,
          children: this.extractHtml(el.children)
        })
      }
    });
    return nodes
  }

  convertToScss(DOMObject, nest = 1) {
    let sass = ""
    let spacing = '  '.repeat(nest)
    $.each(DOMObject, (i, el) => {
      let classesDotted = el.classes.map((theclass) => {
        if (theclass.indexOf('&') === -1) {
          theclass = '.' + theclass

        }

        return theclass
      })
      let classes = (classesDotted.length > 0) ? classesDotted.join('') : ''
      let ids = (el.ids.length) ? '#' + el.ids.join('#') : ''
      let tag = el.tag
      if (classes !== '' || ids !== '' || tag !== '') {
        sass = sass.concat(`
${spacing}${el.tag}${ids}${classes} {
${spacing}  ${this.convertToScss(el.children, nest + 1)}
${spacing}}`)
      } else {
        sass = sass.concat(`${spacing}  ${this.convertToScss(el.children, nest)}`)
      }

    })
    return sass
  }
}
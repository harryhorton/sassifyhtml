/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _htmltoscss = __webpack_require__(1);
	
	var _htmltoscss2 = _interopRequireDefault(_htmltoscss);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	__webpack_require__(2);
	var htmlToScss = new _htmltoscss2.default();
	
	//+++++++++++++++++++++++++++++++++++++++++
	Vue.component('ace-editor', {
	  template: '<div :id="editorId" :style="styleObject" class="ace-editor-component"></div>',
	  props: {
	    code: {
	      type: String,
	      default: '<div></div>',
	      required: false,
	      validator: function validator(value) {
	        return typeof value === 'string';
	      }
	    },
	    mode: {
	      type: String,
	      default: 'html',
	      required: false,
	      validator: function validator(value) {
	        return typeof value === 'string';
	      }
	    },
	    theme: {
	      type: String,
	      default: 'monokai',
	      required: false,
	      validator: function validator(value) {
	        return typeof value === 'string';
	      }
	    }
	  },
	  data: function data() {
	    return {
	      editorId: 'editor' + Date.now(),
	      editor: null,
	      internalCode: '',
	      styleObject: {
	        width: '100%',
	        height: '400px'
	      }
	    };
	  },
	  mounted: function mounted() {
	    this.editor = ace.edit(this.editorId);
	    this.internalCode = this.code;
	    this.editor.setValue(this.internalCode);
	    this.editor.setOptions({
	      autoScrollEditorIntoView: true,
	      theme: "ace/theme/" + this.theme,
	      showPrintMargin: false,
	      mode: "ace/mode/" + this.mode
	    });
	    this.editor.getSession().on('change', this.onChange);
	  },
	
	  methods: {
	    onChange: function onChange(event) {
	      this.internalCode = this.editor.getValue();
	      this.$emit('onchange', this.editor.getValue());
	    }
	  },
	  watch: {
	    code: function code(val) {
	      if (val !== this.internalCode) this.editor.setValue(val);
	    }
	  }
	});
	
	Vue.component('array-string-input', {
	  template: '#array-string-input-template',
	  props: ['value'],
	  data: function data() {
	    return {
	      internalOption: this.value.join(' ')
	    };
	  },
	
	  watch: {
	    internalOption: function internalOption(val) {
	      this.value.splice(0);
	      this.value.push.apply(this.value, val.split(' '));
	    }
	  }
	
	});
	
	var VueApp = new Vue({
	  el: '#vue-app',
	  data: {
	    scss: '',
	    htmlData: 'ergerg',
	    showOptions: true,
	    options: {
	      hideTagsInclude: ['div'],
	      hideTagsExclude: [],
	      hideTagsAll: false,
	      hideIdsInclude: [],
	      hideIdsExclude: [],
	      hideIdsAll: false,
	      hideClassesInclude: [],
	      hideClassesExclude: [],
	      hideClassesAll: false,
	      hideElementsById: [],
	      hideElementsByClass: [],
	      removeElementsById: [],
	      removeElementsByClass: [],
	      extractElementsById: [],
	      extractElementsByClass: [],
	      reduceSiblings: true,
	      combineParents: true,
	      convertBEM: true,
	      defaultHtml: '<div><h1 id="theTitle anotherId" class="title">The title</h1><p>The content</p><div class="childDivClass secondClass"><h1 id="theTitle" class="title">The title</h1><p>The content</p><ul><li>li</li><li class="liclass">li</li><li>li</li><li>li</li></ul><ul><li>li</li><li class="liclass2">li</li><li>li</li><li>li</li></ul></div></div>'
	    }
	  },
	  methods: {
	    convert: function convert() {
	      ga('send', {
	        hitType: 'event',
	        eventCategory: 'interaction',
	        eventAction: 'click',
	        eventLabel: 'convert'
	      });
	
	      var html = this.htmlData;
	      var extractedHtml = htmlToScss.extractHtml(html);
	
	      var tagsHidden = htmlToScss.hideTags(extractedHtml, this.options.hideTagsInclude, this.options.hideTagsExclude, this.options.hideTagsAll);
	
	      var idsHidden = htmlToScss.hideIds(tagsHidden, this.options.hideIdsInclude, this.options.hideIdsExclude, this.options.hideIdsAll);
	
	      var hiddenByClass = htmlToScss.hideElementsByClass(idsHidden, this.options.hideElementsByClass);
	
	      var classesHidden = htmlToScss.hideClasses(hiddenByClass, this.options.hideClassesInclude, this.options.hideClassesExclude, this.options.hideClassesAll);
	
	      var hiddenById = htmlToScss.hideElementsById(classesHidden, this.options.hideElementsById);
	
	      var removedByClass = htmlToScss.removeElementsByClass(hiddenById, this.options.removeElementsByClass);
	
	      var removedById = htmlToScss.removeElementsById(removedByClass, this.options.removeElementsById);
	
	      var extracted = htmlToScss.extractByClass(removedById, this.options.extractElementsByClass);
	
	      var extractedById = htmlToScss.extractById(extracted, this.options.extractElementsById);
	
	      var reduced = this.options.reduceSiblings ? htmlToScss.reduceSiblings(extractedById) : extractedById;
	
	      var combinedParents = this.options.combineParents ? htmlToScss.combineSimilarParents(reduced) : reduced;
	
	      var BEMConverted = this.options.convertBEM ? htmlToScss.convertBEM(combinedParents) : combinedParents;
	      var scss = htmlToScss.convertToScss(BEMConverted);
	      this.scss = scss;
	    },
	    htmlUpdated: function htmlUpdated(newHtml) {
	      this.htmlData = newHtml;
	    }
	  },
	  created: function created() {
	    this.htmlData = this.options.defaultHtml;
	  },
	
	  watch: {
	    options: {
	      handler: function handler(val, oldVal) {
	        return val;
	      },
	
	      deep: true
	    }
	  }
	});

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
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
	
	var HtmlToScss = function () {
	  function HtmlToScss() {
	    _classCallCheck(this, HtmlToScss);
	
	    this.newDom = null;
	    this.output = null;
	  }
	
	  _createClass(HtmlToScss, [{
	    key: 'hideTags',
	    value: function hideTags(dom) {
	      var include = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
	
	      var _this = this;
	
	      var exclude = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
	      var all = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
	
	      var newDom = JSON.parse(JSON.stringify(dom));
	      newDom.forEach(function (el) {
	        if (all && exclude.indexOf(el.tag) === -1) {
	          el.tag = '';
	        } else if (!all && include.indexOf(el.tag) !== -1) {
	          el.tag = '';
	        }
	        el.children = _this.hideTags(el.children, include, exclude, all);
	      });
	      return newDom;
	    }
	
	    //todo fix this hit
	
	  }, {
	    key: 'hideIds',
	    value: function hideIds(dom) {
	      var include = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
	
	      var _this2 = this;
	
	      var exclude = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
	      var all = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
	
	      var newDom = JSON.parse(JSON.stringify(dom));
	      newDom.forEach(function (el) {
	        el.ids = el.ids.filter(function (id) {
	          var indexInclude = include.indexOf(id);
	          var indexExclude = exclude.indexOf(id);
	          if (all && indexExclude === -1) {
	            return false;
	            //el.ids = el.ids.splice(indexExclude, 1)
	          } else if (!all && indexInclude !== -1) {
	            return false;
	            //el.ids = el.ids.splice(indexInclude, 1)
	          }
	          return true;
	        });
	        el.children = _this2.hideIds(el.children, include, exclude, all);
	      });
	      return newDom;
	    }
	
	    //todo fix this hit
	
	  }, {
	    key: 'hideClasses',
	    value: function hideClasses(dom) {
	      var include = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
	
	      var _this3 = this;
	
	      var exclude = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
	      var all = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
	
	      var newDom = JSON.parse(JSON.stringify(dom));
	      newDom.forEach(function (el) {
	        el.classes = el.classes.filter(function (theClass) {
	          var indexInclude = include.indexOf(theClass);
	          var indexExclude = exclude.indexOf(theClass);
	          if (all && indexExclude === -1) {
	            return false;
	            //el.classes = el.classes.splice(indexExclude, 1)
	          } else if (!all && indexInclude !== -1) {
	            return false;
	            //el.classes = el.classes.splice(indexInclude, 1)
	          }
	          return true;
	        });
	        el.children = _this3.hideClasses(el.children, include, exclude, all);
	      });
	      return newDom;
	    }
	  }, {
	    key: 'hideElementsByClass',
	    value: function hideElementsByClass(dom) {
	      var _this4 = this;
	
	      var hideList = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
	
	      var newDom = JSON.parse(JSON.stringify(dom));
	      newDom.forEach(function (el) {
	        el.classes.forEach(function (theClass) {
	          if (hideList.indexOf(theClass) !== -1) {
	            el.tag = '';
	            el.ids = [];
	            el.classes = [];
	          }
	        });
	        el.children = _this4.hideElementsByClass(el.children, hideList);
	      });
	      return newDom;
	    }
	  }, {
	    key: 'hideElementsById',
	    value: function hideElementsById(dom) {
	      var _this5 = this;
	
	      var hideList = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
	
	      var newDom = JSON.parse(JSON.stringify(dom));
	      newDom.forEach(function (el) {
	        el.ids.forEach(function (id) {
	          if (hideList.indexOf(id) !== -1) {
	            el.tag = '';
	            el.ids = [];
	            el.classes = [];
	          }
	        });
	        el.children = _this5.hideElementsById(el.children, hideList);
	      });
	      return newDom;
	    }
	  }, {
	    key: 'removeElementsByClass',
	    value: function removeElementsByClass(dom) {
	      var _this6 = this;
	
	      var removeList = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
	
	      var newDom = JSON.parse(JSON.stringify(dom));
	      var remove = false;
	      newDom = newDom.filter(function (el) {
	        var keep = true;
	        el.classes.forEach(function (theClass) {
	          if (removeList.indexOf(theClass) !== -1) {
	            keep = false;
	          }
	        });
	        return keep;
	      });
	      newDom.forEach(function (el, index) {
	        el.children = _this6.removeElementsByClass(el.children, removeList);
	      });
	      return newDom;
	    }
	  }, {
	    key: 'removeElementsById',
	    value: function removeElementsById(dom) {
	      var _this7 = this;
	
	      var removeList = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
	
	      var newDom = JSON.parse(JSON.stringify(dom));
	      var remove = false;
	      newDom = newDom.filter(function (el) {
	        var keep = true;
	        el.ids.forEach(function (id) {
	          if (removeList.indexOf(id) !== -1) {
	            keep = false;
	          }
	        });
	        return keep;
	      });
	      newDom.forEach(function (el, index) {
	        el.children = _this7.removeElementsById(el.children, removeList);
	      });
	      return newDom;
	    }
	  }, {
	    key: 'extractByClass',
	    value: function extractByClass(dom) {
	      var _this8 = this;
	
	      var extractList = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
	
	      var newDom = JSON.parse(JSON.stringify(dom));
	      var domLength = newDom.length - 1;
	      var extracted = [];
	
	      function extract(dom, extractList) {
	        var extracted = [];
	        dom.forEach(function (el) {
	          el.classes.forEach(function (theClass) {
	            if (extractList.indexOf(theClass) !== -1) {
	              extracted.push(el);
	            }
	          });
	          extracted = extracted.concat(extract(el.children, extractList));
	        });
	        return extracted;
	      }
	
	      extracted = extracted.concat(extract(newDom, extractList));
	      newDom = this.removeElementsByClass(newDom, extractList);
	      newDom = newDom.concat(extracted);
	      newDom.forEach(function (el, index) {
	        if (index > domLength) {
	          el.children = _this8.removeElementsByClass(el.children, extractList);
	        }
	      });
	      return newDom;
	    }
	  }, {
	    key: 'extractById',
	    value: function extractById(dom) {
	      var _this9 = this;
	
	      var extractList = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
	
	      var newDom = JSON.parse(JSON.stringify(dom));
	      var domLength = newDom.length - 1;
	      var extracted = [];
	
	      function extract(dom, extractList) {
	        var extracted = [];
	        dom.forEach(function (el) {
	          el.ids.forEach(function (id) {
	            if (extractList.indexOf(id) !== -1) {
	              extracted.push(el);
	            }
	          });
	          extracted = extracted.concat(extract(el.children, extractList));
	        });
	        return extracted;
	      }
	
	      extracted = extracted.concat(extract(newDom, extractList));
	      newDom = this.removeElementsById(newDom, extractList);
	      newDom = newDom.concat(extracted);
	      newDom.forEach(function (el, index) {
	        if (index > domLength) {
	          el.children = _this9.removeElementsById(el.children, extractList);
	        }
	      });
	      return newDom;
	    }
	  }, {
	    key: 'reduceSiblings',
	    value: function reduceSiblings(dom) {
	      var _this10 = this;
	
	      var newDom = JSON.parse(JSON.stringify(dom));
	      var removeIndexes = [];
	      if (newDom.length > 1) {
	        newDom = newDom.filter(function (el, index, arr) {
	          var filter = true;
	          for (var i = index; i < arr.length; i++) {
	            if (i + 1 !== arr.length && _this10.compareElements(el, arr[i + 1])) {
	              filter = false;
	            }
	          }
	          return filter;
	        });
	      }
	      newDom.forEach(function (el) {
	        el.children = _this10.reduceSiblings(el.children);
	      });
	
	      return newDom;
	    }
	  }, {
	    key: 'combineSimilarParents',
	    value: function combineSimilarParents(dom) {
	      var _this11 = this;
	
	      var newDom = JSON.parse(JSON.stringify(dom));
	      if (newDom.length > 1) {
	        newDom = newDom.filter(function (el, index, arr) {
	          var filter = true;
	          for (var i = index; i < arr.length; i++) {
	            if (i + 1 !== arr.length && _this11.compareElementsWithoutChildren(el, arr[i + 1])) {
	              arr[i + 1].children = arr[i + 1].children.concat(el.children);
	              filter = false;
	            }
	          }
	          return filter;
	        });
	      }
	      newDom.forEach(function (el) {
	        el.children = _this11.combineSimilarParents(el.children);
	      });
	
	      return newDom;
	    }
	  }, {
	    key: 'convertBEM',
	    value: function convertBEM(dom, parentString) {
	      var _this12 = this;
	
	      var newDom = JSON.parse(JSON.stringify(dom));
	
	      newDom = newDom.map(function (el) {
	        return _this12.convertBEMRecursive(el);
	      });
	
	      return newDom;
	    }
	  }, {
	    key: 'convertBEMRecursive',
	    value: function convertBEMRecursive(parent) {
	      var _this13 = this;
	
	      parent.children = parent.children.map(function (el) {
	        return _this13.convertBEMRecursive(el);
	      });
	
	      var bemParentClassIndex = -1;
	      parent.children.forEach(function (child) {
	        var isBemChild = false;
	        var bemClassIndex = -1;
	        child.classes = child.classes.map(function (childClass, childClassIndex) {
	          var childClassOutput = childClass;
	          parent.classes.forEach(function (parentClass, index) {
	            if (childClassOutput.indexOf(parentClass + '__') !== -1) {
	              isBemChild = true;
	              childClassOutput = childClassOutput.replace(parentClass + '__', '&__');
	              bemParentClassIndex = index;
	              bemClassIndex = childClassIndex;
	            }
	          });
	          return childClassOutput;
	        });
	
	        if (isBemChild) {
	          child.tag = '';
	          if (bemClassIndex > 0) {
	            var bemClass = child.classes[bemClassIndex];
	            var newClasses = [];
	            child.classes = child.classes.slice(bemClassIndex, bemClassIndex);
	
	            newClasses.push(bemClass);
	            // newClasses.concat(child.classes)
	            child.classes = newClasses;
	          }
	        }
	      });
	      //move bem parent to end of array
	      if (bemParentClassIndex > 0) {
	        var bemParent = parent.classes[bemParentClassIndex];
	        parent.classes = parent.classes.slice(bemParentClassIndex, bemParentClassIndex);
	        parent.classes.push(bemParent);
	      }
	
	      return parent;
	    }
	  }, {
	    key: 'compareElements',
	    value: function compareElements(el1, el2) {
	
	      if (JSON.stringify(el1) === JSON.stringify(el2)) {
	        return true;
	      } else {
	        return false;
	      }
	    }
	  }, {
	    key: 'compareElementsWithoutChildren',
	    value: function compareElementsWithoutChildren(el1, el2) {
	
	      var tagsMatch = el1.tag === el2.tag;
	      var idsMatch = JSON.stringify(el1.ids) === JSON.stringify(el2.ids);
	      var classesMatch = JSON.stringify(el1.classes) === JSON.stringify(el2.classes);
	      if (tagsMatch && idsMatch && classesMatch) {
	        return true;
	      } else {
	        return false;
	      }
	    }
	  }, {
	    key: 'toArray',
	    value: function toArray(obj) {
	      var array = [];
	      // iterate backwards ensuring that length is an UInt32
	      for (var i = obj.length >>> 0; i--;) {
	        array[i] = obj[i];
	      }
	      return array;
	    }
	  }, {
	    key: 'extractHtml',
	    value: function extractHtml(inputHtml) {
	      var _this14 = this;
	
	      var parsedHtml = typeof inputHtml === 'string' ? $.parseHTML(inputHtml) : inputHtml;
	      var nodes = [];
	      $.each(parsedHtml, function (i, el) {
	        if (el.nodeName !== '#text') {
	
	          var ids = el.id === "" ? [] : el.id.split(' ');
	          nodes.push({
	            tag: el.nodeName.toLowerCase(),
	            classes: _this14.toArray(el.classList),
	            ids: ids,
	            children: _this14.extractHtml(el.children)
	          });
	        }
	      });
	      return nodes;
	    }
	  }, {
	    key: 'convertToScss',
	    value: function convertToScss(DOMObject) {
	      var _this15 = this;
	
	      var nest = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
	
	      var sass = "";
	      var spacing = '  '.repeat(nest);
	      $.each(DOMObject, function (i, el) {
	        var classesDotted = el.classes.map(function (theclass) {
	          if (theclass.indexOf('&') === -1) {
	            theclass = '.' + theclass;
	          }
	
	          return theclass;
	        });
	        var classes = classesDotted.length > 0 ? classesDotted.join('') : '';
	        var ids = el.ids.length ? '#' + el.ids.join('#') : '';
	        var tag = el.tag;
	        if (classes !== '' || ids !== '' || tag !== '') {
	          sass = sass.concat('\n' + spacing + el.tag + ids + classes + ' {\n' + spacing + '  ' + _this15.convertToScss(el.children, nest + 1) + '\n' + spacing + '}');
	        } else {
	          sass = sass.concat(spacing + '  ' + _this15.convertToScss(el.children, nest));
	        }
	      });
	      return sass;
	    }
	  }]);
	
	  return HtmlToScss;
	}();
	
	exports.default = HtmlToScss;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(3);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(5)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/sass-loader/index.js!./main.scss", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/sass-loader/index.js!./main.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(4)();
	// imports
	
	
	// module
	exports.push([module.id, ".mdl-textfield.is-focused input {\n  border-bottom: none; }\n\n.mdl-textfield.is-focused .mdl-textfield__label:after {\n  bottom: 14px; }\n\n.text-area-tt {\n  position: absolute;\n  right: 0;\n  top: 40%;\n  font-size: 16px; }\n", ""]);
	
	// exports


/***/ },
/* 4 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];
	
		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
	
		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];
	
	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
	
		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();
	
		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";
	
		var styles = listToStyles(list);
		addStylesToDom(styles, options);
	
		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}
	
	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}
	
	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}
	
	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}
	
	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}
	
	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}
	
	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}
	
	function addStyle(obj, options) {
		var styleElement, update, remove;
	
		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}
	
		update(obj);
	
		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}
	
	var replaceText = (function () {
		var textStore = [];
	
		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();
	
	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;
	
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}
	
	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
	
		if(media) {
			styleElement.setAttribute("media", media)
		}
	
		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}
	
	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;
	
		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}
	
		var blob = new Blob([css], { type: "text/css" });
	
		var oldSrc = linkElement.href;
	
		linkElement.href = URL.createObjectURL(blob);
	
		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map
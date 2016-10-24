
import HtmlToScss from './src/htmltoscss'
require('./src/sass/main.scss')
const htmlToScss = new HtmlToScss();


//+++++++++++++++++++++++++++++++++++++++++
Vue.component('ace-editor', {
  template: '<div :id="editorId" :style="styleObject" class="ace-editor-component"></div>',
  props: {
    code: {
      type: String,
      default: '<div></div>',
      required: false,
      validator(value) {
        return (typeof value === 'string')
      }
    },
    mode: {
      type: String,
      default: 'html',
      required: false,
      validator(value) {
        return (typeof value === 'string')
      }
    },
    theme: {
      type: String,
      default: 'monokai',
      required: false,
      validator(value) {
        return (typeof value === 'string')
      }
    }
  },
  data() {
    return {
      editorId: 'editor' + Date.now(),
      editor: null,
      internalCode: '',
      styleObject: {
        width: '100%',
        height: '400px'
      }
    }
  },
  mounted() {
    this.editor = ace.edit(this.editorId);
    this.internalCode = this.code
    this.editor.setValue(this.internalCode);
    this.editor.setOptions({
      autoScrollEditorIntoView: true,
      theme: "ace/theme/" + this.theme,
      showPrintMargin: false,
      mode: "ace/mode/" + this.mode
    })
    this.editor.getSession().on('change', this.onChange)
  },
  methods: {
    onChange(event) {
      this.internalCode = this.editor.getValue()
      this.$emit('onchange', this.editor.getValue())
    }
  },
  watch:{
    code(val){
      if(val !== this.internalCode) this.editor.setValue(val)
      
    }
  }
})

Vue.component('array-string-input', {
  template: '#array-string-input-template',
  props: ['value'],
  data() {
    return {
      internalOption: this.value.join(' ')
    }
  },
  watch: {
    internalOption(val) {
      this.value.splice(0)
      this.value.push.apply(this.value, val.split(' '))
    }
  }

})

const VueApp = new Vue({
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
    convert() {
      let html = this.htmlData
      let extractedHtml = htmlToScss.extractHtml(html);

      let tagsHidden = htmlToScss.hideTags(extractedHtml, this.options.hideTagsInclude, this.options.hideTagsExclude, this.options.hideTagsAll)

      let idsHidden = htmlToScss.hideIds(tagsHidden, this.options.hideIdsInclude, this.options.hideIdsExclude, this.options.hideIdsAll)

      let hiddenByClass = htmlToScss.hideElementsByClass(idsHidden, this.options.hideElementsByClass)

      let classesHidden = htmlToScss.hideClasses(hiddenByClass, this.options.hideClassesInclude, this.options.hideClassesExclude, this.options.hideClassesAll)

      let hiddenById = htmlToScss.hideElementsById(classesHidden, this.options.hideElementsById)

      let removedByClass = htmlToScss.removeElementsByClass(hiddenById, this.options.removeElementsByClass)

      let removedById = htmlToScss.removeElementsById(removedByClass, this.options.removeElementsById)

      let extracted = htmlToScss.extractByClass(removedById, this.options.extractElementsByClass)

      let extractedById = htmlToScss.extractById(extracted, this.options.extractElementsById)

      let reduced = (this.options.reduceSiblings) ? htmlToScss.reduceSiblings(extractedById) : extractedById

      let combinedParents = (this.options.combineParents) ? htmlToScss.combineSimilarParents(reduced) : reduced

      let BEMConverted = (this.options.convertBEM) ? htmlToScss.convertBEM(combinedParents) : combinedParents
      let scss = htmlToScss.convertToScss(BEMConverted);
      this.scss = scss
    },

    htmlUpdated(newHtml) {
      this.htmlData = newHtml
    },
  },
  created() {
    this.htmlData = this.options.defaultHtml;
  },
  watch: {
    options: {

      handler(val, oldVal) {
        return val
      },
      deep: true
    }
  }
})
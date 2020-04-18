'use strict';

let Config = {
  defaults    : {
    done    : "false",
    content : "",
    idLength: 8
  },
  symbols     : {
    done  : "✔",
    remove: "&#x274C;",
    reopen: "↺"
  },
  elementNames: {
    mainDiv     : 'main-div',
    topDiv      : 'top-div',
    addDiv      : 'add-div',
    saveDiv     : 'save-div',
    listDiv     : 'list-div',
    textarea    : 'textarea',
    options     : 'options',
    doneBt      : 'done-bt',
    doneBtHtml  : 'done-bt-html',
    removeBt    : 'remove-bt',
    removeBtHtml: 'remove-bt-html'
  },
  get itemChildNames() {
    return [
      this.elementNames.textarea, this.elementNames.options,
      this.elementNames.doneBt, this.elementNames.doneBtHtml,
      this.elementNames.removeBt, this.elementNames.removeBtHtml
    ]
  },
  get hotAreas() {
    return [
      this.elementNames.addDiv, this.elementNames.saveDiv,
      this.elementNames.textarea, this.elementNames.doneBt,
      this.elementNames.doneBtHtml, this.elementNames.removeBt,
      this.elementNames.removeBtHtml
    ]
  }
};

export {Config};

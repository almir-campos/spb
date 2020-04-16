'use strict';

let config = {
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
    listDiv     : 'list-div',
    textarea    : 'textarea',
    options     : 'options',
    doneBt      : 'doneBt',
    doneBtHtml  : 'doneBtHtml',
    removeBt    : 'remove-bt',
    removeBtHtml: 'remove-bt-html'
  }
};

export {config};

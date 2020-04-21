'use strict';
import {konz} from './constants.js';

export class Form {
  static submit() {
    let valid = Form.validateInputs();
    console.log('valid', valid);
    if (valid) {
      console.log('Valid', 'Submitting...');
    }
  }

  static validateInputs() {
    const form = konz.form;
    let valid  = true;

    function containsBadWords(elem) {
      return form[elem].value.toUpperCase().containsBadWords();
    }

    let err;
    ['top', 'url', 'btm'].forEach(value => {
      if (containsBadWords(value)) {
        err                 = value + 'Err';
        form[err].innerText = konz.errMsg.badWords;
        valid               = false;
      }
    });

    return valid;
  }
}

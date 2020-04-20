'use strict';
import { konz } from './constants.js';
export class Form {
  static validateInputs() {
    const form = konz.form;
    form.topErr.innerText = form.top.value.toUpperCase().containsBadWords() ?
                 "Please, avoid to use bad words" : "";
    form.urlErr.innerText = form.url.value.toUpperCase().containsBadWords() ?
                 "Please, avoid to use bad words" : "";
    form.btmErr.innerText = form.btm.value.toUpperCase().containsBadWords() ?
                 "Please, avoid to use bad words" : "";
  }
}

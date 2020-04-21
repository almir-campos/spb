'use strict';

import {Form as formjs} from './form.js';
import {konz}           from "./constants.js";
import {Utils}          from "./utils.js";

konz.init();

class Main {

  static init() {
    Main.addSubmitListener();
    Main.addInputListeners();
  }

  static addSubmitListener() {
    konz.form.form
        .addEventListener('submit', (e) => {
          e.preventDefault();
          formjs.submit();
        });
  }

  static addInputListeners() {
    konz.form.inputs.forEach((inpt) => {
      let errKey;
      inpt.addEventListener('click', (e) => {
        errKey                      =
          Utils.htmlIdToJs('meme-', e.target.id) + 'Err';
        konz.form[errKey].innerText = '';
      });
      inpt.addEventListener('focusout', (e) => {
        errKey = Utils.htmlIdToJs('meme-', e.target.id) + 'Err';
        formjs.validateInputs();
      });
    });
  }
}

Main.init();

export {Main}



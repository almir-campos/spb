'use strict';

import {Form as formjs} from './form.js';
import {konz}           from "./constants.js";
import {Utils}          from "./utils.js";

konz.init();

konz.form.form.addEventListener('submit', (e) => {
  e.preventDefault();
  formjs.validateInputs();
});

konz.form.inputs.forEach((i) => {
  let errKey;
  i.addEventListener('click', (e) => {
    errKey                      =
      Utils.htmlIdToJs('meme-', e.target.id) + 'Err';
    konz.form[errKey].innerText = '';
  });
  i.addEventListener('focusout', (e) => {
    errKey = Utils.htmlIdToJs('meme-', e.target.id) + 'Err';
    formjs.validateInputs();
  });
});


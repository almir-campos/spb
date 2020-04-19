'use strict';

console.clear();
import { Form as formjs } from './form.js';

const formDiv = document.querySelector('#form-div');
// let topErr = document.querySelector('#meme-top-err').dataset.name;
let topErr = document.querySelector('#meme-top-err');
let urlErr = document.querySelector('#meme-url-err');
let btmErr = document.querySelector('#meme-btm-err');
formDiv.addEventListener('submit', (e) => {
  console.log('dataset', topErr );
  const valid = formjs.validate(e);
  console.log('valid', valid);
  topErr.innerText=valid.top;
  urlErr.innerText=valid.url;
  btmErr.innerText=valid.btm;
  e.preventDefault();
});

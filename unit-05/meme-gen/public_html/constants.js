'use strict';

const form   = document.querySelector('#meme-form');
const top    = document.querySelector('#meme-top');
const topErr = document.querySelector('#meme-top-err');
const url    = document.querySelector('#meme-url');
const urlErr = document.querySelector('#meme-url-err');
const btm    = document.querySelector('#meme-btm');
const btmErr = document.querySelector('#meme-btm-err');

export class konz {

  static init() {
    konz.form = {
      form  : form,
      top   : top,
      topErr: topErr,
      url   : url,
      urlErr: urlErr,
      btm   : btm,
      btmErr: btmErr,
      inputs: [
        top, url, btm
      ],
      errs  : [
        topErr, urlErr, btmErr
      ]
    };
    console.log('konz.form', JSON.stringify(konz.form));
  }
}


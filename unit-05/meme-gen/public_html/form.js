'use strict';

export class Form {
  static validate(e){
    console.log( 'Form/validate');
    const form = e.target;
    let errors = {
      top: '', url: '', btm: ''
    };
    if ( form.meme_top.value.toUpperCase().indexOf('BAD WORD') !== -1) {
      errors.top = "Please, don't use bad words";
    }
    if ( form.meme_url.value.toUpperCase().indexOf('BAD WORD') !== -1) {
      errors.url = "Please, don't use bad words";
    }
    if ( form.meme_btm.value.toUpperCase().indexOf('BAD WORD') !== -1) {
      errors.btm = "Please, don't use bad words";
    }
    return errors;
  }
}

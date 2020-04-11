'use strict';
import {IndexUtils} from '../index/IndexUtils.js';
// import { ListUtils }  from '../item/ListUtils.js';

/**
 * The application's main listener. This script is the only one
 * that is called from the index.html file. All the others come
 * from this file.
 */
window.addEventListener('DOMContentLoaded', function () {
  IndexUtils.init();
  localStorage.clear();
  // IndexUtils.tests();
});



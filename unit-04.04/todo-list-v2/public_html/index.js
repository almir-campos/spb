'use strict';

import { MainDiv } from './main/MainDiv.js';

/**
 * The application's main listener. This script is the only one
 * that is called from the index.html file. All the others come
 * from this file.
 */
window.addEventListener('DOMContentLoaded', function () {
  localStorage.clear();
  MainDiv.init();
});



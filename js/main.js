'use strict';

import { aaa } from './aaa.js';
import { zzz } from './zzz.js';


// const attachEventCallback = (theid, callback, eventType = 'click') => {
//   const tmp = document.getElementById(theid);
//   tmp.addEventListener(eventType, callback);
// };




const start = () => {

  let tmp = "working";
  console.log(`JS is ${tmp}`);

  let msg = "same message";
  aaa(msg);
  zzz(msg);


};


window.addEventListener('DOMContentLoaded', start);


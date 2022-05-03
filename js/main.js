'use strict';



const attachEventCallback = (theid, callback, eventType = 'click') => {
  const tmp = document.getElementById(theid);
  tmp.addEventListener(eventType, callback);
};




const start = () => {

  let tmp = "working";
  console.log(`JS is ${tmp}`);

};


window.addEventListener('DOMContentLoaded', start);


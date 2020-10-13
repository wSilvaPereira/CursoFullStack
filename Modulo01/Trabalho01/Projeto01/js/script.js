window.addEventListener('load', start);

var rangeR = null;
var rangeG = null;
var rangeB = null;

function start() {
  preventFormSubmit();

  rangeR = document.querySelector('#rangeR');
  rangeG = document.querySelector('#rangeG');
  rangeB = document.querySelector('#rangeB');

  activateForm();
  Render();
}

function preventFormSubmit() {
  function handleFormSubmit(event) {
    event.preventDefault();
  }
  var form = document.querySelector('form');
  form.addEventListener('submit', handleFormSubmit);
}

function activateForm() {
  rangeR.addEventListener('change', changeRangeR);
  rangeG.addEventListener('change', changeRangeG);
  rangeB.addEventListener('change', changeRangeB);
  changeRangeR();
  changeRangeG();
  changeRangeB();
}

function Render() {
  var resultColor = document.querySelector('#resultColor');
  resultColor.style.backgroundColor =
    'rgb(' + rangeR.value + ', ' + rangeG.value + ', ' + rangeB.value + ')';

  // valueR.style.backgroundColor =
  //   'rgb(' + rangeR.value + ', ' + 0 + ', ' + 0 + ')';
  // valueG.style.backgroundColor =
  //   'rgb(' + 0 + ', ' + rangeG.value + ', ' + 0 + ')';
  // valueB.style.backgroundColor =
  //   'rgb(' + 0 + ', ' + 0 + ', ' + rangeB.value + ')';

  // valueR.style.color = 'white';
  // valueG.style.color = 'white';
  // valueB.style.color = 'white';

  //console.log(resultColor.style.backgroundColor);
}

function changeRangeR() {
  var valueR = document.querySelector('#valueR');
  valueR.value = rangeR.value;
  Render();
}
function changeRangeG() {
  var valueG = document.querySelector('#valueG');
  valueG.value = rangeG.value;
  Render();
}
function changeRangeB() {
  var valueB = document.querySelector('#valueB');
  valueB.value = rangeB.value;
  Render();
}

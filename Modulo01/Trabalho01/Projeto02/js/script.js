window.addEventListener('load', start);

var types = ['R', 'G', 'B'];

function start() {
  preventFormSubmit();
  drawHandles();
}

function preventFormSubmit() {
  function handleFormSubmit(event) {
    event.preventDefault();
  }
  var form = document.querySelector('form');
  form.addEventListener('submit', handleFormSubmit);
}

function drawHandles() {
  function paintDiv() {
    var rangeR = document.querySelector('#rangeR');
    var rangeG = document.querySelector('#rangeG');
    var rangeB = document.querySelector('#rangeB');
    var resultColor = document.querySelector('#resultColor');
    resultColor.style.backgroundColor =
      'rgb(' + rangeR.value + ', ' + rangeG.value + ', ' + rangeB.value + ')';
  }

  function createRange(type) {
    function changePosition(event) {
      var type = event.target.id;
      type = type[type.length - 1];

      var inputChanged = document.querySelector('#input' + type);
      inputChanged.value = event.target.value;
      paintDiv();
    }

    var range = document.createElement('input');
    //prettier-ignore
    // range.innerHTML = '<input id="range' + type +'" type="range" min="0" max="255" value="0" />';
    range.id = 'range' + type;
    range.type = 'range';
    range.min = '0';
    range.max = '255';
    range.value = '0';
    range.addEventListener('change', changePosition);
    return range;
  }

  function createInput(type) {
    var input = document.createElement('input');
    //prettier-ignore
    //input.innerHTML = '<input class="inputNumber" id="input' + type +'" type="number" readonly disabled>';
    input.id = 'input' + type;
    input.type = 'number';
    input.readOnly = 'true';
    input.disabled = 'true';
    input.classList.add('inputNumber');

    return input;
  }

  var form = document.querySelector('form');

  var table = document.createElement('table');

  for (i = 0; i < types.length; i++) {
    var currentType = types[i];

    var tr = document.createElement('tr');

    var tdName = document.createElement('td');
    tdName.textContent = typeToName(currentType);

    var tdRange = document.createElement('td');
    tdRange.appendChild(createRange(currentType));

    var tdInput = document.createElement('td');
    tdInput.appendChild(createInput(currentType));

    tr.appendChild(tdName);
    tr.appendChild(tdRange);
    tr.appendChild(tdInput);

    table.appendChild(tr);
  }
  form.appendChild(table);

  var div = document.createElement('div');
  //div.innerHTML = '<div id="resultColor"></div>';
  div.id = 'resultColor';
  form.appendChild(div);
  paintDiv();
}

function typeToName(type) {
  var r = '';
  //prettier-ignore
  switch (type) {
    case 'R': r = '(R) Vermelho'; break;
    case 'G': r = '(G) Verde'; break;
    case 'B': r = '(B) Azul'; break;
    default: r = '';
  }
  return r;
}

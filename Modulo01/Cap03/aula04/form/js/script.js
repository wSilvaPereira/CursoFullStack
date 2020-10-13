window.addEventListener('load', start);

function start() {
  console.log('Aula 04');
  console.log('Página totalmemte carregada');

  var nameInput = document.querySelector('#nameInput');
  nameInput.addEventListener('keyup', countName);

  var form = document.querySelector('form');
  form.addEventListener('submit', preventSubmit);
}

function countName(event) {
  var count = event.target.value.length;

  var span = document.querySelector('#nameLength');
  span.textContent = count;
}

function preventSubmit(event) {
  event.preventDefault();
}

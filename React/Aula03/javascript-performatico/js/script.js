window.addEventListener('load', start);

function start() {
  console.log('DOM carregado');
  const clickButton = document.querySelector('#clickButton');
  clickButton.addEventListener('click', handleButtonClick);
}

function handleButtonClick() {
  render(getNewTimestamp());
}

function render(item) {
  const lista = document.querySelector('#data');
  const itemList = document.createElement('li');
  itemList.textContent = item;
  lista.appendChild(itemList);
}

window.addEventListener('load', start);

let clickArray = [];

function start() {
  console.log('DOM carregado');
  const clickButton = document.querySelector('#clickButton');
  clickButton.addEventListener('click', handleButtonClick);
}

function handleButtonClick() {
  clickArray.push(getNewTimestamp());

  render();
}

function render() {
  const lista = document.querySelector('#data');
  lista.innerHTML = '';
  clickArray.forEach((item) => {
    const itemList = document.createElement('li');
    itemList.textContent = item;

    lista.appendChild(itemList);
  });

  // document.title = clickArray.length;
}

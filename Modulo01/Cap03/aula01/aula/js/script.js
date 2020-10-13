var title = document.querySelector('h1');
title.textContent = 'William da Silva Pereira';

var city = document.querySelector('#city');
city.textContent = 'Araçatuba-SP';

var DataArray = document.querySelectorAll('.data');
DataArray = Array.from(DataArray);

for (var i = 0; i < DataArray.length; i++) {
  var currentElement = DataArray[i];
  currentElement.classList.add('emphasis');
}

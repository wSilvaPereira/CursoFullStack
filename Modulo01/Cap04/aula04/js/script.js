let globalNames = ['Um', 'Dois', 'Três', 'Quatro'];
let inputName = null;
let isEditing = false;
let currentIndex = null;

window.addEventListener('load', () => {
  inputName = document.querySelector('#inputName');

  preventFormSubmit();
  activateInput();
  render();
});

function preventFormSubmit() {
  // function handleFormSubmit(event) {
  //   event.preventDefault();
  // }
  var form = document.querySelector('form');
  // form.addEventListener('submit', handleFormSubmit);
  form.addEventListener('submit', (event) => {
    event.preventDefault();
  });
}

function activateInput() {
  function insertName(newName) {
    // globalNames.push(newName);
    globalNames = [...globalNames, newName];
  }

  function updateName(newName) {
    globalNames[currentIndex] = newName;
    //console.log(name);
  }

  function handleTyping(event) {
    var hasText = !!event.target.value && event.target.value.trim() !== '';

    if (!hasText) {
      clearInput();
      return;
    }

    if (event.key === 'Enter' && event.target.value.trim() !== '') {
      if (isEditing) {
        updateName(event.target.value);
      } else {
        insertName(event.target.value);
      }
      isEditing = false;
      clearInput();
      render();
    }
  }

  inputName.addEventListener('keyup', handleTyping);
  inputName.focus();
}

function render() {
  function createDeleteButton(index) {
    function deleteName() {
      // globalNames.splice(index, 1);
      // globalNames = globalNames.filter((name, i) => {
      //   return i !== index;
      // });
      globalNames = globalNames.filter((_, i) => i !== index);
      render();
    }

    var button = document.createElement('button');
    button.textContent = 'X';
    button.classList.add('deleteButton');

    button.addEventListener('click', deleteName);

    return button;
  }

  function createSpan(name, index) {
    function editItem() {
      inputName.value = name;
      inputName.focus();
      isEditing = true;
      currentIndex = index;
    }

    var span = document.createElement('span');
    span.textContent = name;
    span.classList.add('clickable');
    span.addEventListener('click', editItem);
    return span;
  }

  var divnames = document.querySelector('#names');

  divnames.innerHTML = '';
  // divnames.textContent = '';
  console.log(divnames);

  var ul = document.createElement('ul');

  for (var i = 0; i < globalNames.length; i++) {
    var currentName = globalNames[i];

    var li = document.createElement('li');

    li.appendChild(createDeleteButton(i));
    li.appendChild(createSpan(currentName, i));

    ul.appendChild(li);
  }

  divnames.appendChild(ul);
}

// function clearInput() {
//   inputName.value = '';
//   inputName.focus();
// }
const clearInput = () => {
  inputName.value = '';
  inputName.focus();
};

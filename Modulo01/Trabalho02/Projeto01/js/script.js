let listUser = [];
let selectedUser = [];

let inputSearch = null;
let buttonSearch = null;

let divUser = null;
let divStatistics = null;

let tabCountUsers = null;
let tabCountMale = null;
let tabCountFemale = null;
let tabTotalAge = null;
let tabAverageAge = null;

let countUsers = 0;
let countMale = 0;
let countFemale = 0;
let totalAge = 0;
let averageAge = 0;

let numberFormat = null;

window.addEventListener('load', () => {
  divUser = document.querySelector('#divUser');
  divStatistics = document.querySelector('#divStatistics');

  inputSearch = document.querySelector('#inputSearch');
  buttonSearch = document.querySelector('#buttonSearch');

  tabCountUsers = document.querySelector('#tabCountUsers');
  tabCountMale = document.querySelector('#tabCountMale');
  tabCountFemale = document.querySelector('#tabCountFemale');
  tabTotalAge = document.querySelector('#tabTotalAge');
  tabAverageAge = document.querySelector('#tabAverageAge');

  numberFormat = Intl.NumberFormat('pt-BR');

  prepareHandles();

  await fechtUser();
});

async function fechtUser() {
  // var init = { mode: 'no-cors' };
  const res = await fetch(
    'https://randomuser.me' +
      '/api/?seed=javascript&results=' +
      '100&nat=BR&noinfo'
  );
  const json = await res.json();

  listUser = json.results.map((user) => {
    const { gender, name, dob, picture } = user;
    return {
      gender,
      completeName: name.first + ' ' + name.last,
      age: dob.age,
      picture: picture.thumbnail,
    };
  });
  // console.log(json);
  // console.log(listUser);

  render();
}

function prepareHandles() {
  function onKeyUp(event) {
    if (event.key === 'Enter' && event.target.value.trim() !== '') {
      doSearch(event.target.value);
    }
  }

  function onClick() {
    doSearch(inputSearch.value);
  }

  inputSearch.addEventListener('keyup', onKeyUp);
  buttonSearch.addEventListener('click', onClick);
}

function doSearch(text) {
  selectedUser = listUser
    .filter((user) => {
      return user.completeName.toLowerCase().trim().includes(text.toLowerCase().trim());
    })
    .sort((a, b) => {
      return a.completeName.localeCompare(b.completeName);
    });

  countMale = 0;
  countFemale = 0;
  averageAge = 0;
  countUsers = 0;

  selectedUser.forEach((user) => {
    if (user.gender === 'male') {
      countMale++;
    } else if (user.gender === 'female') {
      countFemale++;
    }
  });

  totalAge = selectedUser.reduce((accumulator, current) => {
    return accumulator + current.age;
  }, 0);

  countUsers = countMale + countFemale;

  if (countUsers > 0) {
    averageAge = totalAge / countUsers;
  }

  render();
}
function render() {
  tabCountUsers.textContent = countUsers;
  tabCountMale.textContent = countMale;
  tabCountFemale.textContent = countFemale;
  tabTotalAge.textContent = numberFormat.format(totalAge);
  tabAverageAge.textContent = numberFormat.format(averageAge);

  divUser.innerHTML = '';

  selectedUser.forEach((user) => {
    divPhotoName = document.createElement('div');
    divPhotoName.className = 'divPhotoName';

    img = document.createElement('img');
    img.src = user.picture;
    img.alt = user.completeName;
    divPhotoName.appendChild(img);

    description = document.createElement('h5');
    description.textContent = `${user.completeName}, ${user.age} anos`;
    divPhotoName.appendChild(description);

    divUser.appendChild(divPhotoName);
  });
}

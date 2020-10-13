window.addEventListener('load', () => {
  doSpread();
  doRest();
  doDestructuring();
});

function doSpread() {
  const marriedMen = people.results.filter((person) => {
    return person.name.title === 'Mr';
  });
  console.log(marriedMen);
  const marriedWomen = people.results.filter((person) => {
    return person.name.title === 'Ms';
  });
  console.log(marriedWomen);

  const marriedPeople = [...marriedMen, ...marriedWomen];
  console.log(marriedPeople);
}

function doRest() {
  console.log(infiniteSum(1, 2, 1000));
}

function infiniteSum(...numbers) {
  return numbers.reduce((acc, curr) => acc + curr, 0);
}

function doDestructuring() {
  const first = people.results[0];
  // repetitivo
  // const username = first.login.username;
  // const password = first.login.password;

  // Destructuring
  const { username, password } = first.login;

  console.log(username);
  console.log(password);
}

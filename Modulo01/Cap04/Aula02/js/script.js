'use strict';

//Array com JavaScript Modernos
window.addEventListener('load', () => {
  doMap();
  doFilter();
  doForEach();
  doReduce();
  doFind();
  doSome();
  doEvery();
  doSort();
});

// MAP
function doMap() {
  var nameEmailArray = people.results.map((person) => {
    return {
      name: person.name,
      email: person.email,
      age: person.dob.age,
    };
  });
  console.log('Map');
  console.log(nameEmailArray);
  return nameEmailArray;
}

// FILTER
function doFilter() {
  // const mappedPeople = doMap();
  // const olderThan18 = people.results.filter((person) => {
  //   return person.age > 60;
  // });
  const olderThan18 = people.results.filter((person) => {
    return person.age > 60;
  });
  console.log('Filter');
  console.log(olderThan18);
  return olderThan18;
}

// FOREACH
function doForEach() {
  const mappedPeople = doMap();
  mappedPeople.forEach((person) => {
    person.nameSize =
      person.name.title.length +
      person.name.first.length +
      person.name.last.length;
  });
  console.log('ForEach');
  console.log(mappedPeople);
}

// REDUCE
function doReduce() {
  const totalAges = people.results.reduce((accumulator, current) => {
    return accumulator + current.dob.age;
  }, 0);
  console.log(totalAges);
}

// FIND
function doFind() {
  const found = people.results.find((person) => {
    return person.location.state === 'Minas Gerais';
  });
  console.log(found);
}

// SOME
function doSome() {
  const found = people.results.some((person) => {
    return person.location.state === 'Amazonas';
  });
  console.log(found);
}

// EVERY
function doEvery() {
  const every = people.results.every((person) => {
    return person.nat === 'BR';
  });
  console.log(every);
}

// SORT
function doSort() {
  const mappedNames = people.results
    .map((person) => {
      return { name: person.name.first };
    })
    .filter((person) => {
      return person.name.startsWith('A');
    })
    .sort((a, b) => {
      return a.name.localeCompare(b.name);
      // return b.name.length - a.name.length;
    });
  console.log(mappedNames);

  const mappedAges = people.results
    .map((person) => {
      return { name: person.name.first, age: person.dob.age };
    })
    .filter((person) => {
      return person.age > 30;
    })
    .sort((a, b) => {
      // var dif = a.age - b.age;
      // console.log(a.name.localeCompare(b.name));
      return a.age - b.age;
    });
  console.log(mappedAges);
}

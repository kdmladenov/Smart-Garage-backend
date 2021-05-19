"use strict";
const pesho = {
    name: 'Pesho',
    age: 35,
    engaged: true,
    test: () => console.log('test'),
    family: [{}, {}]
};
const func = (person) => {
    // asd
    person.name = null;
    if (Array.isArray(person.age) && person.age.length > 5) {
        return 5;
    }
    return person.age > 50;
};

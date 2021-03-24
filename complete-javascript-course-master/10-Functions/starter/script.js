'use strict';

// // Default Parameters
// const bookings = [];

// const createBooking = function (
//   flightNum,
//   numPassengers = 1,
//   price = 199 * numPassengers
// ) {
//   // ES5
//   // numPassengers = numPassengers || 1;
//   // price = price || 199;

//   const booking = {
//     flightNum,
//     numPassengers,
//     price,
//   };
//   console.log(booking);
//   bookings.push(booking);
// };

// createBooking('LH123');
// createBooking('LH123x', 2, 800);
// createBooking('LH123', 2);
// createBooking('LH123', 5);

// createBooking('LH123', undefined, 1000);

// // How Passing Arguments Works: Values vs. Reference
// const flight = 'LH234';
// const jonas = {
//   name: 'Jonas Schmedtmann',
//   passport: 24739479284,
// };

// const checkIn = function (flightNum, passenger) {
//   flightNum = 'LH999';
//   passenger.name = 'Mr. ' + passenger.name;

//   if (passenger.passport === 24739479284) {
//     alert('Checked in');
//   } else {
//     alert('Wrong passport!');
//   }
// };

// // checkIn(flight, jonas);
// // console.log(flight);
// // console.log(jonas);

// // Is the same as doing...
// // const flightNum = flight;
// // const passenger = jonas;

// const newPassport = function (person) {
//   person.passport = Math.trunc(Math.random() * 100000000000);
// };

// newPassport(jonas);
// checkIn(flight, jonas);

// const upperFirstWord = function (str) {
//   const [first, ...others] = str.split(' ');
//   return [first.toUpperCase(), ...others].join(' ');
// };

// // Higher-order function
// const transformer = function (str, fn) {
//   console.log(`Original string: ${str}`);
//   console.log(`Transformed string: ${fn(str)}`);

//   console.log(`Transformed by: ${fn.name}`);
// };

// transformer('JavaScript is the best!', upperFirstWord);
// transformer('JavaScript is the best!', oneWord);

// // JS uses callbacks all the time
// const high5 = function () {
//   console.log('👋');
// };
// document.body.addEventListener('click', high5);
// ['Jonas', 'Martha', 'Adam'].forEach(high5);

// // Functions Returning Functions
// const greet = function (greeting) {
//   return function (name) {
//     console.log(`${greeting} ${name}`);
//   };
// };

// const greeterHey = greet('Hey');
// greeterHey('Jonas');
// greeterHey('Steven');

// greet('Hello')('Jonas');

// // Challenge
// const greetArr = greeting => name => console.log(`${greeting} ${name}`);

// greetArr('Hi')('Jonas');

// The call and apply Methods
const lufthansa = {
  airline: 'Lufthansa',
  iataCode: 'LH',
  bookings: [],
  // book: function() {}
  book(flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
    );
    this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
  },
};

// lufthansa.book(239, 'Jonas Schmedtmann');
// lufthansa.book(635, 'John Smith');

const eurowings = {
  airline: 'Eurowings',
  iataCode: 'EW',
  bookings: [],
};

const book = lufthansa.book;

// // NÃO funciona chamar assim porque agora não é um método, mas uma função. Com isso o book aponta ara um this. Tem que informar explicitamente qual é
// // book(23, 'Sarah Williams');

// // Call method
// Para chamar corretamente a função book, o objeto que será manipulado tem que ser indicado explicitamente
// Essa indicação explicita pode ser feita de 3 modos - call, apply ou bind
// book.call(eurowings, 23, 'Sarah Williams');
// console.log(eurowings);

// book.call(lufthansa, 239, 'Mary Cooper');
// console.log(lufthansa);

const swiss = {
  airline: 'Swiss Air Lines',
  iataCode: 'LX',
  bookings: [],
};

// book.call(swiss, 583, 'Mary Cooper');

// // Apply method
const flightData = [583, 'George Cooper'];
// book.apply(swiss, flightData);
// console.log(swiss);

// book.call(swiss, ...flightData);

// ///////////////////////////////////////
// // The bind Method

book.call(eurowings, 23, 'Viviane Urbano');

const bookEW = book.bind(eurowings);
const bookLH = book.bind(lufthansa);
const bookLX = book.bind(swiss);

// Ao chamar a função bookEW, a sintaxe vai parecer familiar porque o this já foi definido como eurowings na linha acima - 163
bookEW(23, 'Steven Williams');

// esse tipo de pré-definição dos dados também é chamado de partial application
const bookEW23 = book.bind(eurowings, 23);
bookEW23('Jonas Schmedtmann');
bookEW23('Martha Cooper');

// With Event Listeners
lufthansa.planes = 300;
lufthansa.buyPlane = function () {
  //   console.log(this);

  this.planes++;
  console.log(this.planes);
};
// lufthansa.buyPlane();

document
  .querySelector('.buy')
  .addEventListener('click', lufthansa.buyPlane.bind(lufthansa));

// Partial application
const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));

// a ordem dos argumentos importa, já que é uma pré-definição
const addVAT = addTax.bind(null, 0.23);
// addVAT = value => value + value * 0.23;

console.log(addVAT(100));
console.log(addVAT(23));

const addTaxRate = function (rate) {
  return function (value) {
    return value + value * rate;
  };
};
const addVAT2 = addTaxRate(0.23);
console.log(addVAT2(100));
console.log(addVAT2(23));

// Coding Challenge #1
const poll = {
  question: 'What is your favourite programming Language?',
  option: ['0: Javascript', '1: Python', '2: Rust', '3: C++'],
  // gera um array só com zeros [0,0,0,0]
  answers: new Array(4).fill(0),
};

poll.registerNewAnswer = function () {
  let answer = Number(
    prompt(`What is your favourite programming Language?
  0: Javascript
  1: Python
  2: Rust
  3: C++

  Write option number
  `)
  );

  switch (answer) {
    case 0:
      poll.answers[0]++;
      break;
    case 1:
      poll.answers[1]++;
      break;
    case 2:
      poll.answers[2]++;
      break;
    case 3:
      poll.answers[3]++;
      break;
  }

  console.log(poll.answers);
};

document
  .querySelector('.poll')
  .addEventListener('click', poll.registerNewAnswer());

// let meu = poll.registerNewAnswer();

// document
//   .querySelector('.buy')
//   .addEventListener('click', lufthansa.buyPlane.bind(lufthansa));

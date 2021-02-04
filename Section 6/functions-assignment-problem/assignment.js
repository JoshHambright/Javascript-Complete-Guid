const sayHello = (name = 'HOOMAN') => {
  console.log('Hi ' + name);
};
const sayHello2 = (greeting, name) => {
  console.log(`${greeting} ${name}`);
};
const sayHello3 = () => {
  console.log('Hi user!');
};
const returnGreeting = (name) => {
  return `Hi ${name}`;
};
const multipleHello = (...strings) => {
  const checkString = (string) => {
    if (string === '') {
      return 'User';
    }
    return string;
  };
  for (string of strings) {
    console.log('Hi ' + checkString(string));
  }
};

function checkInput(cb, ...string) {
  let hasEmptyText = false;
  for (const text of string) {
    if (!text) {
      hasEmptyText = true;
      break;
    }
  }
  if (!hasEmptyText) {
    cb();
  }
}

sayHello('Josh');
sayHello2('Hello', 'Max');
sayHello3();
console.log(returnGreeting('Josh'));
sayHello();
multipleHello('bloop', 'blop', '', 'josh');

checkInput(
  () => {
    console.log('All not empty');
  },
  'hello',
  '12',
  'adsa',
  ''
);

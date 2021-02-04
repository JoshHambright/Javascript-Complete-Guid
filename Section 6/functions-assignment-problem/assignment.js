const sayHello = (name = 'HOOMAN') => {
  console.log('Hi ' + name);
}
const sayHello2 = (greeting,name) => {
  console.log(`${greeting} ${name}`);
}
const sayHello3 = () => {
  console.log('Hi user!');
}
const returnGreeting = (name) =>{
  return `Hi ${name}`;
}
const multipleHello = (...strings) => {
  
  const checkString = (string) => {
    if (string === ''){ 
      return 'User'
    }
    return string;
  }
  for (string of strings){
    
    console.log('Hi ' + checkString(string));
  }
}

sayHello('Josh');
sayHello2('Hello','Max');
sayHello3();
console.log(returnGreeting('Josh'));
sayHello();
multipleHello('bloop','blop','','josh');
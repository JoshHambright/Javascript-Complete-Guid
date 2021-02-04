// let name = 'Josh';

// if (name === 'Josh'){
//     let hobbies = ['Sports', 'Cooking'];
//     console.log(hobbies);
// }

// function greet(){
//     let age = 30;
//     let name = 'Max';
//     console.log(name,age, hobbies);
// }

// console.log(name,hobbies);

// greet();

// "use strict"; //Strict mode

// let userName = 'Josh';

// console.log(userName);
function getName(){
    return prompt('Your name: ', '');
}


function greet(){
    const userName = getName();
    console.log('Hello ' + userName)
}

greet();

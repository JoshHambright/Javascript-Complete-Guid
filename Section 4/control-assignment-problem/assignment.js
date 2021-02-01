const randomNumber = Math.random(); // produces random number between 0 (including) and 1 (excluding)
const randomNumber2 = Math.random();

//Challenge #1
// console.log(randomNumber);
// if (randomNumber > 0.7){
//     alert(`Your random number is ${randomNumber} and its greater than 0.7`);
// }

//Challenge #2
let numArray = [2,3,5,7,11,13,17,19,23]; 

for (const num in numArray) {
    console.log(numArray[num]);
}

for (let i = 0; i < numArray.length; i++){
    console.log(numArray[i]);
}

//Challenge #3
for (let i = numArray.length - 1; i >= 0; i--){
    console.log(numArray[i]);
}


//Challenge #4
console.log(randomNumber);
console.log(randomNumber2);
if ((randomNumber2 > .7 && randomNumber > .7) || (randomNumber2 < .2 || randomNumber < .2)){
    alert(`${randomNumber2} & ${randomNumber} meet the challenge criteria.`)
}

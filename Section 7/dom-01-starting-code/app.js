const h1 = document.getElementById('main-title');

h1.textContent = 'Some new Content!';
h1.style.color = 'white';
h1.style.backgroundColor = 'red';
//const listItemElements = document.querySelectorAll('li');

const li = document.querySelector('li:last-of-type');
li.textContent = li.textContent + '(changed!);'


const listItemElements = document.getElementsByTagName('li');

const body = document.body;

body.q

for (const listItem of listItemElements){
    console.dir(listItem);
}
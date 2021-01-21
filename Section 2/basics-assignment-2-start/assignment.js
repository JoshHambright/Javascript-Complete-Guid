const task3Element = document.getElementById('task-3');

function task1(){
    alert('Hello World!');
}

function task2(name){
    alert(name);
}

function task4(string1, string2, string3){
    return string1 + string2 + string3;
}

task1();
task2('Josh');
alert(task4('Hello ', 'world', '!'));

task3Element.addEventListener('click', task1);
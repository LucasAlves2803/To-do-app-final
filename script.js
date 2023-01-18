let form = document.getElementById('form');
let textInput = document.getElementById('textInput');
let msg = document.getElementById('msg');
let dateInput = document.getElementById('dataInput');
let textarea = document.getElementById('textarea');
let tasks = document.getElementById('tasks');
let add = document.getElementById('add');

form.addEventListener('submit', (e) =>{
    e.preventDefault();
    formValidation();
});


let formValidation = () =>{
    if (textInput.value === ""){
        // msg.style.color = 'red';
        msg.innerHTML = 'Task Title cannot be blank';
    }else{
        msg.innerHTML = "";
        acceptData();
        add.setAttribute("data-bs-dismiss", 'modal'); // atributo para fechar automaticamente a caixa
        add.click(); // click para ajudar a fechar
        ( () => {
            add.setAttribute("data-bs-dismiss", '');
        })() // anonimo function é executada uma única vez
    }
}

let data = {}

let acceptData = () => {
    data['text'] = textInput.value;
    data['dateInput'] = dateInput.value;
    data['description'] = textarea.value;
    createTasks();
}

let createTasks = () => {
    tasks.innerHTML += `<div>
        <span class="fw-bold"> ${data.text} </span>
        <span class="small text-secondary"> ${data.dateInput} </span>
        <p>${data.description}</p>
        <span class="options">
            <i class="fa-solid fa-pen-to-square"></i>
            <i onclick='deleteTasks(this)' class="fa-solid fa-trash"></i>
        </span>
    </div>`
    resetForm();
}

let resetForm = () => {
    textInput.value = '';
    dateInput.value = '';
    textarea.value = '';
}


let deleteTasks = (e) => {
    e.parentElement.parentElement.remove(); 
}

let editTasks = (e) => {
    console.log(e.parentElement.previousElementSibling.innerHTML);
    textarea.value = e.parentElement.previousElementSibling.innerHTML;
    console.log(e.parentElement.previousElementSibling.previousElementSibling.innerHTML.replaceAll('/','-'))
    dateInput.value = e.parentElement.previousElementSibling.previousElementSibling.innerHTML.replaceAll('/','-');
    console.log(e.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.innerHTML);
    textInput.value = e.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.innerHTML; 
    deleteTasks(e);
}
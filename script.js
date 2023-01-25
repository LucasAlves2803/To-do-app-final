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

let data = []

let acceptData = () => {
    
    data.push({ text: textInput.value,
                date: dateInput.value,
                description: textarea.value,
    });

    localStorage.setItem('data',JSON.stringify(data));
    // data['text'] = textInput.value; // título do form
    // data['dateInput'] = dateInput.value; // data do form
    // data['description'] = textarea.value; // texto do form
    console.log(data);
     createTasks();
}

let createTasks = () => { // Cria o elemento html com a tarefa escrita no form
    tasks.innerHTML = "";
    data.map((x,y) =>{
        return (tasks.innerHTML += `<div id=${y} >
        <span class="fw-bold"> ${x.text} </span>
        <span class="small text-secondary"> ${x.dateInput} </span>
        <p>${x.description}</p>
        <span class="options">
            <i data-bs-toggle="modal" data-bs-target="#form" onclick="editTask(this)" class="fa-solid fa-pen-to-square"></i>
            <i  onclick="deleteTask(this)" class="fa-solid fa-trash"></i>
        </span>
    </div>`)
    })
    resetForm();
}

let resetForm = () => {
    textInput.value = ''; // apaga as informações do título
    dateInput.value = ''; // apaga a data do form
    textarea.value = ''; // apaga o texto do form
}


let deleteTask = (e) => {
    e.parentElement.parentElement.remove();
    data.splice(e.parentElement.parentElement.id,1);
    localStorage.setItem('data',JSON.stringify(data));
    console.log(e.parentElement.parentElement.id);
}

let editTask = (e) => {

    let seletedTask = e.parentElement.parentElement;

    textInput.value = seletedTask.children[0].innerHTML;
    dateInput.value = seletedTask.children[1].innerHTML;
    textarea.value = seletedTask.children[2].innerHTML;
    seletedTask.remove();
}


( () => {
    data = JSON.parse(localStorage.getItem('data'));
    console.log(data);

    createTasks();
})();

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
    console.log(dateInput.value + typeof dateInput);    
    localStorage.setItem('data',JSON.stringify(data)); // ooloca no local storage o array com as tarefas
    // data['text'] = textInput.value; // título d form
    // data['dateInput'] = dateInput.value; // data do form
    // data['description'] = textarea.value; // texto do form
    console.log(data);
     createTasks();
}

let createTasks = () => { // Cria o elemento html com a tarefa escrita no form
    tasks.innerHTML = ""; // limpa a variável tasks
    data.map((x,y) =>{ // percorre todos os elementos do array
        // criando um card para cada um deles e adicionando a variável tasks
        // o map na prática cria aquela lista de caixinhas
        return (tasks.innerHTML += `<div id=${y} >
        <span class="fw-bold"> ${x.text} </span>
        <span class="small text-secondary"> ${x.date} </span>
        <p>${x.description}</p>
        <span class="options">
            <i data-bs-toggle="modal" data-bs-target="#form" onclick="editTask(this)" class="fa-solid fa-pen-to-square"></i>
            <i  onclick="deleteTask(this); createTasks()" class="fa-solid fa-trash"></i>
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
    console.log(e.parentElement.parentElement.id)
    data.splice(e.parentElement.parentElement.id,1); // deleta o elemento do array data
    localStorage.setItem('data',JSON.stringify(data)); // recoloca o array data no localStorage
    // Quando apagar um elemento é importante ter certeza que o id e o indíce do elemento são iguais
    // porque caso contrário um elemento diferente pode ser apagado sem querer
    e.parentElement.parentElement.remove(); // remove o card (o elemento html) que corresponde ao elemento do array removido
}

let editTask = (e) => {

    let seletedTask = e.parentElement.parentElement;
    console.log("data =>" + seletedTask.children[1].innerHTML);
    textInput.value = seletedTask.children[0].innerHTML;
    dateInput.value = seletedTask.children[1].innerHTML;
    textarea.value = seletedTask.children[2].innerHTML;
    deleteTask(e); // envia o parâmetro e, porque a função delete tasks acessará o elemento pai
}


( () => {
    data = JSON.parse(localStorage.getItem('data')) || []; // reinicia o array para que as tarefas 
    // antigas não se percam
    console.log(data);  
    createTasks(); // quando o array data não existe (não existir é diferente de ter um array vazio, um array sem elementos é aceito), o map não é executado, e as tarefas não são criadas
})();

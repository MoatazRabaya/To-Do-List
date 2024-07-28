let addForm = document.querySelector(".form");

let listFromStorage = localStorage.getItem('tasks')? localStorage.getItem('tasks').split(','): [];
let list = document.querySelector(".list");

showItem();
addForm.onsubmit = addTask;

function addTask(event) {
    event.preventDefault();

    const elements = event.target.elements;
    const text = elements[0].value;

    let task = document.createElement('li');
    let result = `
                    <input type="checkbox" onclick="checkIt(event)">
                    <span>${text}</span>
                    <button onclick="deleteIt(event)">delete</button>
                  `;
    task.innerHTML = result;

    elements[0].value = "";    
    
    if(text.trim() == '')
        alert("Empty input !!");
    else if (listFromStorage.includes(task.innerHTML))
        alert("Task already exist !!");
    else {
        listFromStorage.push(task.innerHTML);
        localStorage.setItem('tasks', listFromStorage); 
    }
    showItem();
}

function showItem(){
    list.innerHTML = '';
    listFromStorage.forEach(x => {
        let item = document.createElement('li');
        item.innerHTML = x;
        list.appendChild(item);
    });
}

function checkIt(event) {
    const parent = event.target.parentElement;
    const text = event.target.nextElementSibling;
    const isChecked = event.target.checked;

    const index = listFromStorage.findIndex(x => x == parent.innerHTML);

    let temp = document.createElement("li");

    temp.innerHTML = listFromStorage[index];

    temp.querySelector("span").classList.toggle("lined-text");

    listFromStorage[index] = temp.innerHTML;

    localStorage.setItem('tasks', listFromStorage);
    text.classList.toggle("lined-text");
}

function deleteIt(event){
    const item = event.target.parentElement;
    listFromStorage = listFromStorage.filter(x => x != item.innerHTML);
    localStorage.setItem('tasks', listFromStorage);
    item.remove();
}

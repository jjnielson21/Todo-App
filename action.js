let listContainer = document.getElementById('listcontainer');
let newListInput = document.getElementById('newlist');
let deleteListBtn = document.getElementById('delete');
let taskListDisplay = document.getElementById('tasklist');
let taskName = document.getElementById('mytask');
let taskContainer = document.getElementById('taskcontainer');
let newTaskInput = document.getElementById('newtask');

const localList = "task.list"
const localListId = "task.selectedList"

let lists = JSON.parse(localStorage.getItem(localList)) || [];
let selectedList = localStorage.getItem(localListId)

listContainer.addEventListener('click', event => {
    if (event.target.tagName.toLowerCase() === 'li') {
        selectedList = event.target.dataset.listId
        savePrintPage()
    }
})

deleteListBtn.addEventListener("click", event => {
    lists = lists.filter(list => list.id !== selectedList)
    selectedList = null
    savePrintPage()
})

function addlist(event, listname){
    switch(event.which){
            case 13: 
            let list = addlistname(listname);
            $(".newlist").val("");
            lists.push(list);
            savePrintPage();
            break;
    } 
}   

function addlistname(name) {
    return {id: Date.now().toString(),
            name: name, 
            tasks: []}
}
function addtask(event, taskname){
    switch(event.which){
            case 13: 
            let task = addtaskname(taskname);
            $(".newtask").val("");
            let selected = lists.find(list => list.id === selectedList)
            selected.tasks.push(task)
            savePrintPage();
            break;
    } 
}

function addtaskname(name) {
    return {id: Date.now().toString(),
            name: name, 
            complete: false}
}
  

function savePrintPage() {
    save()
    printPage()
}

function save() {
    localStorage.setItem(localList, JSON.stringify(lists))
}

function printPage(){
    $(listContainer).html(""); 
    printLists();
    
    let selected = lists.find(list => list.id === selectedList)
    if (selectedList == null) {
        taskListDisplay.style.display = 'none'
    } else {
        taskListDisplay.style.display = ""
        taskName.innerText = selected.name
        $(taskContainer).html(""); 
        printtasks(selected);
    }
}

function printTasks(selected) {
    selected.tasks.forEach(task => {
            `<div id='${i}' class="form-group form-check spread line">
                <input type="checkbox" class="form-check-input" onclick="swap(${listnum},${i})" id="check${listnum}-${i}" ${taskList[listnum][i].isChecked ? 'checked' : ''}>
                <div id="tasker${listnum}-${i}">
                <label class="form-check-label" onclick="edit(${listnum}, ${i})" for="check${i}">${taskList[listnum][i].title}</label>
                </div>
                <div>
                <i class=" tsk far fa-trash-alt" onclick='deleteTask(${i} ,${listnum}, ${i})'></i>
                </div>
            </div>`;
    })
}

function printLists() {
    lists.forEach(list => {
        let listE = document.createElement('li');
        listE.dataset.listId = list.id;
        listE.classList.add("listname");
        listE.innerText = list.name;
        if(list.id === selectedList) {listE.classList.add("active")}
        listContainer.appendChild(listE);
    })
}

printPage();
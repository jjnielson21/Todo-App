let listContainer = document.getElementById('listcontainer');
let newListInput = document.getElementById('newlist');
let deleteListBtn = document.getElementById('delete');
let taskListDisplay = document.getElementById('tasklist');
let taskName = document.getElementById('mytask');
let taskContainer = document.getElementById('taskcontainer');
let newTaskInput = document.getElementById('newtask');
let taskTemp = document.getElementById('template');
let clearBtn = document.getElementById('clear');


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

clearBtn.addEventListener('click', event => {
    let selected = lists.find(list => list.id === selectedList)
    selected.tasks = selected.tasks.filter(task => !task.complete)
    savePrintPage()
})

taskContainer.addEventListener('click', event => {
    if (event.target.tagName.toLowerCase() === 'input') {
        let selected = lists.find(list => list.id === selectedList)
        let selectedTask = selected.tasks.find(task => task.id === event.target.id)
        selectedTask.complete = event.target.checked
        save(selected)
    }
} )

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
            tasks: []
        }
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
        printTasks(selected);
    }
}

function printTasks(selected) {
    selected.tasks.forEach(task => {
        let taskE = document.importNode(taskTemp.content, true);
        let checkbox = taskE.querySelector('input');
        checkbox.id = task.id;
        checkbox.checked = task.complete;
        let label = taskE.querySelector('label');
        label.htmlFor = task.id;
        label.append(task.name);
        taskContainer.appendChild(taskE);
   });
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
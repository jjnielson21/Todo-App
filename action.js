let listContainer = document.getElementById('listcontainer');
let newListInput = document.getElementById('newlist');
let deleteListBtn = document.getElementById('delete');
let taskListDisplay = document.getElementById('tasklist');
let taskName = document.getElementById('mytask');
let taskContainer = document.getElementById('taskcontainer');
let newTaskInput = document.getElementById('newtask');
let taskTemp = document.getElementById('template');
let clearBtn = document.getElementById('clear');
let garbageBtn = document.getElementById('garbage');


const localList = "task.list"
const localListId = "task.selectedList"

let lists = JSON.parse(localStorage.getItem(localList)) || [];
let selectedList = localStorage.getItem(localListId)

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

function deleteTask(id) {
    let selected = lists.find(list => list.id === selectedList)
    for (i = 0; i < selected.tasks.length; i++) { 
        if(selected.tasks[i].id == id){
            selected.tasks.splice(i, 1);
        }
      }
    
    savePrintPage()
        
       
}

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
        let html = '<div class="task">'
                        +'<input type="checkbox" id="'+task.id+'">'
                        +'<label contenteditable="true">'+task.name+'</label>'
                        +'<span id="garbage"><i class="fas fa-trash-alt" onclick="deleteTask('+task.id+')"></i></span>'
                    +'</div>';
        $("#taskcontainer").append(html);
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

printPage()
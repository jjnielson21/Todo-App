let listContainer = document.getElementById('listcontainer');
let newListInput = document.getElementById('newlist');

const localList = "task.list"
const localListId = "task.selectedList"

let lists = JSON.parse(localStorage.getItem(localList)) || [];
let selectedList = localStorage.getItem(localListId)

listContainer.addEventListener('click', event => {
    if (event.target.tagName.toLowerCase() === 'li') {
        selectedList = event.target.dataset.listId
    }
})

function addlist(event, listname){
    switch(event.which){
            case 13: 
            let list = add(listname);
            $(".newlist").val("");
            lists.push(list);
            savePrintPage();
            break;
        } 
    }   

function add(name) {
    return {id: Date.now().toString(),
            name: name, 
            tasks: []}
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
let listContainer = document.getElementById('listcontainer');
let newListInput = document.getElementById('newlist');

let localList = "task.list"

let lists = JSON.parse(localStorage.getItem(localList)) || [];

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
        listContainer.appendChild(listE);
    })
}

printPage();
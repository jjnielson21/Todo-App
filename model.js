var mylists = new ListCollection();

function ListCollection(){
    this.collection =[];
    this.add = function(listname){
        this.collection.push(new List(listname));
    };
}

function List(name){
    this.name = name;
    this.collection = [];
    this.add = function(name){
        this.collection.push(new Task(name))
    };

}

function Task(name){
    this.name = name;
}
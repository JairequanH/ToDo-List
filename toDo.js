"use-strict"

let list = []; //{id, description, checked: t/f}
let idCount = 1;




function saveList(){
    localStorage.setItem("myList", JSON.stringify(list));
    localStorage.setItem("idCount", idCount);
    console.log(`saved list: ${JSON.stringify(list, null, 2)}`);
}

function loadList(){
    temp = JSON.parse(localStorage.getItem("myList"));

    if( !(temp === null) ){
        list = temp;
        idCount = +JSON.parse(localStorage.getItem("idCount"));
        console.log(`loaded list fron storage`);
        displayList(list);
    }
}

function addClick(){
    let item = document.getElementById("input");

    if(item.value){
        addItem(list, item.value);
        displayList(list);
        item.value = "";
    }
}

function displayList(list){
    let ul = document.getElementById("todo-list");
    ul.innerHTML = "";
    
    for(let i = 0; i<list.length; i++){
        let item = document.createElement("li");
        let text = document.createElement("span");
        text.textContent = `${i+1}: ${list[i].description}`;
        if(list[i].checked){
            item.classList.add("checked");
        }
        item.appendChild(text);

        let checkButton = document.createElement("button");
        checkButton.id = list[i].id;
        checkButton.textContent = "Check";
        checkButton.classList.add("check-btn");
        checkButton.onclick = () => {
            checkItem(list, checkButton.id);
            displayList(list);
        }
        item.appendChild(checkButton);

        let remButton = document.createElement("button");
        remButton.id = list[i].id;
        remButton.textContent = "Remove";
        remButton.classList.add("rem-btn");
        remButton.onclick = () => {
            removeItem(list, remButton.id);
            displayList(list);
        }
        item.appendChild(remButton);


        ul.appendChild(item);
    }
    
}

function addItem(list, description){
    if(!list){
        console.log("List does not exist");
        return;
    }
    if(description == undefined){
        console.log("Item not provided");
        return;
    }

    list.push({id: idCount, description: description, checked: false });
    idCount++;
    saveList();
}

function removeItem(list, id){
    if(!list){
        console.log("List does not exist");
        return;
    }
    if(isNaN(+id)){
        console.log("Valid id not provided");
        return;
    }

    for(let i = 0; i<list.length; i++){
     if(list[i].id == id){
            list.splice(i, 1);
            saveList();
            return;
        }
    }

    console.log("ID not contained in list");
    return;
}

function checkItem(list, id){
    if(!list){
        console.log("List does not exist");
        return;
    }
    if(isNaN(+id)){
        console.log("Valid id not provided");
        return;
    }

    for(let i = 0; i<list.length; i++){
        if(list[i].id == id){
            list[i].checked = !list[i].checked;
            console.table(list);
            saveList();
            return;
        }
    }

    console.log("ID not contained in list");
    return;
}

document.addEventListener("DOMContentLoaded", () => {
    loadList();

    let item = document.getElementById("input");
    item.addEventListener("keydown", (event) => {
        if(event.key == "Enter"){
            addClick();
        }
    })
});
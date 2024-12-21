const input = document.getElementById("input"); // Fetching the input from user
const submitBtn = document.getElementById("submitBtn");
const tasklist = document.getElementById("tasklist");

let tasks= []; //Array for storing the tasks
let editIndex = null;



// Adding an event listener to add or edit task
submitBtn.addEventListener("click",handleAdd);

function handleAdd() {
    const taskValue = input.value.trim();

    if(!taskValue){
            
                alert("No Task is given");
                return;
    }
    if(editIndex != null)
    {
        tasks[editIndex] = taskValue;
        editIndex = null;
        submitBtn.textContent = "Add Task";
    }

    else{
        tasks.push(taskValue);
       
    }
    input.value = "";
    TaskRender();
            
}

function TaskRender() {
    const tasklist = document.getElementById("tasklist");
    tasklist.innerHTML = "";

    tasks.forEach((task, index) => {
        const taskItem = document.createElement("div");
        taskItem.className = "d-flex justify-content-between align-items-center mt-1 border border-info p-1 rounded";

        // Checkbox
        const box = document.createElement("input");
        box.className = "form-check-input";
        box.type = "checkbox";
        box.addEventListener("change", () => toggleCompletion(index));

        // Task Text
        const taskText = document.createElement("span");
        taskText.textContent = task;

        // Action Buttons
        const action = document.createElement("div");

        const editBtn = document.createElement("button");
        editBtn.className = "btn btn-warning btn-sm me-2";
        editBtn.textContent = "Edit";
        editBtn.onclick = () => handleEdit(index);

        const dltBtn = document.createElement("button");
        dltBtn.className = "btn btn-danger btn-sm";
        dltBtn.textContent = "Delete";
        dltBtn.onclick = () => handleDelete(index);

        action.appendChild(editBtn);
        action.appendChild(dltBtn);

        taskItem.appendChild(box);
        taskItem.appendChild(taskText);
        taskItem.appendChild(action);
        tasklist.appendChild(taskItem);
    });
}

function handleEdit(index){
    input.value = tasks[index];
    editIndex = index;
    submitBtn.textContent = "Update Task";
}

function handleDelete(index){

    const confirmDlt = confirm("Are You sure want to delete?")
    if(confirmDlt){
        tasks.splice(index,1);
        TaskRender();
    }
}

function toggleCompletion(index) {
   
    const taskText = tasklist.children[index].querySelector("span");
    taskText.style.textDecoration = tasklist.children[index].querySelector("input").checked ? "line-through" : "none";
}



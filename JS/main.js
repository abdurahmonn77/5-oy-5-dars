const elForm = document.querySelector(".todo-form");
const elInput = document.querySelector(".todo-input");
const elTodoList = document.querySelector(".todo-list");
const elCompBtn = document.querySelector(".Completed-btn")
const elUncompBtn = document.querySelector(".uncompleted-btn")

let elList = JSON.parse(localStorage.getItem("todos")) ||  [];

elForm.addEventListener("submit", function (e) {
    e.preventDefault();
    if (elInput.value.trim() === "") return; 

    const data = {
        id: elList.length + 1,
        title: elInput.value,
        isComplated: false
    };

    elList.push(data);
    elInput.value = ""; 
    renderTodo(elList, elTodoList);

    localStorage.setItem("todos", JSON.stringify(elList))
});

function renderTodo(arr, list) {
    list.innerHTML = ""; 

    arr.forEach((item, index) => {
        let elItem = document.createElement("li");
        elItem.className = `w-[100%] flex justify-between bg-white px-[20px] py-[20px] border-[2px] border-gray-400 items-center rounded-[40px] ${item.isComplated ? "line-through bg-gray-500" : ""}`;
        elItem.innerHTML = `
            <div class="flex gap-3 items-center">
                <span class="text-[20px]">${index + 1}</span>
                <span class="w-[1px] h-[50px] bg-gray-500"></span>
                <h2 class="text-[24px] font-bold">${item.title}</h2>
            </div>
            <div class="flex gap-3 items-center">
            <form>
                <input onchange="handleCheckboxChange(${item.id})" type="checkbox" ${item.isComplated ? 'checked' : ''}>
            </form>
                <button class="delete-btn w-[100px] py-[10px] bg-red-500 hover:bg-red-700 rounded-md text-white text-[20px] duration-200">Delete</button>
                <button class="edit-btn w-[100px] py-[10px] bg-yellow-500 hover:bg-yellow-700 rounded-md text-white text-[20px] duration-200">Edit</button>
            </div>
        `;

        const deleteBtn = elItem.querySelector(".delete-btn");
        deleteBtn.addEventListener("click", () => deleteTodo(item.id));

        const editBtn = elItem.querySelector(".edit-btn");
        editBtn.addEventListener("click", () => editTodo(item.id));

        list.append(elItem);
    });
}

renderTodo(elList, elTodoList)

function deleteTodo(id) {
    elList = elList.filter((todo) => todo.id !== id); 
    renderTodo(elList, elTodoList); 
    localStorage.setItem("todos", JSON.stringify(elList))
}

function editTodo(id) {
    const todo = elList.find((todo) => todo.id === id); 
    if (!todo) return;

    elInput.value = todo.title;

    elList = elList.filter((todo) => todo.id !== id);

    renderTodo(elList, elTodoList);
}

function handleCheckboxChange(id) {
    const findObj = elList.find(item => item.id == id)
    findObj.isComplated = !findObj.isComplated
    renderTodo(elList, elTodoList)
    localStorage.setItem("todos", JSON.stringify(elList))
}

elCompBtn.addEventListener("click", function(e) {
    const completedTodos = elList.filter(item => item.isComplated === true); 
    renderTodo(completedTodos, elTodoList); 
});
elUncompBtn.addEventListener("click", function(e) {
    const completedTodos = elList.filter(item => item.isComplated === false); 
    renderTodo(completedTodos, elTodoList); 
});

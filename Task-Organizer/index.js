var todo_array = [];
var topPointer = -1;
 
$(document).ready(function () {
    bindAllEvents();
})

function appendTodoInList(todo) {
    if(!todo.trim()) return;
    todo_array.push(todo);
    // console.log(todo_array);
    topPointer++;

}

function unMountList() {
    $("#todo_list").empty();
}

function onClick() {
    appendTodoInList($(".main_input_box").val());
    $(".main_input_box").val("");
    reRenderList();
}


function deleteTodoItem(index) {
    todo_array.splice(index, 1);
    topPointer--;
    reRenderList();
}

function editTodoDisplay(index) {
    $(`#todo_item_text${index}`).addClass("sec-hide");
    $(`#edit_input${index}`).removeClass("sec-hide");
    $(`#edit_input${index}`).val(todo_array[index]);
    $(`#todo_delete_btn${index}`).addClass("sec-hide");
    $(`#todo_edit_btn${index}`).addClass("sec-hide")
    $(`#todo_item_save${index}`).removeClass("sec-hide");
}

function saveEditedToDo(index) {
    todo_array[index] = $(`#edit_input${index}`).val();
}

function createToDoItem(todo, index) {
    $("#todo_list").append(`
    <div id=todo_item${index}>
        <p id=todo_item_text${index}>${todo}</p>
        <input id="edit_input${index}" class="todo_input sec-hide"/>
        <div id="edit_delete"${index}>
            <button class="edit_button" id=todo_edit_btn${index}>Edit</button>
            <button class="delete_button" id=todo_delete_btn${index}>Delete</button>
        </div>
        <button class="sec-hide" id=todo_item_save${index}>Save</button>
    </div>`)

    $(`#todo_delete_btn${index}`).on("click", function () {
        deleteTodoItem(index);
    })

    $(`#todo_edit_btn${index}`).on("click", function () {
        editTodoDisplay(index);
    })

    $(`#todo_item_save${index}`).on("click", function () {
        saveEditedToDo(index);
        unMountList();
        reRenderList()
    })
}

/**
 * @param its render todo list item
 */
function reRenderList() {
    unMountList();
    todo_array.forEach((todo, index) => {
        createToDoItem(todo, index);
    })
}

function bindAllEvents() {
    $(".submit_button").on("click", onClick);
    $(".main_input_box").on("keypress",function(e){
        if(e.key==="Enter"){
            onClick();
        }
    })
}


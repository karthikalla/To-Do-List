let containers = document.querySelectorAll('.status');

for (let container of containers) {
    container.addEventListener("dragover", function (e) {
        e.preventDefault();
    });
    container.addEventListener("drop", function (e) {
        e.preventDefault();
        let selected = document.querySelector('.dragging');
        if (selected) {
            container.appendChild(selected);
            selected.classList.remove('dragging');
        }
    });
}

document.addEventListener("dragstart", function (e) {
    if (e.target.classList.contains("todo")) {
        e.target.classList.add('dragging');
        e.target.style.zIndex = 9999;
    }
});

document.addEventListener("dragend", function (e) {
    if (e.target.classList.contains("todo")) {
        e.target.classList.remove('dragging');
        e.target.style.zIndex = 2;
    }
});

//modal
const btns = document.querySelectorAll("[data-target-modal]");
const close_modals = document.querySelectorAll(".close-modal");
const overlay = document.getElementById("overlay");

btns.forEach((btn) => {
    btn.addEventListener("click", () => {
        document.querySelector(btn.dataset.targetModal).classList.add("active");
        overlay.classList.add("active");
    });
});

close_modals.forEach((btn) => {
    btn.addEventListener("click", () => {
        const modal = btn.closest(".modal");
        modal.classList.remove("active");
        overlay.classList.remove("active");
    });
});

window.onclick = (event) => {
    if (event.target == overlay) {
        const modals = document.querySelectorAll(".modal");
        modals.forEach((modal) => modal.classList.remove("active"));
        overlay.classList.remove("active");
    }
};



// Close button functionality
let closeButtons = document.querySelectorAll('#close');

for (let closeButton of closeButtons) {
    closeButton.addEventListener("click", function (e) {
        let todoItem = this.parentElement; 
        todoItem.remove(); 
    });
}

//create to-do

const todo_submit = document.getElementById("todo_submit");
todo_submit.addEventListener("click", createTodo);

function createTodo(){
    const todo_div = document.createElement("div");
    const input_val = document.getElementById("todo_input").value;
    const txt = document.createTextNode(input_val);

    todo_div.appendChild(txt);
    todo_div.classList.add("todo");
    todo_div.setAttribute("draggable", "true");

    // Create span
    const span = document.createElement("span");
    const span_txt = document.createTextNode("\u00D7");
    span.classList.add("close");
    span.appendChild(span_txt);

    todo_div.appendChild(span);
    no_status.appendChild(todo_div);
    enableDragging(todo_div);

    // Clear input field
    document.getElementById("todo_input").value = "";
    todo_form.classList.remove("active");
    overlay.classList.remove("active");
}

// Close button functionality for dynamically created tasks
document.addEventListener("click", function (e) {
    if (e.target.classList.contains("close")) {
        let todoItem = e.target.parentElement;
        todoItem.remove();
    }
});


// Enable dragging for todo elements on touch devices

function enableDragging(todo) {
    let initialX, initialY;
    let currentX, currentY;

    todo.addEventListener('touchstart', function (e) {
        initialX = e.touches[0].clientX - parseInt(todo.style.left || 0);
        initialY = e.touches[0].clientY - parseInt(todo.style.top || 0);
        todo.style.zIndex = 9999;
    });

    todo.addEventListener('touchmove', function (e) {
        currentX = e.touches[0].clientX - initialX;
        currentY = e.touches[0].clientY - initialY;
        e.preventDefault();
        todo.style.left = currentX + 'px';
        todo.style.top = currentY + 'px';
    });

    todo.addEventListener('touchend', function (e) {
        if (e.target.classList.contains("todo")) {
            e.target.classList.add('dragging');
            e.target.style.zIndex = 2;
        }    
    });
}

// Call enableDragging function for each todo element
let todos = document.querySelectorAll('.todo');
todos.forEach(enableDragging);

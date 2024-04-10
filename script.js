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
const btns = document.querySelectorAll("[data-target]");
const close_modals = document.querySelectorAll(".close-modal");
const overlay = document.getElementById("overlay");

btns.forEach((btn) => {
    btn.addEventListener("click", () => {
        document.querySelector(btn.dataset.target).classList.add("active");
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
        e.stopPropagation();
        let todoItem = this.parentElement; 
        todoItem.remove(); 
    });
}

//create to-do

const todo_submit = document.getElementById("todo_submit");
todo_submit.addEventListener("click", createTodo);
function createTodo() {
    const todo_div = document.createElement("div");
    const todo_input = document.getElementById("todo_input").value;
    const text_input = document.getElementById("text_input").value;

    // Create a span for the close button
    const closeSpan = document.createElement("span");
    closeSpan.classList.add("close");
    closeSpan.appendChild(document.createTextNode("\u00D7"));

    // Append title and close button span to the todo_div
    const titleElement = document.createElement("div");
    titleElement.classList.add("title");
    titleElement.textContent = todo_input;
    todo_div.appendChild(titleElement);
    todo_div.appendChild(closeSpan);

    todo_div.classList.add("todo");
    todo_div.setAttribute("draggable", "true");

    // Get current time
    const currentDate = new Date();
    const creationTime = currentDate.toLocaleString(); 

    // Create a new modal for this task
    const modal = document.createElement("div");
    modal.classList.add("modal");
    modal.innerHTML = `
        <div class="header">
            <div class="title">${todo_input}</div>
            <button class="btn close-modal">&times;</button>
        </div>
        <div class="body">
            <div id="todo_description">
                <p>${text_input}</p>
            </div>
        </div>
        <div class="footer">
            <div class="time">${creationTime}</div>
        </div>
    `;

    closeSpan.addEventListener("click", function(e) {
        e.stopPropagation(); 
        todo_div.remove();
        modal.remove();
    });

    // Prevent closing modal when clicking the close button span
    modal.querySelector('.close-modal').addEventListener("click", function(e) {
        e.stopPropagation(); 
        modal.classList.remove("active");
        overlay.classList.remove("active");
    });

    document.body.appendChild(modal);
    todo_div.addEventListener("click", function(e) {
        if (!e.target.classList.contains("close")) {
            modal.classList.add("active");
            overlay.classList.add("active");
        }
    });

    no_status.appendChild(todo_div);
    enableDragging(todo_div);

    document.getElementById("todo_input").value = "";
    document.getElementById("text_input").value = "";
    todo_form.classList.remove("active");
    overlay.classList.remove("active");
}

// Enable dragging for todo elements on touch devices

function enableDragging(todo) {
    let initialX, initialY;
    let currentX, currentY;

    todo.addEventListener('touchstart', function (e) {
        initialX = e.touches[0].clientX - parseInt(todo.style.left || 0);
        initialY = e.touches[0].clientY - parseInt(todo.style.top || 0);
        todo.style.zIndex = 9999;
        e.target.classList.add('dragging');
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
            e.target.classList.remove('dragging');
            e.target.style.zIndex = 2;
        }    
    });
}

// Call enableDragging function for each todo element
let todos = document.querySelectorAll('.todo');
todos.forEach(enableDragging);



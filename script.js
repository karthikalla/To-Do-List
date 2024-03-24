document.addEventListener("DOMContentLoaded", function() {
    const submitBtn = document.querySelector('.btn');

    submitBtn.addEventListener('click', function() {
        const title = document.querySelector('.title_1').value;
        const description = document.querySelector('.description_1').value;

        if (title.trim() !== '') {
            const taskElement = createTaskElement(title, description);
            const container = getContainerToAddTask();
            container.appendChild(taskElement);
            clearInputFields();
        } else {
            alert('Please enter the title for the task.');
        }
    });

    function createTaskElement(title, description) {
        const taskElement = document.createElement('div');
        taskElement.classList.add('task');
        taskElement.innerHTML = `
            <h3>${title}</h3>
            <p>${description}</p>
            <button class="complete-btn btn">Completed</button>
        `;
        const completeBtn = taskElement.querySelector('.complete-btn');
        completeBtn.addEventListener('click', function() {
            moveTaskToCompleted(taskElement);
        });
        return taskElement;
    }

    function getContainerToAddTask() {
        return document.querySelector('.container-2 .box .in_work');
    }

    function clearInputFields() {
        document.querySelector('.title_1').value = '';
        document.querySelector('.description_1').value = '';
    }

    function moveTaskToCompleted(taskElement) {
        taskElement.querySelector('.complete-btn').remove(); 
        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete-btn', 'btn');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', function() {
            deleteTask(taskElement);
        });
        taskElement.appendChild(deleteBtn); 
        document.querySelector('.container-3 .box .comp-task').appendChild(taskElement); 
    }

    function deleteTask(taskElement) {
        taskElement.remove(); 
    }
});

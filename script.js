const inputAddTask = document.getElementById('todo__add--input')
const divToDoList = document.getElementById('todo__list')

const jusDoTaskList = 
    localStorage.getItem('jusDoTaskList') 
    ? JSON.parse(localStorage.getItem('jusDoTaskList')) 
    : []

let jusDoUserName = 
    localStorage.getItem('jusDoUserName')
    ? JSON.parse(localStorage.getItem('jusDoUserName'))
    : ''

// Render todo list
const renderToDoList = () => {
    let toDoListHtml = ''
    for (let i=0; i<jusDoTaskList.length; i++) {
        toDoListHtml += `
            <div class="todo__list--task"">
                <input type="checkbox" name="task_${i + 1}" id="task_${i + 1}" />
                <label for="task_${i + 1}">${jusDoTaskList[i]}</label>
                <img src='./images/delete-icon.svg' alt='delete icon'  id="${i}" onclick="deleteTask(this.id)" />
            </div>
        `
    }
    divToDoList.innerHTML = toDoListHtml
}
renderToDoList()

// Add todo-task on '+' button click
const addTask = () => {
    const task = inputAddTask.value
    const spaceChar = /[^ ]/g
    const exceptSpaceChar = task.match(spaceChar)

    if (task && exceptSpaceChar) {
        jusDoTaskList.push(task)

        renderToDoList()
    }

    localStorage.setItem("jusDoTaskList", JSON.stringify(jusDoTaskList));

    inputAddTask.value = ''
    inputAddTask.focus()
}

// Add todo task on 'Enter' key press
inputAddTask.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault()
        addTask()
    }
})

// Delete task on 'delete-icon' click
const deleteTask = (indexForRemoval) => {
    jusDoTaskList.splice(indexForRemoval, 1)
    localStorage.setItem("jusDoTaskList", JSON.stringify(jusDoTaskList));
    renderToDoList()
}

// Delete all tasks on 'clear Tasks' button click
const clearAllTasks = () => {
    jusDoTaskList.length = 0
    localStorage.removeItem("jusDoTaskList")
    renderToDoList()
}

// Reset app on 'Reset App' button click
const resetApp = () => {
    const userChoice = prompt("Reset for Sure? DATA WILL ERASED!\nType\n'YES' to Reset the App\n'NO' to Get back to the App\n\nNOTE: Please type in valid choices(YES/NO)").toLocaleLowerCase()
    if (userChoice === 'yes') {
        clearAllTasks()
        jusDoUserName.length = 0
        localStorage.removeItem('jusDoUserName')
        window.location.reload()
    } else if (userChoice === 'no') {
        return
    } else {
        resetApp()
    }
}

// On page/window load check for user existence, if not found => prompt for username
const checkUser = () => {
    if (!jusDoUserName) {
        jusDoUserName = prompt('Gimme a username to remember You..!')
        localStorage.setItem('jusDoUserName', JSON.stringify(jusDoUserName))
    }
}
window.addEventListener('load', () => {
    checkUser()
    document.getElementById('app__username').innerText = jusDoUserName
    inputAddTask.focus()
})
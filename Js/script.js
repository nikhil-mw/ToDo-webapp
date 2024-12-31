const taskInput = document.querySelector(".task-input")
const addBtn = document.querySelector(".add-btn")
const taskList = document.querySelector(".task-list")
const clearBtn = document.querySelector(".clear-btn")

// Function to load tasks from localStorage
function loadTasks() {
  const savedTasks = JSON.parse(localStorage.getItem("tasks"))
  if (savedTasks) {
    savedTasks.forEach((task) => {
      const li = document.createElement("li")
      li.textContent = task.text
      if (task.highlighted) {
        li.classList.add("highlighted")
      }

      const removeButton = document.createElement("button")
      removeButton.textContent = "Remove"
      removeButton.className = "remove-btn"
      removeButton.addEventListener("click", () => {
        removeTaskFromStorage(task)
        taskList.removeChild(li)
      })

      li.appendChild(removeButton)
      taskList.appendChild(li)
    })
  }
}

// Function to save tasks to localStorage
function saveTaskToStorage(task) {
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || []
  savedTasks.push(task)
  localStorage.setItem("tasks", JSON.stringify(savedTasks))
}

// Function to remove a task from localStorage
function removeTaskFromStorage(taskToRemove) {
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || []
  const updatedTasks = savedTasks.filter(
    (task) => task.text !== taskToRemove.text
  )
  localStorage.setItem("tasks", JSON.stringify(updatedTasks))
}

// Add event listener for the Add button
addBtn.addEventListener("click", () => {
  const taskText = taskInput.value.trim()
  if (taskText === "") {
    alert("Task cannot be empty!")
    return
  }

  const li = document.createElement("li")
  li.textContent = taskText

  li.addEventListener("click", () => {
    li.classList.toggle("highlighted")

    const savedTasks = JSON.parse(localStorage.getItem("tasks"))
    const task = savedTasks.find((task) => task.text === taskText)
    if (task) {
      task.highlighted = !task.highlighted; // Toggle the highlighted status
      localStorage.setItem("tasks", JSON.stringify(savedTasks))
    }
  })

  const removeButton = document.createElement("button")
  removeButton.textContent = "Remove"
  removeButton.className = "remove-btn"
  removeButton.addEventListener("click", () => {
    removeTaskFromStorage({ text: taskText })
    taskList.removeChild(li)
  })

  li.appendChild(removeButton)
  taskList.appendChild(li)

  saveTaskToStorage({ text: taskText, highlighted: false }); // Save task to localStorage
  taskInput.value = ""  // Clear the input field
})

// Clear all tasks
clearBtn.addEventListener("click", () => {
  localStorage.removeItem("tasks") // Remove tasks from localStorage
  taskList.innerHTML = "" // Clear task list from UI
})

// Load tasks on page load
loadTasks()


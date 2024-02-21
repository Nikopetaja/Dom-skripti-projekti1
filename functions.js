// Wait for the DOM to be fully loaded before executing the script
document.addEventListener('DOMContentLoaded', function () {
    // Get references to the required DOM elements
    const form = document.getElementById('todo-form');
    const taskInput = document.getElementById('task');
    const tasksList = document.getElementById('tasks-list');
    const taskCount = document.getElementById('task-count');
    const showAllBtn = document.getElementById('show-all');
    const showActiveBtn = document.getElementById('show-active');
    const showCompletedBtn = document.getElementById('show-completed');
  
    // Event listener for form submission
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      // Call addtask function to add a new task
      addTask(taskInput.value);
      // Clear the input field after adding the task
      taskInput.value = '';
    });
  
    // Event listener for clicks on the tasks list
    tasksList.addEventListener('click', function (e) {
        // Check if the clicked element is a list item
      if (e.target.tagName === 'LI') {
        // Call the toggleTaskCompletion to toggle completion status
        toggleTaskCompletion(e.target);
      } else if (e.target.classList.contains('delete-btn')) {
        // Check if the clicked element is a delete button
        // Call deleteTask function to remove the task 
        deleteTask(e.target.parentElement);
      }
    });

    // Event listeners for filter buttons
    showAllBtn.addEventListener('click', function () {
        // Show all added tasks
      showAllTasks();
    });
  
    showActiveBtn.addEventListener('click', function () {
        // Show only active tasks (not completed)
      showActiveTasks();
    });
  
    showCompletedBtn.addEventListener('click', function () {
        // Show only completed tasks
      showCompletedTasks();
    });

    // Function to add a new task to the list
    function addTask(taskText) {
      if (!taskText) return;

      // Create a new list item
      const li = document.createElement('li');
      li.textContent = taskText;
      // Create a delete button for the task
      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'Delete';
      deleteBtn.classList.add('delete-btn');
      li.appendChild(deleteBtn);
      // Append the task to the tasks list
      tasksList.appendChild(li);
  
      // Update the task count
      updateTaskCount();
    }
  
    // Function to toggle the completion status of a task
    function toggleTaskCompletion(task) {
      task.classList.toggle('completed');
      // Update the task count
      updateTaskCount();
    }
  
    // Function to delete a task
    function deleteTask(task) {
      task.remove();
      // Update the task count
      updateTaskCount();
    }
  
    // Function to update the task count display
    function updateTaskCount() {
      // Get the total number of tasks and completed tasks  
      const totalTasks = tasksList.children.length;
      const completedTasks = Array.from(tasksList.children).filter(task => task.classList.contains('completed')).length;
  
      // Display the task count information
      taskCount.textContent = `Tasks: ${totalTasks} (Completed: ${completedTasks})`;
    }
  
    // Function to show all tasks
    function showAllTasks() {
      // Set the display style to 'flex' for all tasks  
      Array.from(tasksList.children).forEach(task => task.style.display = 'flex');
    }
  
    // Function to show only active tasks (not completed)
    function showActiveTasks() {
        // Set the display style to 'none' for completed tasks, 'flex' for active tasks
      Array.from(tasksList.children).forEach(task => {
        if (task.classList.contains('completed')) {
          task.style.display = 'none';
        } else {
          task.style.display = 'flex';
        }
      });
    }
  
    // Function to show only completed tasks
    function showCompletedTasks() {
      // Set the display style to 'flex' for completed tasks, 'none' for active tasks  
      Array.from(tasksList.children).forEach(task => {
        if (task.classList.contains('completed')) {
          task.style.display = 'flex';
        } else {
          task.style.display = 'none';
        }
      });
    }
  });
  
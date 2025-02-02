import './styles.css'
import deleteIcon from './delete.png'
import editIcon from './edit.png'
import TodoList from './todo-list'

function App() {
  const TL = TodoList()
  const addTodoOpenBtn = document.getElementById('add-todo-open-btn')
  const addTodoCloseBtn = document.getElementById('add-todo-close-btn')
  const addTodoModal = document.getElementById('add-todo-modal')

  const addTodoForm = document.getElementById('add-todo-form')

  const updateTodoContainer = () => {
    const todoBox = document.querySelector('.todo-container')
    const list = TL.getList()

    todoBox.innerHTML = ''

    if (list.length > 0) {
      list.forEach((item, index) => {
        createTodo(
          item.title,
          item.dueDate,
          item.priority,
          item.completed,
          index,
          todoBox
        )
      })
    } else {
      const div = document.createElement('div')
      div.textContent = 'No tasks to show'
      div.style.fontSize = '50px'
      div.style.marginTop = '50px'
      todoBox.appendChild(div)
    }
  }

  const createTodo = (title, dueDate, priority, completed, index, todoBox) => {
    const todoItem = document.createElement('div')
    todoItem.classList.add('todo-item', `priority-${priority}`)
    todoItem.dataset.index = index
    todoItem.classList.toggle('completed', completed)
    todoBox.appendChild(todoItem)
  
    const todoItemSection1 = document.createElement('div')
    todoItemSection1.classList.add('todo-item-section')
    todoItem.appendChild(todoItemSection1)
  
    const input = document.createElement('input')
    input.setAttribute('type', 'checkbox')
    input.dataset.index = index
    input.addEventListener('change', () => {
      TL.toggleCompletion(index)
      updateProgressBar()
      updateTodoContainer()
    })
    if (completed) input.setAttribute('checked', true)
    todoItemSection1.appendChild(input)
  
    const span1 = document.createElement('span')
    span1.textContent = title
    if (completed) span1.style.textDecoration = 'line-through'
    todoItemSection1.appendChild(span1)
  
    const todoItemSection2 = document.createElement('div')
    todoItemSection2.classList.add('todo-item-section')
    todoItem.appendChild(todoItemSection2)
  
    const span2 = document.createElement('span')
    span2.textContent = dateFormatter(dueDate)
    todoItemSection2.appendChild(span2)
  
    const button = document.createElement('button')
    button.textContent = 'Details'
    button.dataset.index = index
    todoItemSection2.appendChild(button)
  
    const img1 = document.createElement('img')
    img1.src = editIcon
    img1.setAttribute('height', '20px')
    img1.dataset.index = index
    todoItemSection2.appendChild(img1)
  
    const img2 = document.createElement('img')
    img2.src = deleteIcon
    img2.setAttribute('height', '20px')
    img2.dataset.index = index
    todoItemSection2.appendChild(img2)
  }

  const updateProjectContainer = () => {
    const container = document.querySelector('.project-container')
    container.innerHTML = ''

    if (TL.getList().length > 0) {
      for (const [project, qty] of Object.entries(getProjectData())) {
        createProject(project, qty)
      }
    } else {
      container.textContent = 'No projects to show'
    }
  }

  const getProjectData = () => {
    const projectList = TL.getList().map(item => item.project.toLowerCase())
    const projectObj = projectList.reduce((obj, project) => {
      obj[project] = (obj[project] || 0) + 1
      return obj
    }, {})
    return projectObj
  }

  const createProject = (project, qty) => {
    const projectContainer = document.querySelector('.project-container')

    const div = document.createElement('div')
    div.classList.add('category')
    projectContainer.appendChild(div)

    const span = document.createElement('span')
    span.textContent = titleCase(project)
    div.appendChild(span)

    const btn = document.createElement('button')
    btn.textContent = qty
    div.appendChild(btn)
  }

  const titleCase = (str) => {
    return str.split(' ').map(function(word) {
      return (word.charAt(0).toUpperCase() + word.slice(1))
    }).join(' ')
  }

  const updateMenu = () => {
    document.querySelector('.total-count').textContent = TL.getList().length
    document.querySelector('.today-count').textContent = getTodayCount()

    updateProgressBar()
  }

  const getTodayCount = () => {
    const list = TL.getList()
    return list.filter(item => item.dueDate === getTodayDateFormatted()).length
  }

  const getTodayDateFormatted = () => {
    const monthChart = {
      'Jan': '01',
      'Feb': '02',
      'Mar': '03',
      'Apr': '04',
      'May': '05',
      'Jun': '06',
      'Jul': '07',
      'Aug': '08',
      'Sep': '09',
      'Oct': '10',
      'Nov': '11',
      'Dec': '12'
    }

    const today = new Date()
    const [_, month, day, year] = today.toDateString().split(' ')

    return `${year}-${monthChart[month]}-${day}`
  }

  const clearAddTodoForm = () => {
    addTodoForm.querySelector('#title').value = ''
    addTodoForm.querySelector('#project').value = ''
    addTodoForm.querySelector('#due-date').value = ''
    addTodoForm.querySelector('#description').value = ''
    const checked = addTodoForm.querySelector('input[name="priority"]:checked')
    if (checked) checked.checked = false
  }

  const dateFormatter = (date) => {
    const monthChart = {
      '01': 'January',
      '02': 'February',
      '03': 'March',
      '04': 'April',
      '05': 'May',
      '06': 'June',
      '07': 'July',
      '08': 'August',
      '09': 'September',
      '10': 'October',
      '11': 'November',
      '12': 'December'
    }

    const [year, month, day] = date.split('-')

    return `${monthChart[month]} ${+day}, ${+year}`
  }

  const updateProgressBar = () => {
    const progressBar = document.querySelector('progress')
    const completedPercentage = document.querySelector('.completed-percentage')

    const total = TL.getList().length
    const completed = TL.getList().filter(i => i.completed === true).length
    const completionPercent = Math.round(completed/total * 100)

    if (isNaN(completionPercent)) {
      completedPercentage.textContent = '-'
    } else {
      progressBar.setAttribute('value', completed)
      progressBar.setAttribute('max', total)
      completedPercentage.textContent = `${completionPercent}%`
    }
  }

  const updateUI = () => {
    updateMenu()
    updateProjectContainer()
    updateTodoContainer()
  }

  const addTodoFormHandler = (e) => {
    e.preventDefault()

    const namingClash = TL.getList().some(item => 
      item.title.toLowerCase() ===
      addTodoForm.querySelector('#title').value.toLowerCase()
    )

    if (namingClash) {
      alert('Todo already exists')
    } else {
      TL.addTodo(
        addTodoForm.querySelector('#title').value,
        addTodoForm.querySelector('#description').value,
        addTodoForm.querySelector('#due-date').value,
        addTodoForm.querySelector('input[name="priority"]:checked').id,
        addTodoForm.querySelector('#project').value
      )
      updateUI()
      clearAddTodoForm()
      addTodoModal.close()
    }
  }

  const loadEventListeners = () => {
    addTodoOpenBtn.addEventListener('click', () => addTodoModal.showModal())
    addTodoCloseBtn.addEventListener('click', () => {
      clearAddTodoForm()
      addTodoModal.close()
    })
    addTodoForm.addEventListener('submit', addTodoFormHandler)
  }

  loadEventListeners()
  updateUI()
}

App()

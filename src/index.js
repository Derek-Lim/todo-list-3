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
    document.querySelector('.todo-container').innerHTML = ''

    const list = TL.getList()
    list.forEach(item => createTodo(item.title, item.dueDate, item.priority))
  }

  const createTodo = (title, dueDate, priority) => {
    const todoContainer = document.querySelector('.todo-container')
  
    const todoItem = document.createElement('div')
    todoItem.classList.add('todo-item', `priority-${priority}`)
    todoContainer.appendChild(todoItem)
  
    const todoItemSection1 = document.createElement('div')
    todoItemSection1.classList.add('todo-item-section')
    todoItem.appendChild(todoItemSection1)
  
    const input = document.createElement('input')
    input.setAttribute('type', 'checkbox')
    todoItemSection1.appendChild(input)
  
    const span1 = document.createElement('span')
    span1.textContent = title
    todoItemSection1.appendChild(span1)
  
    const todoItemSection2 = document.createElement('div')
    todoItemSection2.classList.add('todo-item-section')
    todoItem.appendChild(todoItemSection2)
  
    const span2 = document.createElement('span')
    span2.textContent = dateFormatter(dueDate)
    todoItemSection2.appendChild(span2)
  
    const button = document.createElement('button')
    button.textContent = 'Details'
    todoItemSection2.appendChild(button)
  
    const img1 = document.createElement('img')
    img1.src = editIcon
    img1.setAttribute('height', '20px')
    todoItemSection2.appendChild(img1)
  
    const img2 = document.createElement('img')
    img2.src = deleteIcon
    img2.setAttribute('height', '20px')
    todoItemSection2.appendChild(img2)
  }

  const clearAddTodoForm = () => {
    addTodoForm.querySelector('#title').value = ''
    addTodoForm.querySelector('#project').value = ''
    addTodoForm.querySelector('#due-date').value = ''
    addTodoForm.querySelector('#description').value = ''
    addTodoForm.querySelector('input[name="priority"]:checked').checked = false
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

  const addTodoFormHandler = (e) => {
    e.preventDefault()

    TL.addTodo(
      addTodoForm.querySelector('#title').value,
      addTodoForm.querySelector('#description').value,
      addTodoForm.querySelector('#due-date').value,
      addTodoForm.querySelector('input[name="priority"]:checked').id,
      addTodoForm.querySelector('#project').value
    )
    updateTodoContainer()
    clearAddTodoForm()
    addTodoModal.close()
  }

  const loadEventListeners = () => {
    addTodoOpenBtn.addEventListener('click', () => addTodoModal.showModal())
    addTodoCloseBtn.addEventListener('click', () => addTodoModal.close())
    addTodoForm.addEventListener('submit', addTodoFormHandler)
  }

  loadEventListeners()
  updateTodoContainer()
}

App()

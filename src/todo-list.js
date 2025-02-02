export default function TodoList() {
  const list = JSON.parse(localStorage.getItem('todoList')) || []

  const getList = () => list

  const addTodo = (title, description, dueDate, priority, project) => {
    list.push({
      title: title,
      description: description,
      dueDate: dueDate,
      priority: priority,
      project: project,
      completed: false
    })
    localStorage.setItem('todoList', JSON.stringify(list))
  }

  const toggleCompletion = (index) => {
    list[index].completed = !list[index].completed
    localStorage.setItem('todoList', JSON.stringify(list))
  }

  return { getList, addTodo, toggleCompletion }
}
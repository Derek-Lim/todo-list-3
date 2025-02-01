export default function TodoList() {
  const list = [
    {
      title: 'Learn Webpack',
      description: 'read about webpack and do projects',
      dueDate: '2025-02-01',
      priority: 'high',
      project: 'Study',
      completed: false
    },
    {
      title: 'Jog',
      description: 'run at moderate pace for 2 miles',
      dueDate: '2025-02-01',
      priority: 'medium',
      project: 'Gym',
      completed: false
    },
    {
      title: 'Water plants',
      description: 'pour 100ml each into all pots',
      dueDate: '2025-02-02',
      priority: 'low',
      project: 'Work',
      completed: false
    }
  ]

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
  }

  const toggleCompletion = (index) => {
    list[index].completed = !list[index].completed
  }

  return { getList, addTodo, toggleCompletion }
}
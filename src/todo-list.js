export default function TodoList() {
  const list = [
    {
      title: 'Learn Webpack',
      description: 'read about webpack and do projects',
      dueDate: '2025-02-01',
      priority: 'high',
      project: 'Study'
    },
    {
      title: 'Jog',
      description: 'run at moderate pace for 2 miles',
      dueDate: '2025-02-01',
      priority: 'medium',
      project: 'Gym'
    },
    {
      title: 'Water plants',
      description: 'pour 100ml each into all pots',
      dueDate: '2025-02-02',
      priority: 'low',
      project: 'Work'
    }
  ]

  const getList = () => list

  const addTodo = (title, description, dueDate, priority, project) => {
    list.push({
      title: title,
      description: description,
      dueDate: dueDate,
      priority: priority,
      project: project
    })
  }

  return { getList, addTodo }
}
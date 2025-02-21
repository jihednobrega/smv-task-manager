import { useState, useEffect } from 'react'

import { Header } from '../../components/Header'
import { Input } from '../../components/Input'
import { TasksField } from '../../components/TasksField'

import { TaskType } from '../../types/task'

export function Home() {
  const [tasks, setTasks] = useState<TaskType[]>(() => {
    const storedTasks = localStorage.getItem('tasks')
    return storedTasks ? JSON.parse(storedTasks) : []
  })

  const [filter, setFilter] = useState<'' | 'all' | 'active' | 'completed'>('')
  const [orderCriterion, setOrderCriterion] = useState<
    '' | 'most-urgent' | 'least-urgent'
  >('')

  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks')
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  function addTask(
    title: string,
    priority: 'low' | 'medium' | 'high' | 'urgent',
  ) {
    if (title.trim() === '') {
      return
    }

    setTasks([
      ...tasks,
      {
        id: crypto.randomUUID(),
        title,
        priority,
        isCompleted: false,
      },
    ])
  }

  function toggleTask(id: string) {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, isCompleted: !task.isCompleted } : task,
      ),
    )
  }

  function removeTask(id: string) {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  function handleFilterChange(newFilter: 'all' | 'active' | 'completed' | '') {
    setFilter(newFilter)
  }

  function handleOrderChange(newOrder: '' | 'most-urgent' | 'least-urgent') {
    setOrderCriterion(newOrder)
  }

  function handleEditTask(
    id: string,
    newTitle: string,
    newPriority: TaskType['priority'],
  ) {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id
          ? { ...task, title: newTitle, priority: newPriority }
          : task,
      ),
    )
  }

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'completed') {
      return task.isCompleted
    }

    if (filter === 'active') {
      return !task.isCompleted
    }

    return true
  })

  const priorityMap = { low: 1, medium: 2, high: 3, urgent: 4 }
  const orderedTasks = [...filteredTasks]

  if (orderCriterion === 'most-urgent') {
    orderedTasks.sort(
      (a, b) => priorityMap[b.priority] - priorityMap[a.priority],
    )
  }

  if (orderCriterion === 'least-urgent') {
    orderedTasks.sort(
      (a, b) => priorityMap[a.priority] - priorityMap[b.priority],
    )
  }

  return (
    <>
      <Header />

      <main className="max-w-3xl mx-auto px-4">
        <Input onAddTask={addTask} />
        <TasksField
          tasks={orderedTasks}
          onToggleTask={toggleTask}
          onRemoveTask={removeTask}
          filter={filter}
          onFilterChange={handleFilterChange}
          orderCriterion={orderCriterion}
          onOrderChange={handleOrderChange}
          onEditTask={handleEditTask}
        />
      </main>
    </>
  )
}

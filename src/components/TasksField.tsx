import { ClipboardText, Funnel, FunnelSimple } from '@phosphor-icons/react'
import { Task } from './Task'
import { TaskType } from '../types/task'
import { Select, SelectOptions } from './Select'
import { useState } from 'react'

type TasksFieldProps = {
  tasks: TaskType[]
  onToggleTask: (id: string) => void
  onRemoveTask: (id: string) => void
  filter: 'all' | 'active' | 'completed' | ''
  onFilterChange: (newFilter: 'all' | 'active' | 'completed' | '') => void
  orderCriterion: '' | 'most-urgent' | 'least-urgent'
  onOrderChange: (newPriority: '' | 'most-urgent' | 'least-urgent') => void
  onEditTask: (
    id: string,
    newTitle: string,
    newPriority: TaskType['priority'],
  ) => void
}

export function TasksField({
  tasks,
  onToggleTask,
  onRemoveTask,
  filter,
  onFilterChange,
  orderCriterion,
  onEditTask,
  onOrderChange,
}: TasksFieldProps) {
  const totalTasks = tasks.length
  const completedTasks = tasks.filter((task) => task.isCompleted).length
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null)

  const filterOptions: SelectOptions[] = [
    { value: 'all', label: 'Todas' },
    { value: 'active', label: 'Ativas' },
    { value: 'completed', label: 'Concluídas' },
  ]

  const priorityOptions: SelectOptions[] = [
    { value: 'most-urgent', label: 'Mais Urgente' },
    { value: 'least-urgent', label: 'Menos Urgente' },
  ]

  function handleStartEditing(id: string) {
    setEditingTaskId(id)
  }

  function handleCancelEditing() {
    setEditingTaskId(null)
  }

  return (
    <div className="pt-16">
      <header className="flex justify-between items-center mb-2 gap-4">
        <div className="flex items-center gap-2">
          <strong className="text-amber-300">Tarefas Criadas</strong>
          <span className="bg-zinc-600 text-zinc-200 py-0.5 px-2 rounded-full text-xs font-bold">
            {totalTasks}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <strong className="text-amber-500">Concluídas</strong>
          <span className="bg-zinc-600 text-zinc-200 py-0.5 px-2 rounded-full text-xs font-bold">
            {completedTasks} de {totalTasks}
          </span>
        </div>
      </header>

      <main className="flex flex-col gap-3">
        <div className="ml-auto flex items-center justify-center gap-2 relative">
          <Select
            title="Filtrar por"
            value={filter}
            options={filterOptions}
            onChange={(value) =>
              onFilterChange(value as 'all' | 'active' | 'completed')
            }
            placeholder="Filtrar"
            icon={<Funnel size={16} className="text-gray-400" />}
          />

          <Select
            title="Ordenar por"
            value={orderCriterion}
            options={priorityOptions}
            onChange={(value) =>
              onOrderChange(value as 'most-urgent' | 'least-urgent' | '')
            }
            placeholder="Ordenar"
            icon={<FunnelSimple size={16} className="text-gray-400" />}
          />
        </div>

        {tasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            onToggleTask={onToggleTask}
            onRemoveTask={onRemoveTask}
            onEditTask={onEditTask}
            isEditing={editingTaskId === task.id}
            onStartEditing={() => handleStartEditing(task.id)}
            onCancelEditing={handleCancelEditing}
          />
        ))}

        {totalTasks === 0 && (
          <section className="mt-16 flex flex-col items-center justify-center gap-4 text-center text-zinc-400">
            <ClipboardText size={60} className="fill-zinc-600" />
            <div>
              <p className="font-bold">
                Você ainda não cadastrou nenhuma tarefa
              </p>
              <span>Crie e organize as tarefas do seu dia!</span>
            </div>
          </section>
        )}
      </main>
    </div>
  )
}

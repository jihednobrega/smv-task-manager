import {
  Trash,
  Check,
  WarningCircle,
  PencilSimple,
  X,
} from '@phosphor-icons/react'
import { TaskType } from '../types/task'
import { useEffect, useRef, useState } from 'react'
import { Select, SelectOptions } from './Select'

type TaskProps = {
  task: TaskType
  onToggleTask: (id: string) => void
  onRemoveTask: (id: string) => void
  onEditTask: (
    id: string,
    newTitle: string,
    newPriority: TaskType['priority'],
  ) => void
  isEditing: boolean
  onStartEditing: () => void
  onCancelEditing: () => void
}

const priorityColors: Record<
  Exclude<TaskType['priority'], 'urgent'>,
  string
> = {
  high: 'bg-red-500 opacity-70',
  medium: 'bg-yellow-500 opacity-70',
  low: 'bg-green-500 opacity-70',
}

export function Task({
  task,
  onToggleTask,
  onRemoveTask,
  onEditTask,
  isEditing,
  onStartEditing,
  onCancelEditing,
}: TaskProps) {
  const [editedTitle, setEditedTitle] = useState(task.title)
  const [editedPriority, setEditedPriority] = useState<TaskType['priority']>(
    task.priority,
  )

  const editContainerRef = useRef<HTMLDivElement | null>(null)
  const titleRef = useRef(editedTitle)
  const priorityRef = useRef(editedPriority)

  useEffect(() => {
    titleRef.current = editedTitle
    priorityRef.current = editedPriority
  }, [editedTitle, editedPriority])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        editContainerRef.current &&
        !editContainerRef.current.contains(event.target as Node)
      ) {
        onEditTask(task.id, titleRef.current, priorityRef.current)
        onCancelEditing()
      }
    }

    if (isEditing) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isEditing])

  const priorityOptions: SelectOptions[] = [
    { value: 'low', label: 'Baixa' },
    { value: 'medium', label: 'Média' },
    { value: 'high', label: 'Alta' },
    { value: 'urgent', label: 'Urgente' },
  ]

  function handleSaveEdit() {
    if (editedTitle.trim() !== '') {
      onEditTask(task.id, editedTitle, editedPriority)
      onCancelEditing()
    }
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      handleSaveEdit()
    }

    if (event.key === 'Escape') {
      setEditedTitle(task.title)
      setEditedPriority(task.priority)
      onCancelEditing()
    }
  }

  return (
    <div
      className="flex justify-between items-center gap-3 bg-zinc-700 border-[1px] border-zinc-600 p-4 rounded-xl focus-within:border-amber-500 relative group"
      onClick={(e) => e.stopPropagation()}
    >
      <div
        onClick={() => onToggleTask(task.id)}
        className="w-5 h-5 focus-within:border-none"
      >
        <button
          tabIndex={0}
          className={`w-5 h-5 border-2 rounded-full align-top border-amber-300 hover:border-amber-400 hover:cursor-pointer focus:border-amber-500 ${task.isCompleted ? 'bg-amber-400 border-amber-400 focus:bg-amber-500' : ''} `}
          title={
            task.isCompleted
              ? 'Marcar como não concluída'
              : 'Marcar como concluída'
          }
          aria-label={
            task.isCompleted
              ? 'Marcar como não concluída'
              : 'Marcar como concluída'
          }
        >
          {task.isCompleted ? (
            <Check weight="bold" className="fill-zinc-100" />
          ) : (
            ''
          )}
        </button>
      </div>

      <div className="w-full flex justify-between items-center gap-2 flex-nowrap">
        {task.priority === 'urgent' ? (
          <WarningCircle size={16} weight="bold" className="text-orange-500" />
        ) : (
          <div
            className={`w-3 h-3 rounded-full ${priorityColors[task.priority]}`}
          />
        )}

        {isEditing ? (
          <div
            ref={editContainerRef}
            className="flex items-center gap-2 w-full"
          >
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full bg-transparent border-b border-amber-400 text-zinc-300 outline-none"
              autoFocus
            />

            <Select
              value={editedPriority}
              options={priorityOptions}
              onChange={(value) =>
                setEditedPriority(value as TaskType['priority'])
              }
              placeholder=""
              showIcons={true}
            />

            <button
              onClick={() => {
                onEditTask(task.id, editedTitle, editedPriority)
                onCancelEditing()
              }}
              className="text-green-500 p-0.5 rounded-sm hover:text-green-400 hover:cursor-pointer hover:bg-zinc-500 focus:bg-zinc-500"
              title="Salvar edição"
            >
              <Check size={16} />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation()
                setEditedTitle(task.title)
                setEditedPriority(task.priority)
                onCancelEditing()
              }}
              className="text-red-500 p-0.5 rounded-sm hover:text-red-400 hover:cursor-pointer hover:bg-zinc-500 focus:bg-zinc-500"
              title="Cancelar edição"
            >
              <X size={16} />
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-1 mr-auto ">
            <p
              className={`mr-auto text-zinc-300 break-words ${task.isCompleted ? 'line-through' : ''}`}
            >
              {task.title}
            </p>

            {task.isCompleted ? null : (
              <button
                onClick={onStartEditing}
                className={`opacity-0 group-hover:opacity-100 flex items-center 
              justify-center p-0.5 text-zinc-300 hover:text-zinc-100 
              hover:cursor-pointer hover:bg-zinc-600 rounded-full group-focus-within:opacity-100 focus-within:bg-zinc-600
              `}
                title="Editar tarefa"
                tabIndex={0}
              >
                <PencilSimple size={16} />
              </button>
            )}
          </div>
        )}

        {task.isCompleted ? (
          <span className="text-sm text-zinc-500 italic font-light whitespace-wrap text-end">
            Concluída em {new Date().toLocaleDateString('pt-BR')}
          </span>
        ) : (
          !isEditing && (
            <button
              onClick={() => {
                const confirmDelete = window.confirm(
                  'Excluir Tarefa? Esta ação não pode ser desfeita.',
                )
                if (confirmDelete) {
                  onRemoveTask(task.id)
                }
              }}
              className="w-6 h-6 flex items-center justify-center border-0 text-zinc-300 rounded-sm hover:cursor-pointer hover:bg-zinc-500 focus:bg-zinc-500"
              title="Excluir tarefa"
            >
              <Trash size={16} weight="bold" />
            </button>
          )
        )}
      </div>
    </div>
  )
}

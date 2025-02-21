import { CaretDown, PlusCircle } from '@phosphor-icons/react'
import { FormEvent, useState } from 'react'
import { SelectOptions, Select } from './Select'

export type PriorityOptions = 'low' | 'medium' | 'high' | 'urgent'

type InputProps = {
  onAddTask: (title: string, priority: PriorityOptions) => void
}

export function Input({ onAddTask }: InputProps) {
  const [taskTitle, setTaskTitle] = useState('')
  const [priority, setPriority] = useState<PriorityOptions>('low')

  const priorityOptions: SelectOptions[] = [
    { value: 'low', label: 'Baixa' },
    { value: 'medium', label: 'Média' },
    { value: 'high', label: 'Alta' },
    { value: 'urgent', label: 'Urgente' },
  ]

  const isInputEmpty = taskTitle.trim().length === 0

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    if (!isInputEmpty) {
      onAddTask(taskTitle, priority)
      setTaskTitle('')
      setPriority('low')
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="h-14 flex justify-center gap-2 mt-[-27px]"
    >
      <div className="w-full relative">
        <input
          type="text"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          placeholder="Adicione uma nova tarefa"
          title="Adicione uma nova tarefa"
          className="w-full h-full border-[1px] border-zinc-900 rounded-lg bg-zinc-700 px-4 text-base text-gray-100 focus:border-amber-500"
        />

        <Select
          value={priority}
          options={priorityOptions}
          onChange={(value) => setPriority(value as PriorityOptions)}
          title="Prioridade da tarefa"
          className="absolute top-[50%] right-2 translate-y-[-50%] bg-zinc-700"
          icon={<CaretDown size={16} weight="bold" className="fill-zinc-300" />}
          showIcons={true}
        />
      </div>

      <button
        type="submit"
        disabled={isInputEmpty}
        className="w-24 px-4 text-zinc-100
         bg-amber-500 border-0 flex items-center justify-center font-bold rounded-lg gap-2 
         hover:cursor-pointer hover:bg-amber-400 focus-visible:bg-amber-400 disabled:opacity-50 disabled:hover:bg-amber-500 disabled:cursor-not-allowed"
        title="Criar tarefa"
      >
        Criar
        <PlusCircle size={16} weight="bold" />
      </button>
    </form>
  )
}

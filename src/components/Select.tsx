import { WarningCircle } from '@phosphor-icons/react'
import React, { ChangeEvent, JSX } from 'react'

export type SelectOptions = {
  value: string
  label: string
}

type SelectProps = React.ComponentProps<'select'> & {
  value: string
  options: SelectOptions[]
  onChange: (value: string) => void
  placeholder?: string
  className?: string
  icon?: JSX.Element
  showIcons?: boolean
}

const priorityColors: Record<string, string> = {
  high: 'bg-red-500 opacity-70',
  medium: 'bg-yellow-500 opacity-70',
  low: 'bg-green-500 opacity-70',
}

export function Select({
  value,
  options,
  onChange,
  placeholder,
  className,
  icon,
  showIcons = false,
  children,
  ...rest
}: SelectProps) {
  function handleChange(event: ChangeEvent<HTMLSelectElement>) {
    onChange(event.target.value)
  }

  const selectedOption = options.find((option) => option.value === value)

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="relative flex items-center py-1 px-2 rounded-lg bg-zinc-700 hover:cursor-pointer hover:bg-zinc-600 focus-within:bg-zinc-600">
        {icon && <span>{icon}</span>}

        <select
          value={value}
          onChange={handleChange}
          className="absolute inset-0 opacity-0 appearance-none w-full pl-2 rounded-lg text-gray-300 bg-transparent hover:cursor-pointer focus:outline-none text-sm"
          {...rest}
        >
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              className="bg-zinc-700 text-white text-sm py-2 px-4 hover:bg-zinc-600 focus:bg-zinc-600"
            >
              {option.label}
            </option>
          ))}
        </select>

        <div className="flex items-center gap-1 pl-1">
          {showIcons && selectedOption?.value === 'urgent' ? (
            <WarningCircle
              size={16}
              weight="bold"
              className="text-orange-500"
            />
          ) : showIcons ? (
            <div
              className={`w-2.5 h-2.5 rounded-full pointer-events-none ${priorityColors[selectedOption?.value || 'low']}`}
            />
          ) : null}
          <span className="text-gray-300 text-sm">
            {selectedOption?.label || placeholder}
          </span>
        </div>
      </div>
    </div>
  )
}

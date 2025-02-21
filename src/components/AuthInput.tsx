type Props = React.ComponentProps<'input'> & {
  legend?: string
}

export function AuthInput({ legend, type = 'text', ...rest }: Props) {
  return (
    <fieldset className="flex flex-1 max-h-20 text-gray-200 focus-within:text-green-100">
      {legend && (
        <legend className="uppercase text-xs mb-2 text-inherit">
          {legend}
        </legend>
      )}

      <input
        type={type}
        className="w-full h-12 border-[1px] border-zinc-900 rounded-lg bg-zinc-700 px-4 text-base text-gray-100 focus:border-amber-500 transition ease-linear"
        {...rest}
      />
    </fieldset>
  )
}

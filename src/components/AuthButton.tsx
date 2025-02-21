type Props = React.ComponentProps<'button'>

export function AuthButton({
  children,
  className,
  type = 'button',
  ...rest
}: Props) {
  return (
    <button
      type={type}
      className={
        'h-12 flex items-center justify-center bg-amber-500 rounded-lg text-zinc-100 hover:cursor-pointer hover:bg-amber-400 transition ease-linear disabled:opacity-50 focus:bg-amber-400'
      }
      {...rest}
    >
      {children}
    </button>
  )
}

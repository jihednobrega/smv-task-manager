import logo from '/assets/logo.png'

export function Header() {
  return (
    <div className="w-full h-48 py-16 bg-zinc-900 flex items-center justify-center">
      <img src={logo} alt="" className="h-12" />
    </div>
  )
}

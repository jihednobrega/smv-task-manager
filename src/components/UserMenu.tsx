import { SignOut } from '@phosphor-icons/react'
import { useAuth } from '../contexts/AuthContext'

export function UserMenu() {
  const { user, logout } = useAuth()

  const userName =
    (user as any)?.name ||
    (user as any)?.displayName ||
    (user as any)?.email ||
    'Usuário'

  return (
    <div className="flex items-center gap-2 p-2 absolute top-2 right-2">
      <span className="text-sm text-zinc-500">Olá, {userName}</span>
      <button
        onClick={logout}
        title="Sair"
        className="text-sm px-1 py-1 rounded-lg transition ease-linear text-zinc-300 hover:cursor-pointer hover:bg-zinc-800 focus:bg-zinc-800"
        tabIndex={0}
      >
        <SignOut size={24} />
      </button>
    </div>
  )
}

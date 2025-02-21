import { UserMenu } from './UserMenu'
import { useAuth } from '../contexts/AuthContext'

import logo from '/assets/logo.png'

export function Header() {
  const { user } = useAuth()

  return (
    <div className="w-full h-48 py-16 bg-zinc-900 flex items-center justify-center">
      {user && <UserMenu />}
      <img src={logo} alt="" className="h-12" />
    </div>
  )
}

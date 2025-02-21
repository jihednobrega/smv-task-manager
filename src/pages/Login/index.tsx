import { GoogleLogo } from '@phosphor-icons/react'
import { useAuth } from '../../contexts/AuthContext'
import { Header } from '../../components/Header'
import { AuthInput } from '../../components/AuthInput'
import { AuthButton } from '../../components/AuthButton'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router'

export function Login() {
  const { signInWithGoogle, loginWithEmail } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    if (loginWithEmail(email, password)) {
      navigate('/')
    } else {
      alert('E-mail ou senha inválidos.')
    }
  }

  return (
    <>
      <Header />
      <form
        onSubmit={handleLogin}
        className="max-w-lg mx-auto mt-10 px-4 flex flex-col gap-4"
      >
        <AuthInput
          required
          legend="E-mail"
          type="email"
          placeholder="Insira seu email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <AuthInput
          required
          legend="Senha"
          type="password"
          placeholder="Insira sua senha"
          onChange={(e) => setPassword(e.target.value)}
        />

        <AuthButton type="submit">Entrar</AuthButton>

        <Link
          to="/signup"
          className="text-sm text-zinc-100 mb-4 text-center hover:text-amber-600 transition ease-linear focus:text-amber-600"
        >
          Criar conta
        </Link>
      </form>
      <button
        onClick={signInWithGoogle}
        className="mx-auto flex items-center gap-3 bg-zinc-700 hover:bg-zinc-600 text-rose-500 font-bold px-6 py-3 rounded-lg hover:cursor-pointer hover:text-rose-400 focus:bg-zinc-600 transition ease-linear"
      >
        <GoogleLogo size={24} weight="bold" />
        Entrar com Google
      </button>
    </>
  )
}

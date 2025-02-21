import { Header } from '../../components/Header'
import { useState } from 'react'
import { AuthInput } from '../../components/AuthInput'
import { AuthButton } from '../../components/AuthButton'
import { Link, useNavigate } from 'react-router'
import { useAuth } from '../../contexts/AuthContext'

export function Signup() {
  const { signupWithEmail } = useAuth()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const navigate = useNavigate()

  function handleSignup(e: React.FormEvent) {
    e.preventDefault()
    if (password.length < 6) {
      alert('A senha deve ter no mínimo 6 caracteres.')
      return
    }
    if (password !== passwordConfirm) {
      alert('As senhas não correspondem.')
      return
    }
    if (signupWithEmail(name, email, password)) {
      alert('Cadastro realizado com sucesso!')
      navigate('/login')
    } else {
      alert('E-mail já cadastrado.')
    }
  }

  return (
    <>
      <Header />
      <form
        onSubmit={handleSignup}
        className="max-w-lg mx-auto mt-10 px-4 flex flex-col gap-4"
      >
        <AuthInput
          required
          legend="Name"
          value={name}
          placeholder="Seu nome"
          onChange={(e) => setName(e.target.value)}
        />

        <AuthInput
          required
          legend="E-mail"
          type="email"
          value={email}
          placeholder="Insira seu email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="flex gap-4">
          <AuthInput
            required
            legend="Senha (mínimo 6 caracteres)"
            value={password}
            type="password"
            placeholder="Insira sua senha"
            onChange={(e) => setPassword(e.target.value)}
          />

          <AuthInput
            required
            legend="Confirmação da senha"
            value={passwordConfirm}
            type="password"
            placeholder="Confirme sua senha"
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
        </div>

        <AuthButton type="submit">Cadastrar</AuthButton>

        <Link
          to="/login"
          className="text-sm text-zinc-100 mb-4 text-center hover:text-amber-600 transition ease-linear focus:text-amber-600"
        >
          Já tenho uma conta
        </Link>
      </form>
    </>
  )
}

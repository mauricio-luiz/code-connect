import { useState, type SubmitEvent } from 'react'
import { Button } from '../../atoms/Button'
import { Checkbox } from '../../atoms/Checkbox'
import { FormField } from '../../molecules/FormField'

export type SignupValues = {
  nome: string
  email: string
  senha: string
  lembrar: boolean
}

type SignupFormProps = {
  onSubmit?: (values: SignupValues) => void
}

export function SignupForm({ onSubmit }: SignupFormProps) {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [lembrar, setLembrar] = useState(false)

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault()
    onSubmit?.({ nome, email, senha, lembrar })
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <FormField
          label="Nome"
          name="nome"
          placeholder="Nome completo"
          autoComplete="name"
          required
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <FormField
          label="Email"
          name="email"
          type="email"
          placeholder="Digite seu email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="flex flex-col gap-2">
          <FormField
            label="Senha"
            name="senha"
            type="password"
            placeholder="******"
            autoComplete="new-password"
            required
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
          <Checkbox
            label="Lembrar-me"
            name="lembrar"
            checked={lembrar}
            onChange={(e) => setLembrar(e.target.checked)}
          />
        </div>
      </div>
      <Button type="submit" icon="arrow-right">
        Cadastrar
      </Button>
    </form>
  )
}

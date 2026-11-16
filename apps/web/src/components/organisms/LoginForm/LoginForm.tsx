import { useState, type SubmitEvent } from 'react'
import { Button } from '../../atoms/Button'
import { Checkbox } from '../../atoms/Checkbox'
import { TextLink } from '../../atoms/TextLink'
import { FormField } from '../../molecules/FormField'

export type LoginValues = {
  usuario: string
  senha: string
  lembrar: boolean
}

type LoginFormProps = {
  onSubmit?: (values: LoginValues) => void
}

export function LoginForm({ onSubmit }: LoginFormProps) {
  const [usuario, setUsuario] = useState('')
  const [senha, setSenha] = useState('')
  const [lembrar, setLembrar] = useState(false)

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault()
    onSubmit?.({ usuario, senha, lembrar })
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <FormField
          label="Email ou usuário"
          name="usuario"
          placeholder="usuario123"
          autoComplete="username"
          required
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
        />
        <div className="flex flex-col gap-2">
          <FormField
            label="Senha"
            name="senha"
            type="password"
            placeholder="******"
            autoComplete="current-password"
            required
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
          <div className="flex items-center justify-between">
            <Checkbox
              label="Lembrar-me"
              name="lembrar"
              checked={lembrar}
              onChange={(e) => setLembrar(e.target.checked)}
            />
            <TextLink to="/esqueci-senha">Esqueci a senha</TextLink>
          </div>
        </div>
      </div>
      <Button type="submit" icon="arrow-right">
        Login
      </Button>
    </form>
  )
}

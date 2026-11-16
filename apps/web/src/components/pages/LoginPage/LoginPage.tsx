import { AuthTemplate } from '../../templates/AuthTemplate'
import { AuthFooterLink } from '../../organisms/AuthFooterLink'
import { LoginForm } from '../../organisms/LoginForm'

export function LoginPage() {
  return (
    <AuthTemplate
      banner={{ src: '/banner-login.png', alt: 'Pessoa programando em frente a telas com interfaces verdes', position: '50% center' }}
      title="Login"
      subtitle="Boas-vindas! Faça seu login."
      // TODO: integrar com a API de autenticação quando o endpoint existir.
      footer={
        <AuthFooterLink
          question="Ainda não tem conta?"
          linkText="Crie seu cadastro!"
          to="/cadastro"
          icon="clipboard"
        />
      }
    >
      <LoginForm onSubmit={(values) => console.info('login', values.usuario)} />
    </AuthTemplate>
  )
}

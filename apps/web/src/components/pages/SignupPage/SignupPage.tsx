import { AuthTemplate } from '../../templates/AuthTemplate'
import { AuthFooterLink } from '../../organisms/AuthFooterLink'
import { SignupForm } from '../../organisms/SignupForm'

export function SignupPage() {
  return (
    <AuthTemplate
      banner={{
        src: '/banner-cadastro.png',
        alt: 'Mulher programando em frente a telas com interfaces verdes',
        position: '56% center',
      }}
      title="Cadastro"
      subtitle="Olá! Preencha seus dados."
      // TODO: integrar com a API de cadastro quando o endpoint existir.
      footer={
        <AuthFooterLink
          layout="inline"
          question="Já tem conta?"
          linkText="Faça seu login!"
          to="/login"
          icon="login"
        />
      }
    >
      <SignupForm onSubmit={(values) => console.info('cadastro', values.email)} />
    </AuthTemplate>
  )
}

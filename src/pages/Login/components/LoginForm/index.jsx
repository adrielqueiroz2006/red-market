import { Input } from '../../../../components/Input'
import {
  Container,
  Form,
  FormWrapper,
  InputTitle,
  InputWrapper,
  SubmitButton,
  Title,
} from './styles'

export function LoginForm() {
  return (
    <Container>
      <FormWrapper>
        <Title>Fazer Login</Title>

        <Form>
          <InputWrapper>
            <InputTitle>Usuário</InputTitle>
            <Input Icon="User" Text="Digite o seu usuário" />
          </InputWrapper>

          <InputWrapper>
            <InputTitle>Senha</InputTitle>
            <Input Icon="LockSimple" Text="Digite as sua senha" />
          </InputWrapper>

          <SubmitButton>
            <InputTitle style={{ fontSize: 18 }}>Fazer Login</InputTitle>
          </SubmitButton>
        </Form>
      </FormWrapper>
    </Container>
  )
}

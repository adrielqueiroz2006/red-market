import { useRef, useState } from 'react'

import { auth } from '../../../../services/firebaseConfig'
import { signInWithEmailAndPassword } from 'firebase/auth'

import { Input } from '../../../../components/Input'

import {
  Container,
  ErrorMessage,
  Form,
  FormWrapper,
  InputTitle,
  InputWrapper,
  SubmitButton,
  Title,
} from './styles'
import { WarningCircleIcon } from '@phosphor-icons/react'

import { useTheme } from 'styled-components'

import { useNavigate } from 'react-router-dom'

export function LoginForm() {
  const emailRef = useRef()
  const passwordRef = useRef()

  const [message, setMessage] = useState('')

  const navigate = useNavigate()

  async function handleLogin(e) {
    e.preventDefault()

    setMessage('')

    const email = emailRef.current.value
    const password = passwordRef.current.value

    try {
      await signInWithEmailAndPassword(auth, email, password)
      navigate('/home')
    } catch {
      setMessage('Usuário ou senha inválidos!')
      return
    }
  }

  const theme = useTheme()

  return (
    <Container>
      <FormWrapper onSubmit={handleLogin}>
        <Title>Fazer Login</Title>

        {message ? (
          <ErrorMessage>
            <WarningCircleIcon size={24} color={theme['red-500']} />
            <p>{message}</p>
          </ErrorMessage>
        ) : null}

        <Form>
          <InputWrapper>
            <InputTitle>Usuário</InputTitle>
            <Input Icon="User" Text="Digite o seu usuário" ref={emailRef} />
          </InputWrapper>

          <InputWrapper>
            <InputTitle>Senha</InputTitle>
            <Input
              Icon="LockSimple"
              Text="Digite as sua senha"
              ref={passwordRef}
              type="password"
            />
          </InputWrapper>

          <SubmitButton type="submit">
            <InputTitle style={{ fontSize: 18 }}>Fazer Login</InputTitle>
          </SubmitButton>
        </Form>
      </FormWrapper>
    </Container>
  )
}

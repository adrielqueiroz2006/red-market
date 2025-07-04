import { Container, InputWrapper } from './styles'

import * as PhosporIcons from '@phosphor-icons/react'

export function Input({
  Icon = 'LockSimple',
  Text = 'Digite a sua senha',
  ...rest
}) {
  const InputIcon = PhosporIcons[Icon]

  return (
    <Container>
      <InputIcon size={20} />
      <InputWrapper placeholder={Text} {...rest} />
    </Container>
  )
}

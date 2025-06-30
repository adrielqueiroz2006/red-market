import { useTheme } from 'styled-components'
import { ButtonTitle, Container } from './styles'

import * as PhosporIcons from '@phosphor-icons/react'

export function Button({
  Icon = 'PlusCircle',
  Text = 'Adicionar novo',
  size = 256,
}) {
  const InputIcon = PhosporIcons[Icon]

  const theme = useTheme()

  return (
    <Container style={{ width: `${size}px` }}>
      <InputIcon size={20} color={theme.white} />
      <ButtonTitle>{Text}</ButtonTitle>
    </Container>
  )
}

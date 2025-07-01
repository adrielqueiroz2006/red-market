import { useTheme } from 'styled-components'
import { ButtonTitle, Container } from './styles'

import * as PhosporIcons from '@phosphor-icons/react'

export function Button({
  Icon = 'PlusCircle',
  Text = 'Adicionar novo',
  Size = 256,
  Color = 'Red',
  ...rest
}) {
  const ButtonIcon = PhosporIcons[Icon]

  const theme = useTheme()

  return (
    <Container
      {...rest}
      style={{
        width: `${Size}px`,
        backgroundColor: Color === 'Red' ? theme['red-500'] : theme['gray-800'],
      }}
    >
      <ButtonIcon size={20} color={theme.white} />
      <ButtonTitle>{Text}</ButtonTitle>
    </Container>
  )
}

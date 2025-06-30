import * as PhosporIcons from '@phosphor-icons/react'
import { useTheme } from 'styled-components'

import { Container } from './styles'

export function ActionButton({ Icon }) {
  const InputIcon = PhosporIcons[Icon]

  const theme = useTheme()

  return (
    <Container
      style={{
        backgroundColor:
          Icon === 'Trash' ? theme['red-500'] : theme['blue-500'],
      }}
    >
      <InputIcon size={24} color={theme.white} />
    </Container>
  )
}

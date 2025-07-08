import { CircularProgress } from '@mui/material'

import { LoadingContainer } from './styles'

import { useTheme } from 'styled-components'

export function Loading() {
  const theme = useTheme()

  return (
    <LoadingContainer>
      <CircularProgress sx={{ color: theme['red-500'] }} />
    </LoadingContainer>
  )
}

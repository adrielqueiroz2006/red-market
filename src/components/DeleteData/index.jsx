import { Box, Grid } from '@mui/material'

import { Subtitle, Title } from './styles'
import { Button } from '../Button'

import { WarningCircleIcon } from '@phosphor-icons/react'

import { useTheme } from 'styled-components'

export function DeleteData({ onClose }) {
  const theme = useTheme()

  return (
    <Box
      height={'100%'}
      width={'100%'}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '25px',
      }}
    >
      <Title>Confirmar Exclusão</Title>

      <Box>
        <Grid container rowSpacing={2}>
          <Grid
            size={12}
            sx={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <WarningCircleIcon size={156} color={theme['red-500']} />
          </Grid>
          <Grid size={12}>
            <Subtitle>
              Tem certeza que deseja excluir o cliente
              <br />
              <strong>Adriel Queiroz?</strong>
            </Subtitle>
          </Grid>
        </Grid>
      </Box>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'right',
          gap: '32px',
        }}
      >
        <Button
          Icon="XCircle"
          Text="Cancelar"
          Size={212}
          Color="Black"
          onClick={() => onClose()}
        />
        <Button Icon="Trash" Text="Sim, excluir cliente!" />
      </Box>
    </Box>
  )
}

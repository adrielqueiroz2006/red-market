import { Box, Grid } from '@mui/material'

import { InputTitle, Title } from './styles'
import { Button } from '../Button'
import { Input } from '../Input'

export function AddNewData({ onClose }) {
  return (
    <Box
      height={'100%'}
      width={'100%'}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '50px',
      }}
    >
      <Title>Adicionar novo Cliente</Title>

      <Box>
        <Grid
          container
          rowSpacing={{ md: 8.5, sm: 2.5, xs: 2.5 }}
          columnSpacing={{ md: 8.5, sm: 2.5, xs: 2.5 }}
        >
          <Grid
            size={{ sm: 6, xs: 12 }}
            sx={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
          >
            <InputTitle>Nome</InputTitle>
            <Input Icon="User" Text="Digite o nome do cliente" />
          </Grid>

          <Grid
            size={{ sm: 6, xs: 12 }}
            sx={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
          >
            <InputTitle>CPF/CNPJ</InputTitle>
            <Input
              Icon="IdentificationCard"
              Text="Digite o CPF ou CNPJ do cliente"
            />
          </Grid>

          <Grid
            size={{ sm: 6, xs: 12 }}
            sx={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
          >
            <InputTitle>Endereço</InputTitle>
            <Input Icon="House" Text="Digite o endereço do cliente" />
          </Grid>

          <Grid
            size={{ sm: 6, xs: 12 }}
            sx={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
          >
            <InputTitle>Telefone</InputTitle>
            <Input Icon="Phone" Text="Digite o telefone do cliente" />
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
        <Button />
      </Box>
    </Box>
  )
}

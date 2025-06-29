import { Grid } from '@mui/material'

import { LoginBanner } from '../../components/LoginBanner'

import { Container } from './styles'

export function Login() {
  return (
    <Container>
      <Grid container spacing={1.25} sx={{ height: '100%' }}>
        <Grid size={6}>
          <LoginBanner />
        </Grid>
        <Grid size={6}></Grid>
      </Grid>
    </Container>
  )
}

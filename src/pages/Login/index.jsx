import { Grid } from '@mui/material'

import { LoginBanner } from './components/LoginBanner'

import { Container } from './styles'
import { LoginForm } from './components/LoginForm'

export function Login() {
  return (
    <Container>
      <Grid container spacing={1.25} sx={{ height: '100%' }}>
        <Grid size={6}>
          <LoginBanner />
        </Grid>
        <Grid size={6}>
          <LoginForm />
        </Grid>
      </Grid>
    </Container>
  )
}

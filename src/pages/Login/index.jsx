import { Grid } from '@mui/material'

import { LoginBanner } from './components/LoginBanner'

import { Container } from './styles'
import { LoginForm } from './components/LoginForm'

export function Login() {
  return (
    <Container>
      <Grid container spacing={1.25} sx={{ height: '100%' }}>
        <Grid size={{ sm: 6, xs: 0 }}>
          <LoginBanner />
        </Grid>
        <Grid size={{ sm: 6, xs: 12 }}>
          <LoginForm />
        </Grid>
      </Grid>
    </Container>
  )
}

import { Box, Grid } from '@mui/material'

import { LoginBanner } from './components/LoginBanner'

import { Container } from './styles'
import { LoginForm } from './components/LoginForm'

export function Login() {
  return (
    <Container>
      <Grid container spacing={1.25} sx={{ height: '100%' }}>
        <Grid
          size={{ md: 6, sm: 12, xs: 12 }}
          sx={{ display: { md: 'block', sm: 'none', xs: 'none' } }}
        >
          <LoginBanner />
        </Grid>
        <Grid size={{ md: 6, sm: 12, xs: 12 }}>
          <Box
            height={'100%'}
            width={'100%'}
            minWidth={'256px'}
            sx={{
              paddingLeft: { md: '8.33rem', sm: 0, xs: 0 },
              paddingRight: { md: '2rem', sm: 0, xs: 0 },
              display: 'flex',
              justifyContent: { md: 'flex-start', sm: 'center', xs: 'center' },
            }}
          >
            <LoginForm />
          </Box>
        </Grid>
      </Grid>
    </Container>
  )
}

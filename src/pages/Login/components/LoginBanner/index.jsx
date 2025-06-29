import { Container, Logo } from './styles'
import LogoIcon from '../../../../assets/Logo.svg'

export function LoginBanner() {
  return (
    <Container>
      <Logo src={LogoIcon} />
    </Container>
  )
}

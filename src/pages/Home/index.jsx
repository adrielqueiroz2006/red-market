import { MainLayout } from '../../layouts/MainLayout'

import { Box } from '@mui/material'

import {
  BrandName,
  BrandWrapper,
  GreetingsText,
  LogoIcon,
  SubTitle,
} from './styles'

import Logo from '../../assets/LogoHome.svg'

export function Home() {
  return (
    <MainLayout
      selectedPage="Entrada"
      children={
        <Box>
          <GreetingsText>
            Bem-vindo ao&nbsp;
            <BrandWrapper>
              <BrandName>Red Market</BrandName>
              <LogoIcon src={Logo} />
            </BrandWrapper>
          </GreetingsText>

          <SubTitle>O aplicativo de controle para o seu mercado</SubTitle>
        </Box>
      }
    />
  )
}

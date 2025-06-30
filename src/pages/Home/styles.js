import styled from 'styled-components'

export const GreetingsText = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  color: ${(props) => props.theme['gray-900']};
`

export const BrandWrapper = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 18px;
`

export const BrandName = styled.strong`
  font-size: 3rem;
  font-weight: bold;
  font-family: 'Oleo Script Swash Caps', system-ui;
  color: ${(props) => props.theme['red-500']};
`

export const LogoIcon = styled.img``

export const SubTitle = styled.h2`
  font-size: 2rem;
  font-weight: 400;
  font-style: italic;
  color: ${(props) => props.theme['gray-500']};
`

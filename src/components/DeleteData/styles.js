import styled from 'styled-components'

export const Title = styled.h1`
  font-size: 28px;
  font-weight: bold;
  color: ${(props) => props.theme['red-500']};
`

export const Subtitle = styled.h2`
  font-size: 24px;
  font-weight: 400;
  color: ${(props) => props.theme['gray-900']};

  text-align: center;
`

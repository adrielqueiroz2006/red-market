import styled from 'styled-components'

export const Container = styled.button`
  width: 256px;
  height: 54px;

  display: flex;
  align-items: center;
  justify-content: center;

  gap: 10px;

  border-radius: 4px;

  background-color: ${(props) => props.theme['red-500']};

  cursor: pointer;

  transition: background 0.1s;

  &:hover {
    background: ${(props) => props.theme['red-600']};
  }
`

export const ButtonTitle = styled.p`
  font-size: 18px;
  font-weight: bold;
  color: ${(props) => props.theme.white};
`

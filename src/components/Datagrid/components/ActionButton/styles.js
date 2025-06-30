import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 32px;
  width: 32px;

  border-radius: 4px;

  cursor: pointer;

  transition: background 0.1s;

  &:hover {
    background: ${(props) => props.theme['red-600']};
  }
`

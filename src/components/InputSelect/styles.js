import styled from 'styled-components'

export const Select = styled.select`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 54px;
  width: 100%;

  font-size: 16px;
  font-family: 'Poppins', sans-serif;
  color: ${(props) => props.theme['gray-600']};

  padding: 0 16px;

  background: ${(props) => props.theme['gray-100']};

  border: 1px solid ${(props) => props.theme['gray-300']};
  border-radius: 4px;

  appearance: none;

  cursor: pointer;
`

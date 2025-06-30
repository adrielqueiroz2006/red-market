import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  height: 54px;

  display: flex;
  align-items: center;

  gap: 10px;
  padding: 0 16px;

  border: 1px solid ${(props) => props.theme['gray-300']};
  border-radius: 4px;

  background-color: ${(props) => props.theme['gray-100']};

  color: ${(props) => props.theme['gray-600']};
`

export const InputWrapper = styled.input`
  width: 100%;

  font-size: 1rem;

  background-color: ${(props) => props.theme['gray-100']};

  &::placeholder {
    color: ${(props) => props.theme['gray-600']};
  }
`

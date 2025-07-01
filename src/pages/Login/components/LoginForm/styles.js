import styled from 'styled-components'

export const Container = styled.div`
  height: 100%;

  display: flex;
  align-items: center;

  padding-left: 8.33rem;
`

export const FormWrapper = styled.form`
  width: 356px;

  display: flex;
  flex-direction: column;

  gap: 40px;
`

export const Title = styled.h1`
  font-size: 48px;
`

export const ErrorMessage = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;

  font-size: 18px;
  color: ${(props) => props.theme['red-500']};
`

export const Form = styled.div`
  display: flex;
  flex-direction: column;

  gap: 16px;
`

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;

  gap: 12px;
`

export const InputTitle = styled.p`
  font-size: 18px;
`

export const SubmitButton = styled.button`
  width: 100%;
  height: 54px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 4px;

  background-color: ${(props) => props.theme['red-500']};

  font-weight: bold;
  color: ${(props) => props.theme.white};

  cursor: pointer;

  transition: background 0.3s;

  &:hover {
    background-color: ${(props) => props.theme['red-600']};
  }
`
